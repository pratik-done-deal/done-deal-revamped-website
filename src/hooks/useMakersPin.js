import { useEffect } from 'react';

/**
 * Deal makers: a section pinned for the duration of a vertical scroll budget,
 * during which its horizontal track translates so the last card's right edge
 * meets the viewport's right edge. Falls back to native flow on small screens
 * or with reduced motion.
 */
export default function useMakersPin() {
  useEffect(() => {
    const sec = document.querySelector('.makers-h');
    if (!sec) return;
    const sticky = sec.querySelector('.makers-sticky');
    const viewport = sec.querySelector('.makers-viewport');
    const track = sec.querySelector('.makers-track');
    const bar = document.getElementById('makers-bar');
    if (!sticky || !viewport || !track) return;
    const small = window.matchMedia('(max-width: 860px)');
    const reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)');
    let maxX = 0;
    let pinHeight = 0;

    const tick = () => {
      if (sec.classList.contains('no-pin')) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - pinHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      track.style.transform = 'translate3d(' + (-progress * maxX).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.width = (progress * 100).toFixed(1) + '%';
    };

    const measure = () => {
      sec.classList.remove('no-pin');
      if (small.matches || reduceMo.matches) {
        sec.classList.add('no-pin');
        sec.style.height = '';
        track.style.transform = '';
        return;
      }
      // Measure the sticky box itself — its height is capped in CSS so it
      // stays sane on tall/large viewports — instead of raw window.innerHeight,
      // so the scroll-driven translate distance always matches how long the
      // box is actually pinned on screen.
      pinHeight = sticky.offsetHeight;
      maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
      sec.style.height = (pinHeight + maxX) + 'px';
      tick();
    };

    let rafQueued = false;
    const onScroll = () => { if (!rafQueued) { window.requestAnimationFrame(() => { tick(); rafQueued = false; }); rafQueued = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    measure();
    const t = setTimeout(measure, 400);

    // MOBILE carousel: the strip is a native swipe area, but snapping is driven
    // in JS so a card is ALWAYS fully shown. On release we read the swipe
    // direction (the sign of how far scrollLeft moved) and scroll to the
    // next/previous card index — a slight swipe still completes to a whole card,
    // and it never rests on a half card. A 4s timer auto-advances when idle.
    const STEP_MS = 4000;
    const SWIPE_RATIO = 0.12; // fraction of a card that counts as a directional swipe
    let autoTimer = null;
    let resumeTimer = null;
    let dragging = false;
    let dragStartLeft = 0;
    let dragStartIdx = 0;

    const cardEls = () => [].slice.call(track.querySelectorAll('.maker-card'));
    // scrollLeft that centres card i (base = the track's leading gutter, which
    // equals (viewport − card)/2, so left-aligning to offsetLeft−base centres it).
    const leftFor = (cards, i) => cards[i].offsetLeft - cards[0].offsetLeft;
    const nearestIndex = (cards) => {
      const cur = viewport.scrollLeft;
      let idx = 0, best = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(leftFor(cards, i) - cur); if (d < best) { best = d; idx = i; } });
      return idx;
    };
    const scrollToIndex = (i) => {
      const cards = cardEls();
      if (!cards.length) return;
      const clamped = Math.max(0, Math.min(cards.length - 1, i));
      viewport.scrollTo({ left: leftFor(cards, clamped), behavior: 'smooth' });
    };

    const advance = () => {
      const cards = cardEls();
      if (cards.length < 2) return;
      scrollToIndex((nearestIndex(cards) + 1) % cards.length); // loop at the end
    };

    const startAuto = () => {
      if (autoTimer) return;
      if (!small.matches || reduceMo.matches) return;
      autoTimer = window.setInterval(advance, STEP_MS);
    };
    const stopAuto = () => {
      if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
    };
    // Re-evaluate whether the auto-advance should run whenever we (re)measure —
    // e.g. after a resize crosses the mobile breakpoint.
    const syncAuto = () => { stopAuto(); startAuto(); };

    // A touch starts a drag: pause auto and remember where we began.
    const onHold = () => {
      stopAuto();
      window.clearTimeout(resumeTimer);
      const cards = cardEls();
      if (!cards.length) return;
      dragging = true;
      dragStartLeft = viewport.scrollLeft;
      dragStartIdx = nearestIndex(cards);
    };
    // On release, snap to the next/previous card by swipe direction (bound to
    // window so a finger lifted outside the strip still settles it), then queue
    // the auto-advance to resume.
    const onRelease = () => {
      if (dragging) {
        dragging = false;
        const cards = cardEls();
        if (cards.length) {
          const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : viewport.clientWidth;
          const delta = viewport.scrollLeft - dragStartLeft;
          let target = dragStartIdx;
          if (delta > step * SWIPE_RATIO) target = dragStartIdx + 1;       // swiped forward
          else if (delta < -step * SWIPE_RATIO) target = dragStartIdx - 1; // swiped back
          scrollToIndex(target);
        }
      }
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAuto, STEP_MS);
    };
    viewport.addEventListener('pointerdown', onHold, { passive: true });
    window.addEventListener('pointerup', onRelease, { passive: true });
    window.addEventListener('pointercancel', onRelease, { passive: true });

    startAuto();
    window.addEventListener('resize', syncAuto);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      window.removeEventListener('resize', syncAuto);
      viewport.removeEventListener('pointerdown', onHold);
      window.removeEventListener('pointerup', onRelease);
      window.removeEventListener('pointercancel', onRelease);
      stopAuto();
      window.clearTimeout(resumeTimer);
      clearTimeout(t);
    };
  }, []);
}

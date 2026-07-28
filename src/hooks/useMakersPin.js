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

    // MOBILE auto-advance: every 4s, smooth-scroll the native card strip to the
    // NEXT card, looping back to the first at the end. The next index is derived
    // from the live scrollLeft each tick (not a stored counter), so a manual
    // swipe just changes where the auto-advance picks up. Only runs where the
    // section is a native swipe strip (small screens) and not with reduced
    // motion; a finger on the strip pauses it, resuming 4s after release.
    const STEP_MS = 4000;
    let autoTimer = null;
    let resumeTimer = null;

    const advance = () => {
      const cards = [].slice.call(track.querySelectorAll('.maker-card'));
      if (cards.length < 2) return;
      const base = cards[0].offsetLeft; // track's leading padding
      const cur = viewport.scrollLeft;
      let curIdx = 0, best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs((c.offsetLeft - base) - cur);
        if (d < best) { best = d; curIdx = i; }
      });
      const next = (curIdx + 1) % cards.length;
      viewport.scrollTo({ left: cards[next].offsetLeft - base, behavior: 'smooth' });
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

    const onHold = () => { stopAuto(); window.clearTimeout(resumeTimer); };
    // Release is bound to window so a finger lifted outside the strip still
    // resumes the auto-advance.
    const onRelease = () => { window.clearTimeout(resumeTimer); resumeTimer = window.setTimeout(startAuto, STEP_MS); };
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

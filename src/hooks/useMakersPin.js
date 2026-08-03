import { useEffect } from 'react';

/**
 * Deal makers: the horizontal card strip advances with vertical scroll, and the
 * page doesn't move on to the next section until the strip has travelled end to
 * end. Two mechanisms, because reserving scroll height reads very differently on
 * a phone than on a desktop:
 *
 *   pin  (mouse / trackpad) — the section reserves extra height and a sticky
 *        child holds still inside it. The browser does all the scrolling, which
 *        is why it's rock solid, but the reserved height is empty screen below
 *        the strip for the whole travel. Fine at desktop size, where the sticky
 *        box fills the viewport anyway.
 *
 *   lock (touch) — the section keeps its NATURAL height, so the next section
 *        sits directly beneath the strip with no gap. The page is instead
 *        clamped at the section's top edge and finger travel is spent moving the
 *        strip sideways; the clamp lifts the moment the strip runs out.
 *
 * Reduced motion gets neither: .no-pin degrades to a native swipe strip.
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

    // Matches the mobile CSS layer's breakpoint (sections.css / investors.css).
    const small = window.matchMedia('(max-width: 800px)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Scroll distance spent per pixel of horizontal travel on a phone. At 1:1 a
    // seven-card strip costs ~2.5 screen-heights of swiping and reads as endless;
    // 0.65 keeps a mobile pass about as long as the desktop one.
    const MOBILE_BUDGET = 0.65;

    let mode = 'pin';          // 'pin' | 'lock' | 'none'
    let maxX = 0;              // horizontal distance the track must travel
    let pinHeight = 0;         // pin mode only: height of the sticky box
    let progress = 0;          // 0..1, shared by both modes

    const render = () => {
      track.style.transform = 'translate3d(' + (-progress * maxX).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.width = (progress * 100).toFixed(1) + '%';
    };

    /* ── pin mode ─────────────────────────────────────────────── */

    const tickPin = () => {
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - pinHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      progress = total > 0 ? scrolled / total : 0;
      render();
    };

    /* ── lock mode ────────────────────────────────────────────── */

    let locked = false;
    let anchorY = 0;           // page offset the section is held at
    let lastTouchY = 0;
    const travelPx = () => Math.max(240, maxX * MOBILE_BUDGET);
    // Breathing room left above the eyebrow row while the page is held, so the
    // strip isn't jammed against the top edge of the screen.
    const LOCK_TOP = 50;

    const lock = () => {
      if (locked) return;
      locked = true;
      anchorY = Math.round(sec.getBoundingClientRect().top + window.scrollY - LOCK_TOP);
      if (window.__lenis) window.__lenis.stop();
      window.scrollTo(0, anchorY);
      // Stops the browser treating a NEW gesture as a pan. Gestures already in
      // flight aren't affected — those are handled by the clamp in onScroll.
      document.body.classList.add('makers-locked');
    };

    const unlock = () => {
      if (!locked) return;
      locked = false;
      document.body.classList.remove('makers-locked');
      const lenis = window.__lenis;
      if (lenis) {
        lenis.start();
        // Lenis held its own scroll target while stopped, and the clamp moved the
        // page underneath it. Resync, or it can animate back to where the lock
        // started the moment it resumes.
        if (lenis.scrollTo) lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
    };

    // Spend a scroll delta on horizontal travel, and hand the page straight back
    // the moment the strip runs out in the direction being scrolled — the lock
    // must never outlast the thing it exists for.
    const step = (dy) => {
      if (!dy) return;
      if (!maxX) { unlock(); return; }
      progress = Math.min(1, Math.max(0, progress + dy / travelPx()));
      render();
      if ((dy > 0 && progress >= 1) || (dy < 0 && progress <= 0)) unlock();
    };

    /* ── scroll ───────────────────────────────────────────────── */

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > lastY ? 1 : (y < lastY ? -1 : 0);
      lastY = y;

      if (mode === 'lock') {
        if (locked) {
          // The page moved despite the lock — an iOS fling that was already
          // under way, which preventDefault can't stop. Spend the overshoot on
          // travel instead of fighting it, then hold the page still again.
          const over = y - anchorY;
          if (over) {
            step(over);
            if (locked) window.scrollTo(0, anchorY);
          }
          return;
        }
        // Engage as the section's top edge reaches its resting offset — going
        // down with travel left, or coming back up with travel to undo.
        const top = sec.getBoundingClientRect().top;
        if (dir > 0 && progress < 1 && top <= LOCK_TOP && top > -sec.offsetHeight) lock();
        else if (dir < 0 && progress > 0 && top >= LOCK_TOP && top < window.innerHeight) lock();
        return;
      }

      if (mode === 'pin') tickPin();
    };

    /* ── input while locked ───────────────────────────────────── */

    const onTouchStart = (e) => { lastTouchY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (!locked) return;
      const y = e.touches[0].clientY;
      const dy = lastTouchY - y;
      lastTouchY = y;
      // Only spend the delta when we can actually suppress the pan. If the event
      // isn't cancelable the browser is mid-pan and will scroll anyway, and
      // onScroll spends that movement — counting it here too would double it.
      if (e.cancelable) { e.preventDefault(); step(dy); }
    };
    const onWheel = (e) => {
      if (!locked) return;
      if (e.cancelable) e.preventDefault();
      step(e.deltaY);
    };
    const KEY_STEP = 0.18;
    const onKey = (e) => {
      if (!locked) return;
      const k = e.key;
      if (k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); step(travelPx() * KEY_STEP); }
      else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); step(-travelPx() * KEY_STEP); }
      // Always leave a way out that doesn't require walking the whole strip.
      else if (k === 'Escape' || k === 'End') { progress = 1; render(); unlock(); }
    };
    // Never let the lock swallow a navigation: Lenis is stopped while locked, so
    // an in-page anchor jump would silently no-op. Any link or button press
    // releases the page first.
    const onClick = (e) => {
      if (!locked) return;
      if (e.target && e.target.closest && e.target.closest('a, button, [role="button"]')) unlock();
    };

    /* ── measure ──────────────────────────────────────────────── */

    const measure = () => {
      sec.classList.remove('no-pin');
      // Keyed off width alone, NOT `pointer: coarse` — the mobile CSS layer is a
      // width query, so gating the mechanism on touch let a narrow desktop window
      // (and Chrome's responsive mode without touch emulation) get the mobile
      // layout with the desktop pin: reserved empty height and no lock offset.
      // Wheel and keyboard drive the lock too, so width is the honest signal.
      mode = reduceMo.matches ? 'none' : (small.matches ? 'lock' : 'pin');

      if (mode === 'none') {
        unlock();
        sec.classList.add('no-pin');
        sec.style.height = '';
        track.style.transform = '';
        if (bar) bar.style.width = '0%';
        return;
      }

      maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);

      if (mode === 'lock') {
        // Natural height — no reserved scroll, so the next section sits directly
        // below the strip instead of below an empty band.
        sec.style.height = '';
        pinHeight = 0;
        render();
        return;
      }

      unlock();
      // Measure the sticky box itself — its height is capped in CSS so it stays
      // sane on tall/large viewports — instead of raw window.innerHeight, so the
      // scroll-driven translate distance always matches how long the box is
      // actually pinned on screen.
      pinHeight = sticky.offsetHeight;
      sec.style.height = (pinHeight + maxX) + 'px';
      tickPin();
    };

    // Mobile browsers fire resize whenever the URL bar shows/hides, which would
    // otherwise re-measure (and drop the lock) mid-scroll. Nothing about the
    // layout actually changed there, so re-measure on a real width change.
    let lastW = window.innerWidth;
    const onResize = () => {
      if (coarse.matches && window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      unlock();
      measure();
    };
    const onRotate = () => { unlock(); measure(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick, true);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onRotate);
    window.addEventListener('load', measure);
    measure();
    const t = setTimeout(measure, 400);

    return () => {
      unlock();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onRotate);
      window.removeEventListener('load', measure);
      clearTimeout(t);
    };
  }, []);
}

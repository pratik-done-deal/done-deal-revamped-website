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
    const viewport = sec.querySelector('.makers-viewport');
    const track = sec.querySelector('.makers-track');
    const bar = document.getElementById('makers-bar');
    if (!viewport || !track) return;
    const small = window.matchMedia('(max-width: 860px)');
    const reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)');
    let maxX = 0;

    const tick = () => {
      if (sec.classList.contains('no-pin')) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
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
      maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
      sec.style.height = (window.innerHeight + maxX) + 'px';
      tick();
    };

    let rafQueued = false;
    const onScroll = () => { if (!rafQueued) { window.requestAnimationFrame(() => { tick(); rafQueued = false; }); rafQueued = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    measure();
    const t = setTimeout(measure, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      clearTimeout(t);
    };
  }, []);
}

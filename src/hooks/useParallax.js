import { useEffect } from 'react';

/**
 * Light parallax on imagery (.parallax, scaled) and ambient drifting shapes
 * (.drift, .amb .glow / .halfcircle / .bigicon / .spill). Restrained, never flashy.
 */
export default function useParallax() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parallax = [].slice.call(document.querySelectorAll('.parallax'));
    let drifters = [].slice.call(document.querySelectorAll('.drift, .amb .glow, .amb .halfcircle, .amb .bigicon, .amb .spill'));
    drifters = drifters.filter((el, i) => drifters.indexOf(el) === i);
    if (reduce || (!parallax.length && !drifters.length)) return;

    let ticking = false;
    const applyParallax = () => {
      const vh = window.innerHeight;
      parallax.forEach((el) => {
        const r = el.getBoundingClientRect();
        const off = ((r.top + r.height / 2) - vh / 2) / vh;
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.06;
        el.style.transform = 'translate3d(0,' + (off * speed * 100).toFixed(2) + 'px,0) scale(1.06)';
      });
      drifters.forEach((el) => {
        const r = el.getBoundingClientRect();
        const off = ((r.top + r.height / 2) - vh / 2) / vh;
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
        const base = el.getAttribute('data-base') || '';
        el.style.transform = base + ' translate3d(0,' + (off * speed * -340).toFixed(2) + 'px,0)';
      });
      ticking = false;
    };
    drifters.forEach((el) => { const t = el.style.transform; if (t) el.setAttribute('data-base', t); });
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(applyParallax); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', applyParallax);
    applyParallax();

    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', applyParallax); };
  }, []);
}

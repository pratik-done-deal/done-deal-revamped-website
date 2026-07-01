import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scroll (Lenis — the engine behind Locomotive v5) + smooth anchor
 * navigation for in-page #hash links. Native-scroll based, so the sticky nav,
 * pinned sections, IntersectionObserver reveals and parallax all keep working.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    let rafId = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
      });
      window.__lenis = lenis;
      const rafLoop = (time) => { lenis.raf(time); rafId = requestAnimationFrame(rafLoop); };
      rafId = requestAnimationFrame(rafLoop);
    }

    // Smooth-scroll in-page anchors
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id === '#' || id === '#top') {
        if (id === '#top') {
          e.preventDefault();
          if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -70 });
        else {
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) { lenis.destroy(); if (window.__lenis === lenis) delete window.__lenis; }
    };
  }, []);
}

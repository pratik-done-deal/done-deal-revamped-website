import { useEffect } from 'react';

/**
 * Sticky nav background on scroll, auto-hide on scroll-down / reveal on
 * scroll-up, and the --nav-h / --strip-h CSS vars (so nav + hero + strip
 * can total exactly 100vh).
 */
export default function useNav() {
  useEffect(() => {
    const nav = document.getElementById('topnav') || document.querySelector('.topnav');

    // sticky background
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // auto-hide
    let lastY = window.scrollY, acc = 0;
    const onHide = () => {
      if (!nav) return;
      const y = window.scrollY, dy = y - lastY;
      lastY = y;
      if (y < 140) { nav.classList.remove('nav-hide'); acc = 0; return; }
      acc = ((dy > 0) === (acc > 0)) ? acc + dy : dy;
      if (acc > 26) nav.classList.add('nav-hide');
      else if (acc < -26) nav.classList.remove('nav-hide');
    };
    window.addEventListener('scroll', onHide, { passive: true });

    // nav + strip heights
    const setVars = () => {
      const root = document.documentElement;
      const n = document.querySelector('.topnav');
      const strip = document.querySelector('.strip');
      if (n) root.style.setProperty('--nav-h', n.offsetHeight + 'px');
      if (strip) root.style.setProperty('--strip-h', strip.offsetHeight + 'px');
    };
    setVars();
    window.addEventListener('resize', setVars);
    window.addEventListener('load', setVars);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onHide);
      window.removeEventListener('resize', setVars);
      window.removeEventListener('load', setVars);
    };
  }, []);
}

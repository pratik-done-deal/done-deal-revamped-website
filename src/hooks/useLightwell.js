import { useEffect } from 'react';

/**
 * Background "lightwell": the page background washes dark → light as each
 * .lightwell band crosses the viewport, and text colour tracks the wash
 * continuously via the --lw custom property (no hard mid-transition flip).
 */
export default function useLightwell(opts = {}) {
  const floor = opts.floor ?? 0;
  useEffect(() => {
    const wells = [].slice.call(document.querySelectorAll('.lightwell'));
    const wash = document.getElementById('bgwash');
    if (!wells.length || !wash) return;

    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const lerp = (a, b, t) => a + (b - a) * t;
    const DARK = [7, 7, 7], LIGHT = [244, 241, 235];

    const onScroll = () => {
      const vh = window.innerHeight;
      let light = floor;
      for (let i = 0; i < wells.length; i++) {
        const r = wells[i].getBoundingClientRect();
        const enter = clamp((vh * 0.70 - r.top) / (vh * 0.55), 0, 1);
        const exit = clamp((r.bottom - vh * 0.30) / (vh * 0.55), 0, 1);
        light = Math.max(light, Math.min(enter, exit));
      }
      wash.style.backgroundColor = 'rgb(' +
        Math.round(lerp(DARK[0], LIGHT[0], light)) + ',' +
        Math.round(lerp(DARK[1], LIGHT[1], light)) + ',' +
        Math.round(lerp(DARK[2], LIGHT[2], light)) + ')';
      wash.style.setProperty('--washdark', String(1 - light));
      document.documentElement.style.setProperty('--lw', light.toFixed(3));
      document.body.classList.toggle('is-light', light > 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      wash.style.backgroundColor = '';
      wash.style.removeProperty('--washdark');
      document.documentElement.style.removeProperty('--lw');
      document.body.classList.remove('is-light');
    };
  }, [floor]);
}

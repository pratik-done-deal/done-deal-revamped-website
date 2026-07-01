import React from 'react';

/**
 * Reactive aurora canvas behind the hero (the V2 signature). Three modes:
 *   0 Aurora · 1 Nebula (default, adds drifting stars) · 2 Liquid (orbiting blobs).
 * Blobs ease toward the pointer. Honours prefers-reduced-motion (paints once).
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {React.RefObject<HTMLElement>} hostRef  the .hero-panel element
 * @param {number} mode
 */
export default function useHeroAurora(canvasRef, hostRef, mode = 1) {
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const resize = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let tx = 0.66;
    let ty = 0.38;
    let px = 0.66;
    let py = 0.38;
    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width;
      ty = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      tx = 0.66;
      ty = 0.38;
    };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);

    const COL = {
      violet: [120, 40, 255],
      lav: [243, 197, 255],
      coral: [255, 122, 89],
      blue: [80, 90, 255],
    };
    const blob = (x, y, r, col, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${a})`);
      g.addColorStop(0.5, `rgba(${col[0]},${col[1]},${col[2]},${a * 0.35})`);
      g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let stars = [];
    const seedStars = () => {
      stars = [];
      for (let i = 0; i < 80; i++)
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.4 + 0.3,
          p: Math.random() * 6.28,
          s: Math.random() * 0.5 + 0.2,
        });
    };
    seedStars();

    let t = 0;
    let raf;
    const frame = () => {
      t += 0.006;
      px = lerp(px, tx, 0.05);
      py = lerp(py, ty, 0.05);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const cx = W * px;
      const cy = H * py;
      const base = Math.min(W, H);

      if (mode === 2) {
        const n = 6;
        for (let i = 0; i < n; i++) {
          const ang = t * 0.6 + (i / n) * Math.PI * 2;
          const rad = base * (0.16 + 0.09 * Math.sin(t * 0.8 + i));
          const bx = W * 0.62 + Math.cos(ang) * rad + (px - 0.5) * 120;
          const by = H * 0.4 + Math.sin(ang * 1.3) * rad * 0.7 + (py - 0.38) * 90;
          const cols = [COL.violet, COL.lav, COL.violet, COL.coral, COL.blue, COL.violet];
          blob(bx, by, base * 0.34, cols[i], i === 3 ? 0.11 : 0.15);
        }
      } else {
        const drift1 = Math.sin(t) * 30;
        const drift2 = Math.cos(t * 0.8) * 26;
        const scale = mode === 1 ? 0.78 : 1;
        blob(cx + drift1, cy + drift2 - base * 0.05, base * 0.5 * scale, COL.violet, 0.3);
        blob(cx - base * 0.14 + drift2, cy + base * 0.02 + drift1, base * 0.34 * scale, COL.lav, 0.2);
        blob(cx + base * 0.18 - drift1, cy + base * 0.06, base * 0.26 * scale, COL.coral, 0.1);
        if (mode === 1) {
          blob(cx, cy - base * 0.04, base * 0.05, COL.lav, 0.6);
          ctx.globalCompositeOperation = 'source-over';
          for (let s = 0; s < stars.length; s++) {
            const st = stars[s];
            const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * (st.s * 6) + st.p));
            ctx.beginPath();
            ctx.fillStyle = `rgba(166,174,255,${tw * 0.6})`;
            ctx.arc(st.x * W, st.y * H, st.r, 0, 6.28);
            ctx.fill();
          }
          ctx.globalCompositeOperation = 'lighter';
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (!reduce) {
      raf = requestAnimationFrame(frame);
    } else {
      const cx2 = W * 0.66;
      const cy2 = H * 0.38;
      const base2 = Math.min(W, H);
      ctx.globalCompositeOperation = 'lighter';
      blob(cx2, cy2, base2 * 0.5, COL.violet, 0.28);
      blob(cx2 - base2 * 0.14, cy2 + base2 * 0.02, base2 * 0.34, COL.lav, 0.2);
      ctx.globalCompositeOperation = 'source-over';
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, hostRef, mode]);
}

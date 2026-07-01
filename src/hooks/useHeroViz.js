import React from 'react';

/**
 * Hero "deal story" canvas — Bézier threads that converge and radiate through
 * four stages, auto-advancing every 2.8s (click a story card to jump):
 *   0 Data → threads converge into one golden ball (the IM)
 *   1 Outreach → golden ball centred, threads radiate out
 *   2 Shortlist → threads converge into 4 golden balls
 *   3 Done Deal → 3 golden balls + 1 glowing blue winner
 * Pointer hover bends nearby threads. The progress bars inside each
 * `.viz-card .bar > i` are filled to track the dwell timer.
 *
 * @param {React.RefObject<HTMLElement>} hostRef       #hero-viz
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef  #viz-canvas
 * @param {React.RefObject<HTMLElement>} cardsWrapRef   #viz-cards
 */
export default function useHeroViz(hostRef, canvasRef, cardsWrapRef) {
  React.useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!host || !canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const N = 36;
    const SEG = 48;
    let mode = 0;
    const DWELL = 2800;
    const lerp = (a, b, t) => a + (b - a) * t;

    const COP = [208, 155, 108];
    const PUR = [124, 138, 255];
    const BLU = [150, 172, 255];
    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

    const BY = [0.18, 0.39, 0.61, 0.82];
    const L3DEST = [{ x: 0.52, y: 0.21 }, { x: 0.55, y: 0.8 }, { x: 0.93, y: 0.33 }];
    const L3 = { 2: 0, 6: 0, 16: 1, 21: 1, 30: 2, 34: 2 };

    function geo(m, i, n) {
      const f = n === 1 ? 0.5 : i / (n - 1);
      const spread = f - 0.5;
      switch (m) {
        case 0:
          return { x0: 0.02, y0: 0.04 + f * 0.92, cx1: 0.3, cy1: 0.04 + f * 0.92, cx2: 0.6, cy2: 0.5 + spread * 0.16, x1: 0.84, y1: 0.5 };
        case 1: {
          const th = (i / n) * Math.PI * 2;
          const rx = 0.47;
          const ry = 0.45;
          return {
            x0: 0.5, y0: 0.5,
            cx1: 0.5 + Math.cos(th + 0.45) * 0.16, cy1: 0.5 + Math.sin(th + 0.45) * 0.16,
            cx2: 0.5 + Math.cos(th + 0.22) * 0.33, cy2: 0.5 + Math.sin(th + 0.22) * 0.33,
            x1: 0.5 + Math.cos(th) * rx, y1: 0.5 + Math.sin(th) * ry,
          };
        }
        case 2: {
          const g = Math.min(3, Math.floor(f * 4));
          const by = BY[g];
          return { x0: 0.02, y0: 0.05 + f * 0.9, cx1: 0.3, cy1: 0.05 + f * 0.9, cx2: 0.62, cy2: by, x1: 0.82, y1: by };
        }
        default: {
          const dest = Object.prototype.hasOwnProperty.call(L3, i) ? L3DEST[L3[i]] : { x: 0.74, y: 0.5 };
          return { x0: 0.03, y0: 0.07 + f * 0.86, cx1: 0.3, cy1: 0.07 + f * 0.86, cx2: dest.x - 0.16, cy2: dest.y, x1: dest.x, y1: dest.y };
        }
      }
    }
    const visFor = () => 1;
    function enodesFor(m) {
      if (m === 0) return [{ x: 0.84, y: 0.5, r: 17, blue: 0, ring: 0 }];
      if (m === 1) return [{ x: 0.5, y: 0.5, r: 18, blue: 0, ring: 1 }];
      if (m === 2)
        return BY.map((y) => ({ x: 0.82, y, r: 13, blue: 0, ring: 0 }));
      return [
        { x: 0.74, y: 0.5, r: 29, blue: 1, ring: 1 },
        { x: 0.52, y: 0.21, r: 9, blue: 0, ring: 0 },
        { x: 0.55, y: 0.8, r: 9, blue: 0, ring: 0 },
        { x: 0.93, y: 0.33, r: 9, blue: 0, ring: 0 },
      ];
    }

    const KEYS = ['x0', 'y0', 'cx1', 'cy1', 'cx2', 'cy2', 'x1', 'y1'];
    const cur = [];
    const va = [];
    for (let i = 0; i < N; i++) {
      cur.push(geo(0, i, N));
      va.push(1);
    }

    const EN = 5;
    const enodes = [];
    (() => {
      const e0 = enodesFor(0);
      for (let j = 0; j < EN; j++) {
        const t0 = e0[j];
        enodes.push(t0 ? { x: t0.x, y: t0.y, r: t0.r, a: 1, blue: t0.blue, ring: t0.ring } : { x: 0.5, y: 0.5, r: 0, a: 0, blue: 0, ring: 0 });
      }
    })();
    let doneA = 0;
    let mx = -1e4;
    let my = -1e4;
    let sx = -1e4;
    let sy = -1e4;
    let hover = 0;
    let t = 0;

    function resize() {
      const r = host.getBoundingClientRect();
      if (!r.width) return;
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    }

    const cards = cardsWrap ? [].slice.call(cardsWrap.querySelectorAll('.viz-card')) : [];
    const fills = cards.map((c) => c.querySelector('.bar > i'));
    let elapsed = 0;
    let lastTs = 0;
    let paused = false;

    function setMode(m) {
      mode = ((m % 4) + 4) % 4;
      elapsed = 0;
      cards.forEach((b, k) => b.classList.toggle('on', k === mode));
      fills.forEach((f, k) => {
        if (f) f.style.width = k < mode ? '100%' : '0%';
      });
    }

    const onCardClick = (e) => {
      const btn = e.target.closest('.viz-card');
      if (btn) {
        paused = false;
        setMode(parseInt(btn.getAttribute('data-m'), 10));
      }
    };
    if (cardsWrap) cardsWrap.addEventListener('click', onCardClick);

    const onLeave = () => {
      mx = -1e4;
      my = -1e4;
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = host.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);
    const onVis = () => {
      if (!document.hidden) render();
    };
    document.addEventListener('visibilitychange', onVis);

    function pulseDot(x, y, a) {
      const pr = 2.4;
      const g = ctx.createRadialGradient(x, y, 0, x, y, pr * 3.4);
      g.addColorStop(0, rgba(BLU, 0.85 * a));
      g.addColorStop(0.5, rgba(BLU, 0.3 * a));
      g.addColorStop(1, rgba(BLU, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, pr * 3.4, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = rgba([235, 240, 255], 0.95 * a);
      ctx.beginPath();
      ctx.arc(x, y, pr * 0.7, 0, 6.2832);
      ctx.fill();
    }
    function drawBall(x, y, r, c, a, pulse, ring, winner) {
      if (a < 0.02 || r < 0.5) return;
      const boost = winner ? 1.5 + 0.6 * pulse : 1;
      const halo = r * (2.6 + 0.6 * pulse) * (winner ? 1.5 : 1);
      const g = ctx.createRadialGradient(x, y, 0, x, y, halo);
      g.addColorStop(0, rgba(c, Math.min(1, (0.5 + 0.3 * pulse) * a * boost)));
      g.addColorStop(0.4, rgba(c, (0.18 + 0.14 * pulse) * a));
      g.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, halo, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = rgba(mixc(c, [255, 246, 236], 0.4), a);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = rgba([255, 253, 250], 0.92 * a);
      ctx.beginPath();
      ctx.arc(x, y, r * 0.42, 0, 6.2832);
      ctx.fill();
      if (ring) {
        const rp = (t * (winner ? 0.45 : 0.5)) % 1;
        ctx.beginPath();
        ctx.arc(x, y, r + rp * r * (winner ? 3.0 : 2.4), 0, 6.2832);
        ctx.lineWidth = winner ? 2.2 : 1.6;
        ctx.strokeStyle = rgba(c, (winner ? 0.55 : 0.4) * (1 - rp) * a);
        ctx.stroke();
        if (winner) {
          const rp2 = (t * 0.45 + 0.5) % 1;
          ctx.beginPath();
          ctx.arc(x, y, r + rp2 * r * 3.0, 0, 6.2832);
          ctx.lineWidth = 2.0;
          ctx.strokeStyle = rgba(c, 0.45 * (1 - rp2) * a);
          ctx.stroke();
        }
      }
    }

    function render() {
      if (W <= 0) return;
      ctx.clearRect(0, 0, W, H);
      const RAD = Math.min(W, H) * 0.4;
      const winBlue = doneA;
      ctx.lineCap = 'round';
      for (let i = 0; i < N; i++) {
        if (va[i] < 0.02) continue;
        const p = cur[i];
        const wob = Math.sin(t * 1.6 + i * 0.5) * 0.004;
        const a = (0.26 + 0.46 * (0.5 + 0.5 * Math.sin(i * 1.7 + 1))) * va[i];
        const isLoser = mode === 3 && Object.prototype.hasOwnProperty.call(L3, i);
        const baseCol = isLoser ? COP : mixc(COP, PUR, winBlue * 0.5);

        const px = [];
        const py = [];
        const pf = [];
        let maxInf = 0;
        for (let s = 0; s <= SEG; s++) {
          const u = s / SEG;
          const v = 1 - u;
          const bx = v * v * v * p.x0 + 3 * v * v * u * p.cx1 + 3 * v * u * u * p.cx2 + u * u * u * p.x1;
          const by = v * v * v * (p.y0 + wob) + 3 * v * v * u * (p.cy1 + wob) + 3 * v * u * u * (p.cy2 - wob) + u * u * u * p.y1;
          let x = bx * W;
          let y = by * H;
          let infl = 0;
          if (hover > 0.01) {
            const dx = x - sx;
            const dy = y - sy;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            if (d < RAD) {
              infl = 1 - d / RAD;
              infl = infl * infl * (3 - 2 * infl);
              const endEase = Math.sin(Math.PI * u);
              const push = infl * 30 * hover * endEase;
              x += (dx / d) * push;
              y += (dy / d) * push;
              infl *= hover * endEase;
            }
          }
          px.push(x);
          py.push(y);
          pf.push(infl);
          if (infl > maxInf) maxInf = infl;
        }

        const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + i * 0.43);
        const glowA = a * (0.07 + 0.2 * pulse);
        ctx.beginPath();
        ctx.moveTo(px[0], py[0]);
        for (let s2 = 1; s2 <= SEG; s2++) ctx.lineTo(px[s2], py[s2]);
        ctx.lineWidth = 4.4;
        ctx.strokeStyle = rgba(baseCol, glowA * 0.45);
        ctx.stroke();
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = rgba(baseCol, glowA);
        ctx.stroke();

        ctx.lineWidth = 1.1;
        if (maxInf < 0.01) {
          ctx.strokeStyle = rgba(baseCol, a);
          ctx.stroke();
        } else {
          for (let s3 = 0; s3 < SEG; s3++) {
            const m2 = Math.min(1, (pf[s3] + pf[s3 + 1]) * 0.85);
            const cc = mixc(baseCol, [255, 255, 255], m2);
            const sa = a + (0.95 - a) * m2 * 0.8;
            ctx.beginPath();
            ctx.moveTo(px[s3], py[s3]);
            ctx.lineTo(px[s3 + 1], py[s3 + 1]);
            ctx.lineWidth = 1.1;
            ctx.strokeStyle = rgba(mixc(cc, PUR, 0.55 * m2), sa);
            ctx.stroke();
            if (m2 > 0.05) {
              ctx.lineWidth = 3;
              ctx.strokeStyle = rgba([255, 255, 255], m2 * 0.25);
              ctx.stroke();
            }
          }
        }

        for (let pk = 0; pk < 2; pk++) {
          const frac = (t * 0.16 + i * 0.05 + pk * 0.5) % 1;
          const fpos = frac * SEG;
          let lo = Math.floor(fpos);
          let fff = fpos - lo;
          if (lo >= SEG) {
            lo = SEG - 1;
            fff = 1;
          }
          const qx = px[lo] + (px[lo + 1] - px[lo]) * fff;
          const qy = py[lo] + (py[lo + 1] - py[lo]) * fff;
          const fade = Math.sin(Math.PI * frac);
          pulseDot(qx, qy, va[i] * (0.55 + 0.45 * fade));
        }

        const dots = [[px[SEG], py[SEG], 1.5], [px[0], py[0], 1.3]];
        for (let dI = 0; dI < 2; dI++) {
          const dx2 = dots[dI][0];
          const dy2 = dots[dI][1];
          const rr = dots[dI][2];
          const halo = 7 + 3 * pulse;
          const grd = ctx.createRadialGradient(dx2, dy2, 0, dx2, dy2, halo);
          grd.addColorStop(0, rgba(mixc([220, 172, 126], PUR, isLoser ? 0 : winBlue * 0.5), (0.46 + 0.3 * pulse) * va[i]));
          grd.addColorStop(0.35, rgba(baseCol, 0.16 + 0.16 * pulse));
          grd.addColorStop(1, rgba(baseCol, 0));
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(dx2, dy2, halo, 0, 6.2832);
          ctx.fill();
          ctx.fillStyle = rgba([255, 235, 212], Math.min(1, a + 0.4));
          ctx.beginPath();
          ctx.arc(dx2, dy2, rr, 0, 6.2832);
          ctx.fill();
        }
      }

      for (let i = 0; i < EN; i++) {
        const e = enodes[i];
        const pulse2 = 0.5 + 0.5 * Math.sin(t * 1.7 + i * 0.7);
        const isWinner = i === 0 && e.blue > 0.5;
        drawBall(e.x * W, e.y * H, e.r, mixc(COP, PUR, e.blue), e.a, pulse2, e.ring, isWinner);
      }
    }

    let raf;
    function frame(ts) {
      t += reduce ? 0 : 0.012;
      if (!lastTs) lastTs = ts;
      const dt = Math.min(ts - lastTs, 80);
      lastTs = ts;
      if (!reduce && !paused) {
        elapsed += dt;
        if (elapsed >= DWELL) setMode(mode + 1);
        else if (fills[mode]) fills[mode].style.width = `${(elapsed / DWELL) * 100}%`;
      }
      sx += (mx - sx) * 0.14;
      sy += (my - sy) * 0.14;
      hover += ((mx > -1e3 ? 1 : 0) - hover) * 0.1;
      doneA += ((mode === 3 ? 1 : 0) - doneA) * 0.08;

      for (let i = 0; i < N; i++) {
        const tgt = geo(mode, i, N);
        const p = cur[i];
        for (let k = 0; k < KEYS.length; k++) p[KEYS[k]] += (tgt[KEYS[k]] - p[KEYS[k]]) * 0.07;
        va[i] += (visFor(mode, i) - va[i]) * 0.1;
      }
      const et = enodesFor(mode);
      for (let i = 0; i < EN; i++) {
        const target = et[i] || { x: enodes[i].x, y: enodes[i].y, r: 0, blue: enodes[i].blue, ring: 0 };
        const want = et[i] ? 1 : 0;
        const e = enodes[i];
        e.x += (target.x - e.x) * 0.08;
        e.y += (target.y - e.y) * 0.08;
        e.r += (target.r - e.r) * 0.08;
        e.a += (want - e.a) * 0.09;
        e.blue += ((target.blue != null ? target.blue : e.blue) - e.blue) * 0.08;
        e.ring = target.ring || 0;
      }

      render();
      raf = requestAnimationFrame(frame);
    }

    setMode(0);
    resize();
    const t1 = setTimeout(resize, 350);
    window.addEventListener('load', resize);
    raf = requestAnimationFrame(frame);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      if (cardsWrap) cardsWrap.removeEventListener('click', onCardClick);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('load', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [hostRef, canvasRef, cardsWrapRef]);
}

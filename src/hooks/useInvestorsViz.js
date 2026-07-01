import { useEffect } from 'react';

/**
 * Investors-page visuals, ported 1:1 from the original build:
 *  • the hero "matched deal" fountain canvas (#match-viz)
 *  • the manifesto words filling grey → white on scroll (.manifesto .mf-w)
 *  • the Why-Done-Deal stat count-ups (.wstat-row .wv)
 *  • the "what you get" icon draw-in (.get-grid .sc-list → .go)
 *  • the why-grid / serve-grid staggered card sweep (→ .cards-in)
 * Every block guards on element presence and cleans up on unmount.
 */
export default function useInvestorsViz() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    /* ── hero "matched deal" fountain ── */
    (() => {
      const host = document.querySelector('.match-viz-wrap');
      const canvas = document.getElementById('match-viz');
      if (!host || !canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let W = 0, H = 0; const N = 30, SEG = 46, winIdx = Math.floor(N / 2); let t = 0;
      let rafId = null, alive = true;
      const COP = [161, 108, 58], COP_HI = [176, 119, 63], PUR = [70, 88, 230], BLU = [70, 88, 222];
      const rgba = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
      const mixc = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
      const blue = { x: 0.5, y: 0.23 }; let threads = [];
      const build = () => {
        const r = host.getBoundingClientRect();
        if (!r.width) return;
        W = r.width; H = r.height;
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        threads = [];
        for (let i = 0; i < N; i++) {
          const f = N === 1 ? 0.5 : i / (N - 1);
          const x0 = 0.09 + f * 0.82, win = (i === winIdx);
          threads.push({
            win, x0, y0: 0.80, cx1: x0, cy1: 0.58,
            cx2: blue.x + (x0 - blue.x) * 0.18, cy2: 0.34,
            baseA: 0.30 + 0.42 * (0.5 + 0.5 * Math.sin(i * 1.7 + 1)),
            fadeStart: 0.22 + Math.random() * 0.1, fadeEnd: 0.5 + Math.random() * 0.16,
            ph: Math.random(), sp: 0.12 + Math.random() * 0.12,
          });
        }
      };
      const bez = (p, u) => { const v = 1 - u; return {
        x: v * v * v * p.x0 + 3 * v * v * u * p.cx1 + 3 * v * u * u * p.cx2 + u * u * u * blue.x,
        y: v * v * v * p.y0 + 3 * v * v * u * p.cy1 + 3 * v * u * u * p.cy2 + u * u * u * blue.y }; };
      const smooth = (e0, e1, x) => { const k = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return k * k * (3 - 2 * k); };
      const pulseDot = (x, y, a) => {
        const pr = 2.4, g = ctx.createRadialGradient(x, y, 0, x, y, pr * 3.4);
        g.addColorStop(0, rgba(BLU, 0.85 * a)); g.addColorStop(0.5, rgba(BLU, 0.3 * a)); g.addColorStop(1, rgba(BLU, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, pr * 3.4, 0, 6.2832); ctx.fill();
        ctx.fillStyle = rgba([54, 68, 205], 0.95 * a); ctx.beginPath(); ctx.arc(x, y, pr * 0.7, 0, 6.2832); ctx.fill();
      };
      const drawBall = (x, y, r, c, a, pulse, ring, winner) => {
        const halo = r * (2.6 + 0.6 * pulse) * (winner ? 1.5 : 1);
        const g = ctx.createRadialGradient(x, y, 0, x, y, halo);
        g.addColorStop(0, rgba(c, Math.min(1, (0.5 + 0.3 * pulse) * a * (winner ? 1.5 : 1))));
        g.addColorStop(0.4, rgba(c, (0.18 + 0.14 * pulse) * a)); g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, halo, 0, 6.2832); ctx.fill();
        ctx.fillStyle = rgba(mixc(c, [28, 20, 14], 0.12), a); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
        ctx.fillStyle = rgba(mixc(c, [255, 251, 244], 0.6), 0.92 * a); ctx.beginPath(); ctx.arc(x, y, r * 0.42, 0, 6.2832); ctx.fill();
        if (ring) {
          const rp = (t * (winner ? 0.45 : 0.5)) % 1;
          ctx.beginPath(); ctx.arc(x, y, r + rp * r * (winner ? 3 : 2.4), 0, 6.2832);
          ctx.lineWidth = winner ? 2.2 : 1.6; ctx.strokeStyle = rgba(c, (winner ? 0.55 : 0.4) * (1 - rp) * a); ctx.stroke();
          if (winner) { const rp2 = (t * 0.45 + 0.5) % 1; ctx.beginPath(); ctx.arc(x, y, r + rp2 * r * 3, 0, 6.2832);
            ctx.lineWidth = 2; ctx.strokeStyle = rgba(c, 0.45 * (1 - rp2) * a); ctx.stroke(); }
        }
      };
      const render = () => {
        if (W <= 0) return;
        ctx.clearRect(0, 0, W, H);
        ctx.lineCap = 'round';
        const bx = blue.x * W, by = blue.y * H;
        const br = Math.max(13, Math.min(20, Math.min(W, H) * 0.05));
        const gr = Math.max(9, br * 0.55);
        for (let i = 0; i < threads.length; i++) {
          const p = threads[i], col = p.win ? COP_HI : COP, px = [], py = [], pa = [];
          for (let s = 0; s <= SEG; s++) {
            const u = s / SEG, q = bez(p, u); let av;
            if (p.win) av = 0.9; else av = p.baseA * (1 - smooth(p.fadeStart, p.fadeEnd, u));
            px.push(q.x * W); py.push(q.y * H); pa.push(av);
          }
          const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + i * 0.43);
          for (let s2 = 0; s2 < SEG; s2++) {
            const sa = (pa[s2] + pa[s2 + 1]) * 0.5;
            if (sa < 0.012) continue;
            ctx.beginPath(); ctx.moveTo(px[s2], py[s2]); ctx.lineTo(px[s2 + 1], py[s2 + 1]);
            ctx.lineWidth = p.win ? 2.6 : 2.2; ctx.strokeStyle = rgba(col, sa * (0.1 + 0.18 * pulse)); ctx.stroke();
            ctx.lineWidth = 1.1; ctx.strokeStyle = rgba(col, sa); ctx.stroke();
          }
          if (!reduce) {
            const pc = p.win ? 9 : 1;
            for (let pk = 0; pk < pc; pk++) {
              const frac = (t * (p.win ? 0.28 : p.sp) + p.ph + pk / pc) % 1;
              const fpos = frac * SEG; let lo = Math.floor(fpos); let ff = fpos - lo;
              if (lo >= SEG) { lo = SEG - 1; ff = 1; }
              const qx = px[lo] + (px[lo + 1] - px[lo]) * ff, qy = py[lo] + (py[lo + 1] - py[lo]) * ff;
              const fade = Math.sin(Math.PI * frac);
              if (p.win) pulseDot(qx, qy, 0.6 + 0.4 * fade);
              else if (pa[lo] > 0.04) pulseDot(qx, qy, pa[lo] * 1.4 * (0.5 + 0.5 * fade));
            }
          }
          const dh = 6 + 3 * pulse, sx0 = px[0], sy0 = py[0];
          const gg = ctx.createRadialGradient(sx0, sy0, 0, sx0, sy0, dh);
          gg.addColorStop(0, rgba(col, (0.46 + 0.3 * pulse) * p.baseA * 1.6)); gg.addColorStop(0.35, rgba(col, 0.16 + 0.16 * pulse)); gg.addColorStop(1, rgba(col, 0));
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(sx0, sy0, dh, 0, 6.2832); ctx.fill();
          if (!p.win) { ctx.fillStyle = rgba([138, 90, 46], 0.9); ctx.beginPath(); ctx.arc(sx0, sy0, 1.5, 0, 6.2832); ctx.fill(); }
        }
        const w = threads[winIdx], wq = bez(w, 0);
        drawBall(wq.x * W, wq.y * H, gr, COP_HI, 1, 0.5 + 0.5 * Math.sin(t * 1.7), 1, false);
        drawBall(bx, by, br, PUR, 1, 0.5 + 0.5 * Math.sin(t * 1.7 + 1), 1, true);
      };
      const frame = () => { if (!alive) return; t += reduce ? 0 : 0.012; render(); if (!reduce) rafId = requestAnimationFrame(frame); };
      window.addEventListener('resize', build);
      build(); render(); if (!reduce) rafId = requestAnimationFrame(frame);
      cleanups.push(() => { alive = false; if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('resize', build); });
    })();

    /* ── manifesto word fill ── */
    (() => {
      const section = document.querySelector('.manifesto');
      const words = [].slice.call(document.querySelectorAll('.manifesto .mf-w'));
      if (!section || !words.length || reduce) return;
      const n = words.length; let q = false;
      const update = () => {
        const vh = window.innerHeight;
        const rect = section.getBoundingClientRect();
        const start = vh * 0.80, end = vh * 0.30;
        const anchor = rect.top + rect.height * 0.5;
        let p = (start - anchor) / (start - end);
        p = Math.max(0, Math.min(1, p));
        const prog = p * n;
        for (let i = 0; i < n; i++) {
          const f = Math.max(0, Math.min(1, prog - i));
          words[i].style.setProperty('--f', (f * 100).toFixed(1) + '%');
        }
      };
      const onScroll = () => { if (!q) { q = true; requestAnimationFrame(() => { update(); q = false; }); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', update);
      window.addEventListener('load', update);
      update();
      cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', update); window.removeEventListener('load', update); });
    })();

    /* ── Why-Done-Deal stat count-ups ── */
    (() => {
      const row = document.querySelector('.wstat-row');
      if (!row) return;
      const els = [].slice.call(row.querySelectorAll('.wv[data-count], .wv[data-count-upper], .wv[data-count-from]'));
      if (!els.length) return;
      const ease = (t2) => 1 - Math.pow(1 - t2, 3);
      const render = (el, p) => {
        if (el.hasAttribute('data-count-from')) {
          const from = parseInt(el.getAttribute('data-count-from'), 10) || 0;
          el.innerHTML = '<em>\u20B9' + Math.round(from * (1 - p)) + '</em>';
        } else if (el.hasAttribute('data-count-upper')) {
          const lo = parseInt(el.getAttribute('data-count-lower'), 10) || 0;
          const hi = parseInt(el.getAttribute('data-count-upper'), 10) || 0;
          el.innerHTML = Math.round(lo * p) + '\u2013' + Math.round(hi * p);
        } else {
          const target = parseInt(el.getAttribute('data-count'), 10) || 0;
          const suffix = el.getAttribute('data-count-suffix') || '';
          el.textContent = Math.round(target * p) + (p >= 1 ? suffix : '');
        }
      };
      els.forEach((el) => render(el, reduce ? 1 : 0));
      if (reduce) return;
      let done = false;
      const run = () => {
        if (done) return; done = true;
        window.removeEventListener('scroll', check);
        const dur = 1500; let start = null;
        const step = (ts) => {
          if (start === null) start = ts;
          const p = Math.min(1, (ts - start) / dur), e = ease(p);
          els.forEach((el) => render(el, e));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const check = () => {
        const r = row.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh * 0.85 && r.bottom > 0) run();
      };
      window.addEventListener('scroll', check, { passive: true });
      check();
      cleanups.push(() => window.removeEventListener('scroll', check));
    })();

    /* ── "what you get" icon draw-in ── */
    (() => {
      const ul = document.querySelector('.get-grid .sc-list');
      if (!ul) return;
      ul.querySelectorAll('.ic path, .ic polyline, .ic line, .ic rect, .ic circle')
        .forEach((el) => el.setAttribute('pathLength', '100'));
      if (reduce) return;
      const check = () => {
        const r = ul.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh * 0.85 && r.bottom > 0) { ul.classList.add('go'); window.removeEventListener('scroll', check); }
      };
      window.addEventListener('scroll', check, { passive: true });
      check();
      cleanups.push(() => window.removeEventListener('scroll', check));
    })();

    /* ── why-grid / serve-grid staggered card sweep ── */
    (() => {
      const grids = document.querySelectorAll('.why-grid, .serve-grid');
      if (!grids.length) return;
      if (reduce) { grids.forEach((g) => g.classList.add('cards-in')); return; }
      const once = window.matchMedia('(max-width:600px)').matches;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('cards-in'); if (once) io.unobserve(e.target); }
          else if (!once) { e.target.classList.remove('cards-in'); }
        });
      }, { threshold: 0.18 });
      grids.forEach((g) => io.observe(g));
      cleanups.push(() => io.disconnect());
    })();

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

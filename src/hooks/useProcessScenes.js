import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Guided process (proc3): as the pinned section scrolls, the active step card
 * advances and the matching conceptual "scene" swaps in on the right. Each
 * scene's connector lines are drawn from the source element's bottom edge to
 * the target's top edge so they physically attach at any size. Clicking a step
 * card smooth-scrolls it to the active midline.
 */
export default function useProcessScenes() {
  useEffect(() => {
    const wrap = document.getElementById('proc3-cards');
    const stage = document.getElementById('proc3-stage');
    if (!wrap || !stage) return;

    const cards = [].slice.call(wrap.querySelectorAll('.vstep'));
    const scenes = [].slice.call(stage.querySelectorAll('.p3scene'));
    const numEl = document.getElementById('proc3-num');
    const capN = document.getElementById('proc3-cap-n');
    const capT = document.getElementById('proc3-cap-t');
    const caps = ['Readiness', 'Mandate', 'Materials', 'Outreach', 'Negotiation', 'Close'];
    const details = cards.map((c) => c.querySelector('.vs-detail'));
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
    let active = -1;
    let tl = null; // reserved for a card-change tween

    // MOBILE (horizontal gallery): all six cards stay expanded in a row, and the
    // row's translate (x) is driven from scroll progress in track() — there's
    // nothing per-card to animate here. DESKTOP: cards expand via CSS, so
    // render() only clears any inline transform left over from a mobile layout.
    const render = () => {
      if (tl) { tl.kill(); tl = null; }
      if (isMobile()) return;
      gsap.set(wrap, { clearProps: 'transform' });
      details.forEach((d) => d && gsap.set(d, { clearProps: 'height' }));
    };

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, k) => c.classList.toggle('on', k === i));
      scenes.forEach((s, k) => s.classList.toggle('on', k === i));
      const label = ('0' + (i + 1)).slice(-2);
      if (numEl) numEl.textContent = label;
      if (capN) capN.textContent = label;
      if (capT) capT.textContent = caps[i];
      render();
    };

    const track = () => {
      const pin = document.getElementById('proc3-pin');
      if (!pin) return;
      const n = cards.length;
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const top = pin.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;

      // MOBILE: translate the card row horizontally across the pin's scroll so it
      // advances from card 1 → 6; once it bottoms out the pin releases and normal
      // vertical scroll resumes. The card nearest centre gets the .on highlight.
      if (isMobile()) {
        const maxX = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
        gsap.set(wrap, { x: -(p * maxX) });
        setActive(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1)))));
        return;
      }

      // DESKTOP: map scroll progress across the 300vh pin onto the active step.
      let raw = p * n;
      if (raw < 0) raw = 0;
      if (raw > n - 0.0001) raw = n - 0.0001;
      // Hysteresis: only switch cards once the scroll clears a step boundary by
      // H (~25% of a step). On mobile the address bar shows/hides while
      // scrolling, which changes innerHeight and makes `raw` jitter across a
      // boundary — the dead band stops that from oscillating the active card.
      // On a fast fling `idx = floor(raw)` jumps straight to the target card, so
      // intermediate cards are skipped rather than flashed. First run snaps.
      const H = 0.25;
      let idx = active;
      if (active < 0) idx = Math.floor(raw);
      else if (raw >= active + 1 + H) idx = Math.floor(raw);
      else if (raw < active - H) idx = Math.floor(raw);
      if (idx < 0) idx = 0;
      if (idx > n - 1) idx = n - 1;
      setActive(idx);
    };

    let q = false;
    const onScroll = () => { if (!q) { q = true; requestAnimationFrame(() => { track(); q = false; }); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    track();

    const drawFlows = () => {
      scenes.forEach((s) => {
        const flows = [].slice.call(s.querySelectorAll('.pv-flow'));
        if (!flows.length) return;
        const wasOn = s.classList.contains('on');
        s.classList.add('measure');
        if (!wasOn) s.classList.add('on');
        const sRect = s.getBoundingClientRect();
        const k = s.offsetWidth ? sRect.width / s.offsetWidth : 1;
        if (!k || !isFinite(k)) { if (!wasOn) s.classList.remove('on'); s.classList.remove('measure'); return; }
        flows.forEach((svg) => {
          const a = s.querySelector(svg.getAttribute('data-from') || '');
          const b = s.querySelector(svg.getAttribute('data-to') || '');
          if (!a || !b) return;
          const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
          const fx = parseFloat(svg.getAttribute('data-fx') || '0.5');
          const tx = parseFloat(svg.getAttribute('data-tx') || '0.5');
          const ax = (ra.left - sRect.left + ra.width * fx) / k;
          const ay = (ra.bottom - sRect.top) / k + 1;
          const bx = (rb.left - sRect.left + rb.width * tx) / k;
          const by = (rb.top - sRect.top) / k - 1;
          const x0 = Math.min(ax, bx) - 12, y0 = Math.min(ay, by) - 6;
          const w = Math.abs(bx - ax) + 24, h = Math.abs(by - ay) + 12;
          svg.style.left = x0 + 'px'; svg.style.top = y0 + 'px';
          svg.style.width = w + 'px'; svg.style.height = h + 'px';
          svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
          const sx = ax - x0, sy = ay - y0, ex = bx - x0, ey = by - y0;
          const path = svg.querySelector('path');
          if (path) path.setAttribute('d',
            'M' + sx.toFixed(1) + ' ' + sy.toFixed(1) +
            ' C ' + sx.toFixed(1) + ' ' + (sy + (ey - sy) * 0.72).toFixed(1) + ', ' +
            ex.toFixed(1) + ' ' + (sy + (ey - sy) * 0.22).toFixed(1) + ', ' +
            ex.toFixed(1) + ' ' + ey.toFixed(1));
          const st = svg.querySelector('.st'), en = svg.querySelector('.en');
          if (st) { st.setAttribute('cx', sx.toFixed(1)); st.setAttribute('cy', sy.toFixed(1)); }
          if (en) { en.setAttribute('cx', ex.toFixed(1)); en.setAttribute('cy', ey.toFixed(1)); }
        });
        if (!wasOn) s.classList.remove('on');
        s.classList.remove('measure');
      });
    };

    const sticky = stage.closest('.proc3-sticky');
    const vis = stage.closest('.proc3-vis');
    const fit = () => {
      // MOBILE: the graphic spans the FULL width of its strip, but never more
      // than the space the card row leaves — so the graphic + cards always fit
      // inside the 100dvh box and the grid's justify-content can centre them
      // vertically (instead of the group overflowing and clipping at the top).
      // Scale by whichever is smaller (width fill vs. the leftover height), then
      // size the strip to the scaled graphic height.
      if (isMobile()) {
        const gridEl = stage.closest('.proc3-grid');
        const availW = (sticky || vis || stage).clientWidth;
        const contentH = gridEl ? gridEl.clientHeight - 20 : window.innerHeight; // minus 10px top+bottom padding
        const cardsH = wrap ? wrap.offsetHeight : 0;
        const availH = Math.max(140, contentH - cardsH - 12); // 12px = graphic↔cards gap
        const sc = availW ? Math.min(2.4, availW / 480, availH / 500) : 1;
        stage.style.transform = 'scale(' + sc.toFixed(3) + ')';
        if (vis) vis.style.height = Math.round(500 * sc) + 'px';
        drawFlows();
        render();
        track();
        return;
      }
      if (!sticky) return;
      if (vis) vis.style.height = '';  // drop the mobile inline height on desktop
      // Scale the scene stage to FILL its grid cell, bounded by its width. The
      // gentle 2.4x ceiling guards against extreme scaling on tall windows.
      const sc = Math.min(2.4, sticky.clientHeight / 520, sticky.clientWidth / 480);
      stage.style.transform = Math.abs(sc - 1) > 0.002 ? 'scale(' + sc.toFixed(3) + ')' : '';
      drawFlows();
      render();
      track();
    };
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    fit();
    const t = setTimeout(fit, 400);

    /* click / keyboard: jump to a step */
    const pin = document.getElementById('proc3-pin');
    const goToStep = (i) => {
      if (!pin) return;
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const pinTop = window.scrollY + pin.getBoundingClientRect().top;
      const target = pinTop + ((i + 0.5) / cards.length) * total;
      if (window.__lenis) window.__lenis.scrollTo(Math.max(0, target));
      else window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    };
    const cardHandlers = [];
    cards.forEach((card, i) => {
      const onClick = () => { if (window.matchMedia('(min-width: 901px)').matches) goToStep(i); };
      const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToStep(i); } };
      card.addEventListener('click', onClick);
      card.addEventListener('keydown', onKey);
      cardHandlers.push([card, onClick, onKey]);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', fit);
      window.removeEventListener('load', fit);
      clearTimeout(t);
      if (tl) tl.kill();
      cardHandlers.forEach(([card, onClick, onKey]) => { card.removeEventListener('click', onClick); card.removeEventListener('keydown', onKey); });
    };
  }, []);
}

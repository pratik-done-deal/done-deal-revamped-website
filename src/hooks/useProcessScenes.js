import { useEffect } from 'react';

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
    const grid = wrap.parentElement; // .proc3-grid — the mobile clipping viewport
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
    let active = -1;
    let activeM = -1; // mobile active card index
    let heights = []; // per-card { collapsed, expanded } (mobile) — measured up front
    let gapPx = 0;    // .proc3-cards row-gap, cached in measureHeights
    let baseTop = 0;  // wrap.offsetTop within the sticky grid, cached in measureHeights

    // MOBILE: measure each card's collapsed & fully-open height plus its detail
    // panel's natural height (--dh), with transitions suppressed so it's instant
    // and invisible. centerActive uses these to place the one open card.
    const measureHeights = () => {
      if (!isMobile()) return;
      wrap.classList.add('proc3-measuring');
      gapPx = parseFloat(getComputedStyle(wrap).rowGap) || 0;
      baseTop = wrap.offsetTop;
      cards.forEach((c, k) => {
        const inner = c.querySelector('.vs-detail-inner');
        const prev = c.style.getPropertyValue('--o');
        c.style.setProperty('--dh', (inner ? inner.scrollHeight : 0) + 'px');
        c.style.setProperty('--o', '0');
        const collapsed = c.offsetHeight;
        c.style.setProperty('--o', '1');
        const expanded = c.offsetHeight;
        heights[k] = { collapsed, expanded };
        c.style.setProperty('--o', prev || '0');
      });
      wrap.classList.remove('proc3-measuring');
    };

    // MOBILE: slide the card stack so the one open card is centred. Uses the
    // pre-measured heights (active card expanded, the rest collapsed), so the
    // layout is the SETTLED one — the stack shift and the card open animate
    // together. Smoothed by the transform transition in CSS.
    const centerActive = (i) => {
      if (!grid || !isMobile()) { wrap.style.transform = ''; return; }
      if (!cards[i] || !heights.length) return;
      const viewH = grid.clientHeight;
      const tops = new Array(cards.length);
      let y = 0;
      for (let k = 0; k < cards.length; k++) {
        tops[k] = y;
        y += (k === i ? heights[k].expanded : heights[k].collapsed) + (k < cards.length - 1 ? gapPx : 0);
      }
      const stackH = y;
      let ty;
      if (stackH <= viewH) {
        ty = (viewH - stackH) / 2 - baseTop;
      } else {
        const activeMid = baseTop + tops[i] + heights[i].expanded / 2;
        ty = viewH / 2 - activeMid;
        const maxTy = -baseTop;
        const minTy = viewH - (baseTop + stackH);
        if (ty > maxTy) ty = maxTy;
        if (ty < minTy) ty = minTy;
      }
      wrap.style.transform = 'translateY(' + ty.toFixed(1) + 'px)';
    };

    // MOBILE: single-open accordion. Map scroll across the pin onto ONE active
    // card index (with a hysteresis dead-band so the mobile address-bar resize
    // can't oscillate it across a boundary). Exactly one card is open (--o:1),
    // all others closed (--o:0) — never a half-open or two-open state — and the
    // open/close animates via the CSS transition on the --o-driven properties.
    const trackMobile = () => {
      const pin = document.getElementById('proc3-pin');
      if (!pin || !grid) return;
      if (!isMobile()) { wrap.style.transform = ''; return; }
      if (!heights.length) return;
      const n = cards.length;
      const viewH = grid.clientHeight;
      const total = pin.offsetHeight - viewH;
      const top = pin.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      let raw = p * n;
      if (raw < 0) raw = 0;
      if (raw > n - 0.0001) raw = n - 0.0001;

      const H = 0.25;
      let idx = activeM;
      if (activeM < 0) idx = Math.floor(raw);
      else if (raw >= activeM + 1 + H) idx = Math.floor(raw);
      else if (raw < activeM - H) idx = Math.floor(raw);
      if (idx < 0) idx = 0;
      if (idx > n - 1) idx = n - 1;
      if (idx === activeM) return;

      activeM = idx;
      cards.forEach((c, k) => c.style.setProperty('--o', k === idx ? '1' : '0'));
      centerActive(idx);
    };

    // DESKTOP: discrete active-card toggle, driven by track() below. Mobile never
    // calls this (it uses trackMobile); the scenes/captions it updates live in
    // the stage, which is display:none on mobile.
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, k) => c.classList.toggle('on', k === i));
      scenes.forEach((s, k) => s.classList.toggle('on', k === i));
      const label = ('0' + (i + 1)).slice(-2);
      if (numEl) numEl.textContent = label;
      if (capN) capN.textContent = label;
      if (capT) capT.textContent = caps[i];
      wrap.style.transform = ''; // desktop never translates the stack
    };

    const track = () => {
      // DESKTOP only: map scroll progress across the 300vh pin onto the active
      // step. On mobile the address bar resizes the viewport mid-scroll, which
      // makes this scroll math jitter — so phones use the IntersectionObserver
      // below (immune to that resize) instead.
      if (window.innerWidth < 901) return;
      const pin = document.getElementById('proc3-pin');
      if (!pin) return;
      const n = cards.length;
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const top = pin.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
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
    // Desktop advances the active card in track(); mobile drives the continuous
    // scroll-linked accordion in trackMobile(). Each self-guards by breakpoint,
    // so only one does work per frame.
    const onScroll = () => { if (!q) { q = true; requestAnimationFrame(() => { track(); trackMobile(); q = false; }); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    track();
    trackMobile();

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
    const fit = () => {
      if (!sticky) return;
      // The visual's container is now the grid cell, which flexes to fill the
      // pinned viewport height beside the heading. So scale the stage to FILL
      // that cell — bounded by its width — instead of capping at 1x. The gentle
      // 2.4x ceiling just guards against extreme scaling on very tall windows.
      const sc = Math.min(2.4, sticky.clientHeight / 520, sticky.clientWidth / 480);
      stage.style.transform = Math.abs(sc - 1) > 0.002 ? 'scale(' + sc.toFixed(3) + ')' : '';
      drawFlows();
      measureHeights(); // card heights depend on width — re-measure on resize
      activeM = -1;     // force trackMobile to re-apply --o + re-centre at the new size
      trackMobile();
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
      cardHandlers.forEach(([card, onClick, onKey]) => { card.removeEventListener('click', onClick); card.removeEventListener('keydown', onKey); });
    };
  }, []);
}

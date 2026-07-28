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
    let heights = []; // per-card { collapsed, expanded } — measured up front

    // Measure each card's collapsed AND expanded height once (with transitions
    // suppressed so the toggles are instant and invisible). centerActive then
    // computes the SETTLED layout analytically, so the stack's translate targets
    // its final position immediately — the card expansion and the stack shift
    // animate together in a single motion instead of the two-step hop (measure
    // collapsed → re-measure after settle) that read as a jerk.
    const measureHeights = () => {
      if (!isMobile()) return;
      wrap.classList.add('proc3-measuring');
      const prevOn = cards.map((c) => c.classList.contains('on'));
      cards.forEach((c, k) => {
        c.classList.remove('on');
        const collapsed = c.offsetHeight;
        c.classList.add('on');
        const expanded = c.offsetHeight;
        heights[k] = { collapsed, expanded };
        if (!prevOn[k]) c.classList.remove('on');
      });
      wrap.classList.remove('proc3-measuring');
    };

    // MOBILE: slide the card stack so the expanded card stays in view. When the
    // whole stack fits it's centred (all six visible at a glance); when an
    // expanded card overflows, the active card is centred, clamped so the stack
    // ends never pull inward and leave a gap.
    const centerActive = (i) => {
      if (!grid || !isMobile()) { wrap.style.transform = ''; return; }
      if (!cards[i] || !heights.length) return;
      const viewH = grid.clientHeight;
      const gap = parseFloat(getComputedStyle(wrap).rowGap) || 0;
      const base = wrap.offsetTop;
      // Lay the cards out with card i expanded, the rest collapsed, using the
      // pre-measured FINAL heights.
      const tops = new Array(cards.length);
      let y = 0;
      for (let k = 0; k < cards.length; k++) {
        tops[k] = y;
        y += (k === i ? heights[k].expanded : heights[k].collapsed) + (k < cards.length - 1 ? gap : 0);
      }
      const stackH = y;
      let ty;
      if (stackH <= viewH) {
        ty = (viewH - stackH) / 2 - base;
      } else {
        const activeMid = base + tops[i] + heights[i].expanded / 2;
        ty = viewH / 2 - activeMid;
        const maxTy = -base;
        const minTy = viewH - (base + stackH);
        if (ty > maxTy) ty = maxTy;
        if (ty < minTy) ty = minTy;
      }
      wrap.style.transform = 'translateY(' + ty.toFixed(1) + 'px)';
    };

    // Open the new card and close the old one SIMULTANEOUSLY: a single .on
    // toggle lets the outgoing card collapse while the incoming card expands in
    // the same .25s window, so scrolling flows straight from one card to the
    // next with no wait in between.
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, k) => c.classList.toggle('on', k === i));
      scenes.forEach((s, k) => s.classList.toggle('on', k === i));
      const label = ('0' + (i + 1)).slice(-2);
      if (numEl) numEl.textContent = label;
      if (capN) capN.textContent = label;
      if (capT) capT.textContent = caps[i];
      centerActive(i); // single motion to the settled position
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
    const onScroll = () => { if (!q) { q = true; requestAnimationFrame(() => { track(); q = false; }); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    track();

    // MOBILE: drive the active card from the scroll sentinels that tile the pin.
    // rootMargin collapses the viewport to a single centre line, and the
    // sentinels tile the whole pin, so exactly one is crossing that line at any
    // scroll position — its data-i is the active step. Threshold crossings don't
    // jitter with the address-bar resize the way the scroll math does, so the
    // accordion advances one clean card at a time.
    const triggers = [].slice.call(document.querySelectorAll('#proc3-pin .proc3-trigger'));
    let io = null;
    if (triggers.length && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (!isMobile()) return;
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(Number(e.target.getAttribute('data-i')));
          });
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      );
      triggers.forEach((t) => io.observe(t));
    }

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
      measureHeights();     // card heights depend on width — re-measure on resize
      centerActive(active); // re-centre the active card when the viewport resizes
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
      if (io) io.disconnect();
      cardHandlers.forEach(([card, onClick, onKey]) => { card.removeEventListener('click', onClick); card.removeEventListener('keydown', onKey); });
    };
  }, []);
}

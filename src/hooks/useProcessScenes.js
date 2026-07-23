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
    let active = -1;

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, k) => c.classList.toggle('on', k === i));
      scenes.forEach((s, k) => s.classList.toggle('on', k === i));
      const label = ('0' + (i + 1)).slice(-2);
      if (numEl) numEl.textContent = label;
      if (capN) capN.textContent = label;
      if (capT) capT.textContent = caps[i];
    };

    const track = () => {
      if (window.innerWidth < 901) return;
      const pin = document.getElementById('proc3-pin');
      if (!pin) return;
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const top = pin.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      let idx = Math.floor(p * cards.length);
      if (idx < 0) idx = 0;
      if (idx > cards.length - 1) idx = cards.length - 1;
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
    const fit = () => {
      if (!sticky) return;
      // On tall viewports, scale the visual up so it fills its (now taller) box
      // rather than floating in empty space. hFill is exactly 1 at <=940px
      // viewport height (keeps 1440x900 unchanged) and rises to 1.4 on big
      // screens. The container-fit min() still prevents overflow either way.
      const hFill = Math.min(2.3, Math.max(1, window.innerHeight / 860));
      const sc = Math.min(hFill, sticky.clientHeight / 520, sticky.clientWidth / 480);
      stage.style.transform = Math.abs(sc - 1) > 0.002 ? 'scale(' + sc.toFixed(3) + ')' : '';
      drawFlows();
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

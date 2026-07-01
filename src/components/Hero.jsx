import React from 'react';
import useHeroAurora from '../hooks/useHeroAurora.js';
import useHeroViz from '../hooks/useHeroViz.js';

const VIZ_CARDS = [
  { m: 0, n: '01', t: ['78 / 100 — ', 'deal-ready.'], s: 'Readiness report · AI, 120s' },
  { m: 1, n: '02', t: ['Outreach ', 'initiated.'], s: 'Anonymous notes · Day 3' },
  { m: 2, n: '03', t: ['4 buyers ', 'matched.'], s: 'Ranked & scored · Day 28' },
  { m: 3, n: '04', t: ['Done ', 'Deal.'], s: 'Closed · 11 weeks' },
];

const TRUST = [
  ['Anonymous mandate,', ' until you say go'],
  ['Zero retainer,', ' pay only on close'],
  ['800+ verified buyers,', ' not scraped'],
];

export default function Hero() {
  const panelRef = React.useRef(null);
  const auroraRef = React.useRef(null);
  const vizHostRef = React.useRef(null);
  const vizCanvasRef = React.useRef(null);
  const vizCardsRef = React.useRef(null);
  const rotorRef = React.useRef(null);

  useHeroAurora(auroraRef, panelRef, 1);
  useHeroViz(vizHostRef, vizCanvasRef, vizCardsRef);

  // Hero rotating verb (M&A ↔ Fundraising)
  React.useEffect(() => {
    const el = rotorRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = ['M&A', 'Fundraising'];
    let i = 0;
    const id = setInterval(() => {
      el.classList.add('out');
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove('out');
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero wrap" data-screen-label="Hero">
      <div className="hero-panel" style={{ padding: '32px 32px 20px' }} ref={panelRef}>
        <canvas className="hero-aurora" aria-hidden="true" ref={auroraRef} />
        <div className="amb">
          <div className="glow p" style={{ width: 560, height: 480, right: '6%', top: '6%', opacity: 0.3 }} />
          <div className="glow warm" style={{ width: 420, height: 360, left: '-3%', bottom: '-8%', opacity: 0.42 }} />
          <div className="ring drift" data-speed="0.08" style={{ width: 300, height: 300, right: '3%', top: '8%' }} />
        </div>

        <div className="hero-grid">
          <div className="hero-text reveal">
            <div className="kicker">
              <span className="live-dot" />
              AI-native investment banking&nbsp;&nbsp;<span className="dot">·</span>&nbsp;&nbsp;India
            </div>
            <h1 className="h-display hero-h1">
              <span className="rotor-wrap">
                <span className="rotor" id="rotor" ref={rotorRef}>
                  Fundraising
                </span>
              </span>
              ,<br />
              <span className="hero-line2">
                <span className="accent-i">rebuilt</span> for founders.
              </span>
            </h1>
            <p className="lede">
              We run your deal from mandate to close. AI handles buyer discovery, document generation, and
              outreach. Our bankers handle the calls, the tension, and the close.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#">
                Get started
              </a>
              <a className="link" href="#deals">
                View all deals <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="hero-art reveal">
            <div className="hero-vizwrap">
              <div className="hero-viz" id="hero-viz" ref={vizHostRef} aria-label="A deal, from readiness to close">
                <canvas id="viz-canvas" ref={vizCanvasRef} />
              </div>
              <div className="viz-cards" id="viz-cards" ref={vizCardsRef}>
                {VIZ_CARDS.map((c, k) => (
                  <button
                    type="button"
                    className={`viz-card${k === 0 ? ' on' : ''}`}
                    data-m={c.m}
                    key={c.m}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span className="n">{c.n}</span>
                    <span className="t">
                      {c.t[0]}
                      <em>{c.t[1]}</em>
                    </span>
                    <span className="s">{c.s}</span>
                    <span className="bar">
                      <i />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-trust reveal">
          {TRUST.map(([bold, rest]) => (
            <span key={bold}>
              <i className="trust-check">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </i>
              <b>{bold}</b>
              {rest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

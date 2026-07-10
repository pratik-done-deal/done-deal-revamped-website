import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import useInvestorsViz from '../hooks/useInvestorsViz';
import '../styles/investors.css';
import useHeroAurora from '../hooks/useHeroAurora';
import { FAQS } from '../data/faqs';
import Seo from '../components/Seo';
import { ROUTE_META } from '../seo/meta';

const DISPLAY_FAQS = ['general', 'founder', 'buyer'].flatMap((cat) =>
  FAQS.filter((faq) => faq.cat === cat).slice(0, 2)
);

export default function Investors() {

  const { pathname, search } = useLocation();
  const incomingUtmSource = new URLSearchParams(search).get('utm_source');
  const pageSlug = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
  const utmSource = incomingUtmSource || pageSlug;
  const buyerOnboardingUrl = `https://app.done.deals/buyer/onboarding?utm_source=${encodeURIComponent(utmSource)}`;
  const buyerLoginUrl = `https://app.done.deals/buyer/login?utm_source=${encodeURIComponent(utmSource)}`;

  const panelRef = React.useRef(null);
  const auroraRef = React.useRef(null);

  useReveal();        // .reveal fades, FAQ accordions
  useParallax();      // ambient .drift shapes
  useLightwell(); // hero + sections 01-02 are light; sections 03+ are dark
  useInvestorsViz();  // match-viz fountain, manifesto fill, count-ups, card sweep
  useHeroAurora(auroraRef, panelRef, 1);
  

  useEffect(() => {
    document.body.classList.add('page-investors');
    return () => document.body.classList.remove('page-investors');
  }, []);

  return (
    <>
      <Seo {...ROUTE_META['/investors']} path="/investors" />
      <Nav current="investors" />
      <main id="top">
        <div className="lightwell">
        <section className="hero wrap" data-screen-label="Hero">
          <div className="hero-panel" style={{ "padding": "32px 32px 20px" }} ref={panelRef}>
            <canvas className="hero-aurora" aria-hidden="true" ref={auroraRef} />
            <div className="amb">
              <div className="glow p" style={{ "width": "560px", "height": "480px", "right": "6%", "top": "6%", "opacity": ".30" }} />
              <div className="glow warm" style={{ "width": "420px", "height": "360px", "left": "-3%", "bottom": "-8%", "opacity": ".42" }} />
            </div>
            <div className="match-viz-wrap">
              <canvas id="match-viz" aria-hidden="true" />
            </div>
            <div className="hero-grid !mt-8" style={{ "gridTemplateColumns": "1fr" }}>
              <div className="hero-text reveal" style={{ "maxWidth": "820px" }}>
                <div className="kicker">
                  <span className="live-dot" />
                  <span className="kick-main">
                    For serious acquirers & investors
                  </span>
                  <span className="dot kick-sep">
                    ·
                  </span>
                  <span className="kick-geo">
                    India
                  </span>
                </div>
                <h1 className="h-display hero-h1">
                  Find your next acquisition
                  {/* <br className="bm" style={{ "display": "none" }} />
                   acquisition */}
                  <br className="bd" />
                  {" "}
                  <span className="hero-line2">
                    <span className="accent-i">
                      before
                    </span>
                    <br className="bm" style={{ "display": "none" }} />
                    {" the market does."}
                  </span>
                </h1>
                <p className="lede">
                  We use AI to match you with startups that fit your exact mandate — then send you only the deals worth your time. No retainers. No finder fees. No noise.
                </p>
                <div className="cta-row">
                  <a className="btn btn-primary" href={buyerOnboardingUrl} target="_blank" rel="noopener noreferrer">
                    Join buyer network
                  </a>
                  <a className="link" href="#how">
                    {"See how matching works "}
                    <span className="arrow">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-trust reveal mt-20">
              <span>
                <i className="trust-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </i>
                <span className="tl">
                  <b>
                    1100+ verified startups,
                  </b>
                  live now
                </span>
              </span>
              <span>
                <i className="trust-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </i>
                <span className="tl">
                  <b>
                    ₹3000 Cr+ in deal value,
                  </b>
                  matched
                </span>
              </span>
              <span>
                <i className="trust-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </i>
                <span className="tl">
                  <b>
                    Always free,
                  </b>
                  for buyers
                </span>
              </span>
            </div>
          </div>
        </section>
        <section className="section-pad on-light" data-screen-label="Why buyers">
          <div className="amb">
            <div className="halfcircle warm drift" data-speed="0.18" style={{ "width": "300px", "height": "300px", "left": "-120px", "top": "14%" }} />
            <div className="halfcircle drift" data-speed="0.24" style={{ "width": "200px", "height": "200px", "right": "6%", "bottom": "6%" }} />
          </div>
          <div className="wrap">
            <div className="eyebrow-row reveal">
              <span className="num">
                01
              </span>
              <span className="kicker">
                Why buyers choose us
              </span>
              <span className="ln" />
            </div>
            <h2 className="h-sec reveal">
              {"Curated dealflow, "}
              <span className="accent-i">
                diligence-ready
              </span>
              {" from day one."}
            </h2>
            <div className="feat-grid why-grid reveal">
              <div className="feat">
                <span className="feat-ic">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="5" width="14" height="14" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
                  </svg>
                </span>
                <div className="feat-n">
                  01
                </div>
                <h3>
                  Matched to your mandate
                </h3>
                <p>
                  AI reads your thesis — sector, stage, cheque size, geography — and surfaces only startups that actually fit.
                </p>
              </div>
              <div className="feat">
                <span className="feat-ic">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                <div className="feat-n">
                  02
                </div>
                <h3>
                  Diligence-ready from day one
                </h3>
                <p>
                  Verified financials, clean cap tables, structured data rooms. Banker-grade, not founder-improvised.
                </p>
              </div>
              <div className="feat">
                <span className="feat-ic">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div className="feat-n">
                  03
                </div>
                <h3>
                  Fast, human responses
                </h3>
                <p>
                  Real deal teams behind the AI. Meeting requests and diligence questions answered in hours, not weeks.
                </p>
              </div>
              <div className="feat lead">
                <span className="feat-ic">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18" />
                    <path d="M5 21h14" />
                    <path d="M3 7h4c2 0 4-1 5-2 1 1 3 2 5 2h4" />
                    <path d="M7 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z" />
                    <path d="M17 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z" />
                  </svg>
                </span>
                <div className="feat-n">
                  04
                </div>
                <h3 className='!text-white'>
                  Always free for buyers
                </h3>
                <p className='!text-[#9E9B95]'>
                  No retainers, no finder fees, no hidden charges. We’re paid by the deal — never by you.
                </p>
                <div className="feat-big">
                  <span className='!text-[#F0C86C]'>₹0</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="press-strip" data-screen-label="As seen in">
          <div className="wrap press-row" style={{ "borderWidth": "0px" }}>
            <span className="press-label">
              As seen in
            </span>
            <div className="press-marquee">
              <div className="press-track">
                <span className="press-ph">
                  Press logo placeholder
                </span>
                <span className="press-ph">
                  Press logo placeholder
                </span>
                <span className="press-ph">
                  Press logo placeholder
                </span>
                <span className="press-ph">
                  Press logo placeholder
                </span>
                <span className="press-ph">
                  Press logo placeholder
                </span>
                <span className="press-ph" aria-hidden="true">
                  Press logo placeholder
                </span>
                <span className="press-ph" aria-hidden="true">
                  Press logo placeholder
                </span>
                <span className="press-ph" aria-hidden="true">
                  Press logo placeholder
                </span>
                <span className="press-ph" aria-hidden="true">
                  Press logo placeholder
                </span>
                <span className="press-ph" aria-hidden="true">
                  Press logo placeholder
                </span>
              </div>
            </div>
          </div>
        </section> */}
        <section className="section-pad on-light" id="how" data-screen-label="How it works">
          <div className="amb">
            <div className="bigicon drift" data-speed="0.06" style={{ "width": "440px", "height": "440px", "right": "-110px", "top": "40px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <div className="halfcircle drift" data-speed="0.22" style={{ "width": "200px", "height": "200px", "left": "4%", "bottom": "6%" }} />
          </div>
          <div className="wrap">
            <div className="eyebrow-row reveal">
              <span className="num">
                02
              </span>
              <span className="kicker">
                How it works
              </span>
              <span className="ln" />
            </div>
            <h2 className="h-sec reveal">
              {"Your next acquisition, "}
              <span className="accent-copper">
                without the noise.
              </span>
            </h2>
            <p className="sec-lede reveal" style={{ "marginTop": "18px" }}>
              Tell us your mandate once. The system does the sourcing.
            </p>
            <div className="flow-grid reveal">
              <div className="flow-step">
                <div className="fx fx-orb">
                  <span className="ring" />
                  <span className="ring b" />
                  <span className="core" />
                </div>
                <div className="fn">
                  01
                </div>
                <h4>
                  Set your mandate
                </h4>
                <p>
                  Share what you’re hunting for — sector, stage, cheque size, strategic fit. Five minutes, once.
                </p>
              </div>
              <div className="flow-step">
                <div className="fx fx-scan">
                  <span className="rim" />
                  <span className="dial" />
                  <span className="dot" />
                </div>
                <div className="fn">
                  02
                </div>
                <h4>
                  AI runs the match
                </h4>
                <p>
                  Our models scan 1100+ verified startups and score fit against your thesis. You see only what’s relevant.
                </p>
              </div>
              <div className="flow-step">
                <div className="fx fx-bars">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="fn">
                  03
                </div>
                <h4>
                  Review diligence-ready deals
                </h4>
                <p>
                  Each deal arrives with verified financials, a banker-authored brief, and data-room access in minutes.
                </p>
              </div>
              <div className="flow-step">
                <div className="fx fx-check">
                  <svg viewBox="0 0 42 42">
                    <circle className="rim" cx="21" cy="21" r="19" />
                    <circle className="burst" cx="21" cy="21" r="19" />
                    <path className="tick" d="M13 22 l5 5 l11 -12" />
                  </svg>
                </div>
                <div className="fn">
                  04
                </div>
                <h4>
                  Move on the ones that fit
                </h4>
                <p>
                  We run the process end to end — intros, diligence, structuring — so you focus on the decision.
                </p>
              </div>
            </div>
          </div>
        </section>
        </div>
        <section className="manifesto" data-screen-label="Manifesto">
          <div className="amb">
            <div className="glow warm" style={{ "width": "520px", "height": "430px", "left": "-7%", "top": "4%", "opacity": ".32" }} />
            <div className="glow p" style={{ "width": "560px", "height": "470px", "right": "-6%", "bottom": "-4%", "opacity": ".24" }} />
            <div className="halfcircle warm drift" data-speed="0.16" style={{ "width": "300px", "height": "300px", "left": "3%", "bottom": "6%" }} />
            <div className="halfcircle drift" data-speed="0.10" style={{ "width": "230px", "height": "230px", "right": "6%", "top": "8%" }} />
            <div className="ring dash drift" data-speed="0.20" style={{ "width": "170px", "height": "170px", "left": "13%", "top": "16%" }} />
            <div className="bigicon drift" data-speed="0.06" style={{ "width": "200px", "height": "200px", "left": "5%", "top": "8%", "color": "rgba(244,205,102,0.08)" }}>
              <svg viewBox="0 0 24 24">
                <use href="#ic-scale" />
              </svg>
            </div>
            <div className="bigicon drift" data-speed="0.05" style={{ "width": "180px", "height": "180px", "right": "6%", "bottom": "6%", "color": "rgba(166,174,255,0.09)" }}>
              <svg viewBox="0 0 24 24">
                <use href="#ic-spark" />
              </svg>
            </div>
          </div>
          <p className="big" id="mf-text">
            <span className="mf-w">
              AI
            </span>
            {" "}
            <span className="mf-w">
              runs
            </span>
            {" "}
            <span className="mf-w">
              the
            </span>
            {" "}
            <span className="mf-w">
              analysis.
            </span>
            {" "}
            <span className="mf-w mf-em">
              We
            </span>
            {" "}
            <span className="mf-w mf-em">
              run
            </span>
            {" "}
            <span className="mf-w mf-em">
              the
            </span>
            {" "}
            <span className="mf-w mf-em">
              deal.
            </span>
            {" "}
            <span className="mf-w">
              Models
            </span>
            {" "}
            <span className="mf-w">
              match
            </span>
            {" "}
            <span className="mf-w">
              and
            </span>
            {" "}
            <span className="mf-w">
              rank
            </span>
            {" "}
            <span className="mf-w">
              against
            </span>
            {" "}
            <span className="mf-w">
              your
            </span>
            {" "}
            <span className="mf-w">
              thesis;
            </span>
            {" "}
            <span className="mf-w">
              our
            </span>
            {" "}
            <span className="mf-w">
              deal
            </span>
            {" "}
            <span className="mf-w">
              team
            </span>
            {" "}
            <span className="mf-w">
              runs
            </span>
            {" "}
            <span className="mf-w">
              the
            </span>
            {" "}
            <span className="mf-w">
              intros,
            </span>
            {" "}
            <span className="mf-w">
              diligence
            </span>
            {" "}
            <span className="mf-w">
              and
            </span>
            {" "}
            <span className="mf-w">
              structuring
            </span>
            {" "}
            <span className="mf-w">
              —
            </span>
            {" "}
            <span className="mf-w">
              so
            </span>
            {" "}
            <span className="mf-w">
              your
            </span>
            {" "}
            <span className="mf-w mf-blue">
              time
            </span>
            {" "}
            <span className="mf-w mf-blue">
              goes
            </span>
            {" "}
            <span className="mf-w mf-blue">
              only
            </span>
            {" "}
            <span className="mf-w mf-blue">
              to
            </span>
            {" "}
            <span className="mf-w mf-blue">
              the
            </span>
            {" "}
            <span className="mf-w mf-blue">
              opportunities
            </span>
            {" "}
            <span className="mf-w mf-blue">
              worth
            </span>
            {" "}
            <span className="mf-w mf-blue">
              it.
            </span>
          </p>
        </section>
          <section className="section-pad" id="serve" data-screen-label="Who we serve">
            <div className="amb">
              <div className="glow warm" style={{ "width": "460px", "height": "380px", "right": "2%", "top": "8%", "opacity": ".20" }} />
              <div className="halfcircle warm drift" data-speed="0.16" style={{ "width": "240px", "height": "240px", "left": "-90px", "bottom": "8%" }} />
            </div>
            <div className="wrap">
              <div className="eyebrow-row reveal">
                <span className="num">
                  03
                </span>
                <span className="kicker">
                  Who we serve
                </span>
                <span className="ln" />
              </div>
              <h2 className="h-sec reveal">
                {"Built for buyers who "}
                <span className="accent-i">
                  move with conviction.
                </span>
              </h2>
              <p className="sec-lede reveal" style={{ "marginTop": "18px" }}>
                Whether you’re acquiring to grow or investing to back the next winner, we send you deals that fit — and only those.
              </p>
              <div className="feat-grid serve-grid reveal">
                <div className="feat">
                  <span className="feat-ic">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </span>
                  <h3>
                    Ambitious startups & scale-ups
                  </h3>
                  <p>
                    Founders acquiring to add product, team, or distribution. Inorganic growth, done cleanly.
                  </p>
                </div>
                <div className="feat">
                  <span className="feat-ic">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                    </svg>
                  </span>
                  <h3>
                    Family offices
                  </h3>
                  <p>
                    Patient capital looking for direct access to vetted, high-conviction startup deals.
                  </p>
                </div>
                <div className="feat">
                  <span className="feat-ic">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="1.5" />
                      <path d="M9 22v-4h6v4" />
                      <line x1="9" y1="6" x2="9.01" y2="6" />
                      <line x1="15" y1="6" x2="15.01" y2="6" />
                      <line x1="9" y1="10" x2="9.01" y2="10" />
                      <line x1="15" y1="10" x2="15.01" y2="10" />
                    </svg>
                  </span>
                  <h3>
                    Corporate venture capital
                  </h3>
                  <p>
                    Strategic arms hunting acquisitions and investments aligned to the core business.
                  </p>
                </div>
                <div className="feat">
                  <span className="feat-ic">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                  </span>
                  <h3>
                    Venture & growth funds
                  </h3>
                  <p>
                    VCs and growth investors who want curated, thesis-matched dealflow without the inbound noise.
                  </p>
                </div>
              </div>
              <div style={{ "marginTop": "40px" }} className="reveal">
                <a className="btn btn-primary" href={buyerOnboardingUrl} target="_blank" rel="noopener noreferrer">
                  Join buyer network
                </a>
              </div>
            </div>
          </section>
          <section className="section-pad" data-screen-label="What you get">
            <div className="amb">
              <div className="bigicon drift" data-speed="0.05" style={{ "width": "400px", "height": "400px", "left": "-70px", "top": "40px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>
            <div className="wrap">
              <div className="eyebrow-row reveal">
                <span className="num">
                  04
                </span>
                <span className="kicker">
                  At no cost
                </span>
                <span className="ln" />
              </div>
              <div className="get-grid">
                <h2 className="h-sec reveal">
                  {"Everything a buyer needs. "}
                  <span className="accent-copper">
                    Nothing
                  </span>
                  {" you pay for."}
                </h2>
                <ul className="sc-list reveal">
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    <span>
                      <b>
                        Instant alerts
                      </b>
                      {" on mandates that match your thesis."}
                    </span>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>
                      <b>
                        Verified historical financials
                      </b>
                      {" and clean cap tables."}
                    </span>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                    <span>
                      <b>
                        A banker-authored deal brief
                      </b>
                      {" for every opportunity."}
                    </span>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <span>
                      <b>
                        Secure data-room access
                      </b>
                      {" within minutes."}
                    </span>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>
                      <b>
                        Fast diligence turnaround
                      </b>
                      {" — questions answered in hours."}
                    </span>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>
                      <b>
                        A real deal team
                      </b>
                      {" — AI matches, people run the deal."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="section-pad" id="why" data-screen-label="Why Done Deal">
            <div className="amb">
              <div className="glow p" style={{ "width": "520px", "height": "430px", "left": "4%", "top": "10%", "opacity": ".18" }} />
              <div className="bigicon drift" data-speed="0.07" style={{ "width": "420px", "height": "420px", "right": "-90px", "top": "30px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M5 21h14" />
                  <path d="M3 7h4c2 0 4-1 5-2 1 1 3 2 5 2h4" />
                  <path d="M7 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z" />
                  <path d="M17 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z" />
                </svg>
              </div>
            </div>
            <div className="wrap">
              <div className="eyebrow-row reveal">
                <span className="num">
                  05
                </span>
                <span className="kicker">
                  Why Done Deal
                </span>
                <span className="ln" />
              </div>
              <h2 className="h-sec reveal">
                {"The Indian mid-market deserves institutional-grade advisory. "}
                <span className="accent-i">
                  We built it.
                </span>
              </h2>
              <div className="duo reveal">
                <div className="panel human">
                  <div className="cmp-label">
                    Old way
                  </div>
                  <h3>
                    Brokered & opaque
                  </h3>
                  <p>
                    Brokered intros, months of back-and-forth, opaque fees, and deals that don’t fit.
                  </p>
                </div>
                <div className="panel machine">
                  <span className="crown-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 7.5l4.2 3.4L12 4l4.8 6.9L21 7.5 19.2 19H4.8L3 7.5zM4.8 21h14.4v0H4.8z" />
                    </svg>
                    Recommended
                  </span>
                  <div className="cmp-label">
                    New way
                  </div>
                  <h3>
                    AI-matched & aligned
                  </h3>
                  <p>
                    AI-matched dealflow, diligence-ready from day one, zero cost to buyers, and a deal team that only wins when the deal closes.
                  </p>
                  <div className="panel-badges">
                    <span className="pbadge">
                      AI-matched
                    </span>
                    <span className="pbadge">
                      Diligence-ready
                    </span>
                    <span className="pbadge">
                      Zero buyer fees
                    </span>
                    <span className="pbadge">
                      Success-aligned
                    </span>
                  </div>
                </div>
              </div>
              <div className="wstat-row reveal">
                <div className="wstat">
                  <div className="wv" data-count-lower="45" data-count-upper="90">
                    45–90
                  </div>
                  <div className="wc">
                    {"days, mandate to close "}
                    <span style={{ "opacity": "0.6" }}>
                      (typical)
                    </span>
                  </div>
                </div>
                <div className="wstat">
                  <div className="wv" data-count-from="120">
                    <em>
                      ₹0
                    </em>
                  </div>
                  <div className="wc">
                    buyer fees, always
                  </div>
                </div>
                <div className="wstat">
                  <div className="wv" data-count="500" data-count-suffix="+">
                    500+
                  </div>
                  <div className="wc">
                    verified investors in the network
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-pad" id="faq" data-screen-label="FAQ">
            <div className="amb">
              <div className="bigicon drift" data-speed="0.05" style={{ "width": "400px", "height": "400px", "left": "-60px", "top": "40px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4z" />
                </svg>
              </div>
              <div className="halfcircle drift" data-speed="0.12" style={{ "width": "360px", "height": "360px", "right": "-160px", "bottom": "-140px" }} />
            </div>
            <div className="wrap">
              <div className="eyebrow-row reveal">
                <span className="num">
                  06
                </span>
                <span className="kicker">
                  Questions
                </span>
                <span className="ln" />
              </div>
              <h2 className="h-sec reveal">
                {"Everything you need to "}
                <span className="accent-i">
                  know.
                </span>
              </h2>
              <div className="faq-list">
                {DISPLAY_FAQS.map((faq) => (
                  <div className="faq-item reveal" key={faq.id}>
                    <button className="faq-q" type="button">
                      {faq.q}
                      <span className="pm" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div className="faq-a">
                      <div className="faq-a-inner">
                        {faq.a.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="final-cta" id="cta" data-screen-label="Final CTA">
            <div className="amb">
              <div className="glow p" style={{ "width": "560px", "height": "460px", "left": "50%", "top": "-12%", "transform": "translateX(-50%)", "opacity": ".22" }} />
            </div>
            <div className="wrap">
              <div className="eyebrow-row reveal" style={{ "justifyContent": "center" }}>
                <span className="kicker">
                  Get started
                </span>
              </div>
              <h2 className="h-sec reveal">
                {"Ready to see deals that "}
                <span className="accent-i">
                  actually fit?
                </span>
              </h2>
              <p className="sec-lede reveal">
                Join the buyer network and get thesis-matched, diligence-ready opportunities the moment they go live.
              </p>
            </div>
          </section>
          <section className="cta-band" data-screen-label="CTA actions">
            <a className="btn btn-primary" href={buyerOnboardingUrl} target="_blank" rel="noopener noreferrer">
              Join buyer network
            </a>
            <a className="link" href={buyerLoginUrl} target="_blank" rel="noopener noreferrer">
              {"Already a member? Login "}
              <span className="arrow">
                →
              </span>
            </a>
          </section>
      </main>
      <Footer theme="light" />
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/mandates.css';

/* ── SVG icon fragments ─────────────────────────────────────── */
const BankPaths = () => (
  <>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </>
);
const BagPaths = () => (
  <>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </>
);
const BriefcasePaths = () => (
  <>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
  </>
);
const CloudPaths = () => (
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
);
const HeartPaths = () => (
  <>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    <path d="M3.5 12h5L10 9l2 5 2-7 1.5 5h5" />
  </>
);
const CircuitPaths = () => (
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M11 9h4a2 2 0 0 0 2-2V3" />
    <circle cx="9" cy="9" r="1.6" />
    <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
    <circle cx="15" cy="15" r="1.6" />
  </>
);
const CpuPaths = () => (
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" />
    <line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="14" x2="22" y2="14" />
    <line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="14" x2="4" y2="14" />
  </>
);
const CartPaths = () => (
  <>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 7H5.1" />
  </>
);
const LayersPaths = () => (
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </>
);

function MIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────────── */
const FEATURED = [
  {
    id: 'f1', cat: 'fintech', pill: 'Fintech',
    title: 'B2B payments infrastructure',
    desc: 'Professional services and accounting focus: advisory, cybersecurity and finance-offshoring businesses, excluding pure IT services and BPO.',
    rev: '₹0–50 cr+', ebitda: 'Positive',
    icon: <BankPaths />,
  },
  {
    id: 'f2', cat: 'consumer', pill: 'Consumer Brands',
    title: 'Beauty & personal care',
    desc: 'Large FMCG player interested in profitable BP&C and home-care brands, preferably with a pan-India presence.',
    rev: '₹50–200 cr', ebitda: 'Positive',
    icon: <BagPaths />,
  },
  {
    id: 'f3', cat: 'b2b', pill: 'B2B Services',
    title: 'UI/UX & design studios',
    desc: 'Large media company looking to acquire UI/UX companies generating 70% and more of their revenue from outside India.',
    rev: '₹30–200 cr', ebitda: 'Open to all',
    icon: <BriefcasePaths />,
  },
  {
    id: 'f4', cat: 'saas', pill: 'SaaS',
    title: 'Vertical SaaS platforms',
    desc: 'Global software group acquiring vertical SaaS companies with sticky, recurring ARR in logistics, healthcare or construction.',
    rev: '₹10–100 cr', ebitda: 'Open to all',
    icon: <CloudPaths />,
  },
  {
    id: 'f5', cat: 'healthcare', pill: 'Healthcare',
    title: 'Diagnostics & healthtech',
    desc: 'Hospital chain seeking diagnostics, healthtech and home-care companies scaling across tier-2 and tier-3 cities.',
    rev: '₹10–100 cr', ebitda: 'Open to all',
    icon: <HeartPaths />,
  },
  {
    id: 'f6', cat: 'ai', pill: 'AI/Deeptech/IOT',
    title: 'Applied AI & automation',
    desc: 'Enterprise automation leader acquiring applied-AI and workflow startups with proven enterprise deployments.',
    rev: '₹0–80 cr', ebitda: 'Open to all',
    icon: <CircuitPaths />,
  },
];

const MANDATES = [
  {
    id: 'm1', cat: 'it', pill: 'IT Services',
    title: 'Enterprise platforms',
    desc: 'Prominent software services major interested in IT services companies focused on data analytics, ServiceNow, Salesforce, SAP & MS Dynamics.',
    rev: '₹0–50 cr', ebitda: 'Open to all',
    icon: <CpuPaths />,
  },
  {
    id: 'm2', cat: 'ai', pill: 'AI/Deeptech/IOT',
    title: 'Cybersecurity & DeepTech',
    desc: 'Large IT services company interested in companies with cybersecurity, AI and DeepTech capabilities.',
    rev: '₹0–50 cr', ebitda: 'Open to all',
    icon: <CircuitPaths />,
  },
  {
    id: 'm3', cat: 'saas', pill: 'SaaS',
    title: 'Vertical SaaS',
    desc: 'Global software group seeking vertical SaaS companies in logistics, healthcare or construction with sticky, recurring ARR.',
    rev: '₹10–100 cr', ebitda: 'Open to all',
    icon: <CloudPaths />,
  },
  {
    id: 'm4', cat: 'fintech', pill: 'Fintech',
    title: 'Lending & payments',
    desc: 'Large NBFC interested in lending, payments and embedded-finance platforms with strong unit economics.',
    rev: '₹20–150 cr', ebitda: 'Positive',
    icon: <BankPaths />,
  },
  {
    id: 'm5', cat: 'consumer', pill: 'Consumer Brands',
    title: 'D2C food & beverage',
    desc: 'Packaged-foods major scouting profitable D2C food and beverage brands with established pan-India distribution.',
    rev: '₹25–120 cr', ebitda: 'Positive',
    icon: <BagPaths />,
  },
  {
    id: 'm6', cat: 'healthcare', pill: 'Healthcare',
    title: 'Diagnostics & healthtech',
    desc: 'Hospital chain interested in diagnostics, healthtech and home-care companies expanding across tier-2 cities.',
    rev: '₹10–100 cr', ebitda: 'Open to all',
    icon: <HeartPaths />,
  },
  {
    id: 'm7', cat: 'marketplace', pill: 'Marketplace',
    title: 'B2B commerce',
    desc: 'Established marketplace operator looking to acquire B2B commerce platforms in industrial or agri supply chains.',
    rev: '₹0–80 cr', ebitda: 'Open to all',
    icon: <CartPaths />,
  },
  {
    id: 'm8', cat: 'ai', pill: 'AI/Deeptech/IOT',
    title: 'MobilityTech',
    desc: 'Prominent automobile company looking to invest in or acquire MobilityTech startups — EV tech, battery management, IoT and GPS.',
    rev: '₹0–50 cr', ebitda: 'Open to all',
    icon: <CircuitPaths />,
  },
  {
    id: 'm9', cat: 'it', pill: 'IT Services',
    title: 'Data analytics services',
    desc: 'Large data analytics services provider interested in companies serving CPG, BFSI and health clients across the US & Europe.',
    rev: '₹0–200 cr', ebitda: 'Positive',
    icon: <CpuPaths />,
  },
];

const FILTERS = [
  { key: 'all',         label: 'All mandates' },
  { key: 'it',         label: 'IT Services' },
  { key: 'ai',         label: 'AI/Deeptech/IOT' },
  { key: 'saas',       label: 'SaaS' },
  { key: 'fintech',    label: 'Fintech' },
  { key: 'consumer',   label: 'Consumer Brands' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'marketplace',label: 'Marketplace' },
];

/* ── Mandate card ───────────────────────────────────────────── */
function MandateCard({ item, featured = false }) {
  return (
    <article className={`mcard${featured ? ' featured' : ''}`} data-cat={item.cat}>
      {featured && <span className="fbadge">Featured</span>}
      <div className="mcard-head">
        <span className="mcard-ic"><MIcon>{item.icon}</MIcon></span>
        <div className="mcard-headtext">
          <span className="mcard-pill">{item.pill}</span>
          <h3>{item.title}</h3>
        </div>
      </div>
      <p>{item.desc}</p>
      <div className="mcard-foot">
        <div className="mcard-meta">
          <div className="mcol">
            <span className="k">Revenue range</span>
            <span className="v">{item.rev}</span>
          </div>
          <div className="mcol">
            <span className="k">EBITDA preference</span>
            <span className="v">{item.ebitda}</span>
          </div>
        </div>
        <a className="btn-express" href="https://app.done.deals/signup?utm_source=mandate-page">
          Express interest
        </a>
      </div>
    </article>
  );
}

/* ── Featured slider ────────────────────────────────────────── */
function FeaturedSlider({ items }) {
  const [current, setCurrent] = useState(() => {
    const saasIndex = items.findIndex((item) => item.cat === 'saas');
    return saasIndex >= 0 ? saasIndex : 0;
  });
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const n = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const viewport = track.parentElement;
    if (!viewport) return;

    const update = () => {
      const cards = [...track.children];
      const card = cards[current];
      if (!card) return;
      const vw = viewport.offsetWidth;
      const cw = card.offsetWidth;
      const cl = card.offsetLeft;
      track.style.transform = `translateX(${-(cl - (vw - cw) / 2)}px)`;
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [current]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setCurrent((c) => (c + 1) % n);
    }, 4000);
    return () => clearInterval(id);
  }, [n]);

  const go = (i) => setCurrent(((i % n) + n) % n);

  return (
    <div
      className="fslider reveal"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="fslider-viewport">
        <div className="fslider-track" ref={trackRef}>
          {items.map((item, i) => (
            <div key={item.id} className={`mcard-shell${i === current ? ' active' : ''}`}>
              <MandateCard item={item} featured />
            </div>
          ))}
        </div>
      </div>
      <div className="fslider-controls">
        <button className="fnav" aria-label="Previous" onClick={() => go(current - 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="fslider-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={i === current ? 'on' : ''}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="fnav" aria-label="Next" onClick={() => go(current + 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Mandates() {
  useReveal();
  useParallax();
  useLightwell();

  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? MANDATES : MANDATES.filter((m) => m.cat === filter);

  return (
    <>
      <Nav current="mandates" />
      <main id="top">

        {/* ── Hero with featured slider ───────────────────────── */}
        <section className="m-hero">
          <div className="amb">
            <div className="glow p absolute" style={{ width: 560, height: 460, left: '50%', top: '-14%', transform: 'translateX(-50%)', opacity: 0.4 }} />
            <div className="glow warm absolute" style={{ width: 320, height: 300, left: '1%', top: '14%', opacity: 0.36 }} />
            <div className="ring drift absolute" data-speed="0.10" style={{ width: 280, height: 280, right: '4%', top: '8%' }} />
            <div
              className="float-ic drift absolute"
              data-speed="0.20"
              style={{ width: 64, height: 64, right: '9%', bottom: '8%', color: 'rgba(232,194,90,0.22)' }}
            >
              <MIcon><BriefcasePaths /></MIcon>
            </div>
          </div>

          <div className="wrap">
            <div className="m-hero-text reveal">
              <div className="kicker">
                <span className="live-dot" />
                <span className="kp">Active buyer requirements</span>
                <span className="dot" style={{ color: 'var(--bone-faint)', margin: '0 12px' }}>·</span>
                <span className="kp">Updated weekly</span>
              </div>
              <h1 className="h-display">
                Live mandates from buyers <span className="accent-i">ready</span> to deploy.
              </h1>
              <p className="lede">
                Real, active acquisition and investment requirements from our vetted investors. Find the mandate that fits your company — and get introduced directly.
              </p>
            </div>
          </div>

          <div className="wrap">
            <FeaturedSlider items={FEATURED} />
          </div>
        </section>

        {/* ── Live mandates ───────────────────────────────────── */}
        <section className="section-pad" id="mandates">
          <div className="amb">
            <div className="bigicon drift absolute" data-speed="0.06" style={{ width: 420, height: 420, right: -110, top: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <LayersPaths />
              </svg>
            </div>
            <div className="glow p absolute" style={{ width: 440, height: 380, left: '-8%', top: '6%', opacity: 0.32 }} />
            <div className="glow warm absolute" style={{ width: 300, height: 280, right: '8%', bottom: '-4%', opacity: 0.3 }} />
            <div
              className="float-ic drift absolute"
              data-speed="0.18"
              style={{ width: 70, height: 70, left: '4%', bottom: '12%', color: 'rgba(124,138,255,0.16)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1.5" x2="9" y2="4" /><line x1="15" y1="1.5" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="22.5" /><line x1="15" y1="20" x2="15" y2="22.5" />
                <line x1="20" y1="9" x2="22.5" y2="9" /><line x1="20" y1="15" x2="22.5" y2="15" />
                <line x1="1.5" y1="9" x2="4" y2="9" /><line x1="1.5" y1="15" x2="4" y2="15" />
              </svg>
            </div>
          </div>

          <div className="wrap">
            <div className="eyebrow-row reveal">
              <span className="num">01</span>
              <span className="kicker">Live mandates</span>
              <span className="ln" />
            </div>
            <h2 className="h-sec reveal">
              Every open requirement, <span className="accent-copper">in one place.</span>
            </h2>
            <p className="sec-lede reveal" style={{ marginTop: 18 }}>
              Filter by sector to find the buyers actively looking for companies like yours.
            </p>

            {/* Filter chips */}
            <div className="mand-filters reveal" role="tablist">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`fchip${filter === f.key ? ' on' : ''}`}
                  role="tab"
                  aria-selected={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mandate grid */}
            <div className="mand-grid">
              {visible.map((m) => (
                <div key={m.id} className="mcard-shell">
                  <MandateCard item={m} />
                </div>
              ))}
            </div>
            {visible.length === 0 && (
              <div className="mand-noresult">No mandates in this category yet — check back soon.</div>
            )}
          </div>
        </section>

        {/* ── Get started ─────────────────────────────────────── */}
        <section className="section-pad" id="list">
          <div className="amb">
            <div className="glow p absolute" style={{ width: 480, height: 420, left: '-6%', top: '-10%', opacity: 0.36 }} />
            <div className="glow warm absolute" style={{ width: 380, height: 340, right: '-4%', bottom: '-18%', opacity: 0.38 }} />
            <div className="ring dash drift absolute" data-speed="0.14" style={{ width: 200, height: 200, right: '8%', top: '12%' }} />
            <div
              className="float-ic drift absolute"
              data-speed="0.18"
              style={{ width: 72, height: 72, left: '5%', bottom: '12%', color: 'rgba(232,194,90,0.22)' }}
            >
              <MIcon><BankPaths /></MIcon>
            </div>
          </div>

          <div className="wrap">
            <div className="eyebrow-row reveal">
              <span className="num">02</span>
              <span className="kicker">Get started</span>
              <span className="ln" />
            </div>
            <h2 className="h-sec reveal">
              Whichever side of the deal <span className="accent-i">you're on.</span>
            </h2>

            <div className="duo-cta">
              {/* Founders card */}
              <div className="cta-card founders reveal">
                <div className="amb">
                  <div className="glow p absolute" style={{ width: 300, height: 260, right: '-12%', top: '-30%', opacity: 0.7 }} />
                  <div
                    className="float-ic drift absolute"
                    data-speed="0.14"
                    style={{ width: 120, height: 120, right: '-3%', bottom: '-14%', color: 'rgba(124,138,255,0.12)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <LayersPaths />
                    </svg>
                  </div>
                </div>
                <span className="cta-tag">For founders</span>
                <h3>Not a fit? No problem.</h3>
                <p>Our vetted investors are always looking for great companies. Get your valuation and let the right buyers find you — it's completely free.</p>
                <div className="cta-actions">
                  <a className="btn btn-primary" href="https://app.done.deals/signup?utm_source=mandate-page">
                    Sign up as a company
                  </a>
                  <a className="link" href="https://app.done.deals/valuation-calculator">
                    Get your valuation <span className="arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Investors card */}
              <div className="cta-card investors reveal">
                <div className="amb">
                  <div className="glow warm absolute" style={{ width: 300, height: 260, right: '-12%', top: '-30%', opacity: 0.7 }} />
                  <div
                    className="float-ic drift absolute"
                    data-speed="0.14"
                    style={{ width: 120, height: 120, right: '-3%', bottom: '-14%', color: 'rgba(232,194,90,0.13)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <BankPaths />
                    </svg>
                  </div>
                </div>
                <span className="cta-tag">For investors</span>
                <h3>Have a requirement?</h3>
                <p>List a mandate and we'll source companies that fit. Our team curates and vets every match before it ever reaches you.</p>
                <div className="cta-actions">
                  <a className="btn btn-light" href="https://app.done.deals/buyer/onboarding?utm_source=mandate-page">
                    List a mandate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

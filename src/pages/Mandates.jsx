import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/mandates.css';
import Seo from '../components/Seo';
import { ROUTE_META } from '../seo/meta';

import { cdnUrl } from '../config/cdn';

const iconAgency = cdnUrl('agency.svg');
const iconAi = cdnUrl('ai.svg');
const iconB2b = cdnUrl('b2b-Services.svg');
const iconConsumer = cdnUrl('consumer_brands.svg');
const iconEdTech = cdnUrl('ed-Tech.svg');
const iconFintechImg = cdnUrl('fintech.svg');
const iconGaming = cdnUrl('gaming.svg');
const iconHealthcareImg = cdnUrl('healthcare.svg');
const iconHospitality = cdnUrl('hospitality.svg');
const iconItServices = cdnUrl('it-services.svg');
const iconMarketplaceImg = cdnUrl('marketplace.svg');
const iconOthers = cdnUrl('others.svg');
const iconRenewables = cdnUrl('renewables.svg');
const iconSaasImg = cdnUrl('saas.svg');

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
const BriefcasePaths = () => (
  <>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
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

/* ── Category → icon / slug helpers ──────────────────────────── */
function slugifyCategory(category) {
  return category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function iconForCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('it service') || c.includes('it product')) return iconItServices;
  if (c.includes('healthcare')) return iconHealthcareImg;
  if (c.includes('fintech')) return iconFintechImg;
  if (c.includes('saas')) return iconSaasImg;
  if (c.includes('ai') || c.includes('deeptech') || c.includes('iot')) return iconAi;
  if (c.includes('consumer')) return iconConsumer;
  if (c.includes('b2b')) return iconB2b;
  if (c.includes('marketplace')) return iconMarketplaceImg;
  if (c.includes('agency')) return iconAgency;
  if (c.includes('ed-tech') || c.includes('ed tech') || c.includes('edtech')) return iconEdTech;
  if (c.includes('gaming')) return iconGaming;
  if (c.includes('hospitality')) return iconHospitality;
  if (c.includes('renewable')) return iconRenewables;
  return iconOthers;
}

/* ── Revenue formatting ───────────────────────────────────────
   0-999 → as-is · 1,000+ → "N thousand" · 1,00,000+ → "N L" · 1,00,00,000+ → "N cr" */
function formatAmount(value) {
  const trim = (n) => (Number.isInteger(n) ? n : n.toFixed(1));
  if (value >= 1e7) return `${trim(value / 1e7)} cr`;
  if (value >= 1e5) return `${trim(value / 1e5)} L`;
  if (value >= 1e3) return `${trim(value / 1e3)} thousand`;
  return `${value}`;
}

function formatRevenueRange(minValue, maxValue) {
  return `₹${formatAmount(minValue)} – ${formatAmount(maxValue)}`;
}

function mandateFromApi({ id, title, description, category, revenue_min_value, revenue_max_value, ebitda }) {
  return {
    id,
    cat: slugifyCategory(category),
    pill: category,
    title,
    desc: description,
    rev: formatRevenueRange(revenue_min_value, revenue_max_value),
    ebitda: ebitda === true ? 'Positive' : 'Open to all',
    iconImg: iconForCategory(category),
  };
}

/* ── Data ───────────────────────────────────────────────────── */
const MANDATES_DATA = [
  {
    id: 235,
    title: 'IT Services, BPO, KPO Companies',
    description: 'Early-stage AI infra startup improving LLM performance through high-quality data, evaluation, and reinforcement learning workflows.',
    category: 'IT Services/Products',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: true,
    status: 'active',
  },
  {
    id: 243,
    title: 'Engineering Services & Product Engineering',
    description: 'A global engineering services firm focused on digital engineering, embedded software, and product engineering across key industries.',
    category: 'IT Services/Products',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: null,
    status: 'active',
  },
  {
    id: 244,
    title: 'AI & Data Engineering Acquisition',
    description: 'Publicly listed Indian IT services company acquiring service-based firms in AI, cloud, data engineering, and CRM.',
    category: 'IT Services/Products',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: null,
    status: 'active',
  },
  {
    id: 245,
    title: 'AI & Cloud Service Companies',
    description: 'Publicly listed Indian IT services company acquiring service-based firms in AI & Cloud.',
    category: 'IT Services/Products',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: null,
    status: 'active',
  },
  {
    id: 246,
    title: 'IVF Clinics',
    description: 'IVF Clinics and Fertility centres with 20-40 monthly cycles, Revenue over 20cr with healthy EBITDA Margins.',
    category: 'Healthcare Services',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: true,
    status: 'active',
  },
  {
    id: 247,
    title: 'Manufacturing and Distribution Companies',
    description: 'The Strategic is looking to acquire companies in Industrial Manufacturing and Distributions space.',
    category: 'Others',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: true,
    status: 'active',
  },
  {
    id: 248,
    title: 'Manufacturing with IP - Agritech, Metal Products',
    description: 'Leading engineering and manufacturing company, delivering precision-engineered components across agriculture, railway, etc.',
    category: 'Others',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: true,
    status: 'active',
  },
  {
    id: 249,
    title: 'Agritech - Spices, Nutraceuticals, Functional Foods',
    description: "India's leading agritech platform providing a digital marketplace for seeds, pesticides, and machinery.",
    category: 'Others',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: null,
    status: 'active',
  },
  {
    id: 250,
    title: 'Fintech - Loyalty, SaaS, AI Solutions',
    description: 'Leading provider of SaaS and FinTech solutions to manage business spends, payments and rewards through automated and innovative workflows.',
    category: 'Fintech',
    revenue_min_value: 0,
    revenue_max_value: 100000000,
    ebitda: true,
    status: 'active',
  },
];

const MANDATES = MANDATES_DATA
  .filter((m) => m.status === 'active')
  .map(mandateFromApi);

const FEATURED = MANDATES_DATA.slice(0, 6).map(mandateFromApi);

const FILTERS = [
  { key: 'all', label: 'All mandates' },
  ...[...new Map(MANDATES.map((m) => [m.cat, m.pill])).entries()]
    .map(([key, label]) => ({ key, label })),
];

/* ── Mandate card ───────────────────────────────────────────── */
function MandateCard({ item, featured = false, signupUrl }) {
  return (
    <article className={`mcard${featured ? ' featured' : ''}`} data-cat={item.cat}>
      {featured && <span className="fbadge">Featured</span>}
      <div className="mcard-head">
        <span className={`mcard-ic${item.iconImg ? ' mcard-ic--img' : ''}`}>
          {item.iconImg ? <img src={item.iconImg} alt="" /> : <MIcon>{item.icon}</MIcon>}
        </span>
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
        <a className="btn-express" href={signupUrl} target="_blank" rel="noopener noreferrer">
          Express interest
        </a>
      </div>
    </article>
  );
}

/* ── Featured slider ────────────────────────────────────────── */
function FeaturedSlider({ items, signupUrl }) {
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
              <MandateCard item={item} featured signupUrl={signupUrl} />
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

  const { search } = useLocation();
  const utmSource = new URLSearchParams(search).get('utm_source') || 'mandate-page';
  const signupUrl = `https://app.done.deals/signup?utm_source=${encodeURIComponent(utmSource)}`;
  const buyerOnboardingUrl = `https://app.done.deals/buyer/onboarding?utm_source=${encodeURIComponent(utmSource)}`;

  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? MANDATES : MANDATES.filter((m) => m.cat === filter);

  return (
    <>
      <Seo {...ROUTE_META['/mandates']} path="/mandates" />
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
            <FeaturedSlider items={FEATURED} signupUrl={signupUrl} />
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
                  <MandateCard item={m} signupUrl={signupUrl} />
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
                  <a className="btn btn-primary" href={signupUrl} target="_blank" rel="noopener noreferrer">
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
                  <a className="btn btn-light" href={buyerOnboardingUrl} target="_blank" rel="noopener noreferrer">
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

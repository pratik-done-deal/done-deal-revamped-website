import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { appUrl } from '../config/app';
import useUtmSource from '../hooks/useUtmSource';

const SIGNUP_URL = appUrl('signup');

// utm_source used when the modal is opened from the Nav "Get started" CTA (the
// header): the current page slug + "_header" (e.g. "investors_header",
// "home_header"). Other CTAs keep the generic page-slug source.
function headerUtmSource(pathname) {
  const slug = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
  return `${slug}_header`;
}

// utm_source used when the modal is opened from the homepage hero "Get started"
// button (the primary CTA in the hero, not the header). Applies to both the
// seller and investor options.
const HERO_UTM_SOURCE = 'home-get-started';

// utm_source used when the modal is opened from the homepage comparison
// section "Get started" button (class "cmpx-cta"). Applies to both options.
const COMPARISON_UTM_SOURCE = 'home-comparision';

// utm_source used when the modal is opened from the homepage CTA band that
// sits after the Investors section (class "dd-cta-band"). Applies to both
// options.
const CTA_BAND_UTM_SOURCE = 'home-footer';

const ROLE_OPTIONS = [
  {
    key: 'seller',
    title: "Get acquired or Fundraise ",
    desc: 'Run a structured fundraise or M&A process ',
    newTab: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M6 21V8l6-4 6 4v13" />
        <path d="M10 21v-5h4v5" />
        <path d="M10 9h.01" />
        <path d="M14 9h.01" />
      </svg>
    ),
  },
  {
    key: 'investor',
    base: appUrl('buyer/onboarding'),
    newTab: true,
    title: "Invest or acquire",
    desc: 'Access vetted companies aligned with your goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 7-7" />
        <path d="M17 8h4v4" />
      </svg>
    ),
  },
];

// "Get started" role modal + the click interception that opens it.
export default function RoleModal() {
  const [open, setOpen] = useState(false);

  // If the visitor already arrived with a utm_source (e.g. from LinkedIn), keep it.
  // Otherwise fall back to the page they clicked "Get started" from.
  const utmSource = useUtmSource();

  // When the modal is opened from a specific CTA (header or hero) and there's no
  // incoming utm_source, tag the source with a CTA-specific label. Kept in a ref
  // so the (mount-only) click handler always sees the current path's label.
  const { pathname } = useLocation();
  const headerLabelRef = useRef(headerUtmSource(pathname));
  headerLabelRef.current = headerUtmSource(pathname);
  const [ctaSource, setCtaSource] = useState(null);

  const activeSource = ctaSource || utmSource;
  const withUtm = (base) => `${base}?utm_source=${encodeURIComponent(activeSource)}`;

  // Lock page scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Intercept "Get started" CTAs anywhere in the preserved markup.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a,button');
      if (!a || a.closest('#dd-role-modal')) return;
      const txt = (a.textContent || '').trim().toLowerCase();
      const isHeaderCta = a.classList.contains('nav-cta') || a.classList.contains('dd-mn-cta');
      const isComparisonCta = a.classList.contains('cmpx-cta');
      const isCtaBand = a.classList.contains('dd-cta-band');
      const isHeroCta = txt === 'get started' && !!a.closest('.hero');
      const gs = txt === 'get started' || isHeaderCta || isComparisonCta;
      if (gs) {
        e.preventDefault();
        e.stopPropagation();
        // CTA-specific source, unless the visitor arrived with a utm_source
        // already on the URL (that always wins):
        //   header CTA → page-specific "…_header"
        //   homepage hero CTA → "home-get-started"
        //   homepage comparison CTA → "home-comparision"
        //   homepage CTA band (after Investors) → "home-footer"
        const incoming = new URLSearchParams(window.location.search).get('utm_source');
        let source = null;
        if (!incoming) {
          if (isHeaderCta) source = headerLabelRef.current;
          else if (isComparisonCta) source = COMPARISON_UTM_SOURCE;
          else if (isCtaBand) source = CTA_BAND_UTM_SOURCE;
          else if (isHeroCta) source = HERO_UTM_SOURCE;
        }
        setCtaSource(source);
        setOpen(true);
      }
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const close = () => setOpen(false);
  const go = (e) => {
    e.stopPropagation();
    close();
  };

  return (
    <div
      id="dd-role-modal"
      className={open ? 'open' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Get started"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="ddrm-bg" onClick={close} />
      <div className="ddrm-card">
        <button type="button" className="ddrm-close" onClick={close} aria-label="Close">✕</button>
        <div className="ddrm-eyebrow">Get started</div>
        <div className="ddrm-title">What are you looking for?</div>
        <div className="ddrm-sub">Tell us what you're here for  and we'll set up the right process from the start.</div>
        <div className="ddrm-opts">
          {ROLE_OPTIONS.map((opt) => (
            <a
              className={`ddrm-opt ${opt.key}`}
              href={withUtm(opt.base || SIGNUP_URL)}
              target={opt.newTab ? '_blank' : undefined}
              rel={opt.newTab ? 'noopener noreferrer' : undefined}
              onClick={go}
              key={opt.key}
            >
              <span className="ddrm-ic">{opt.icon}</span>
              <span className="ddrm-txt">
                <span className="ddrm-opt-t">{opt.title}</span>
                <span className="ddrm-opt-d">{opt.desc}</span>
              </span>
              <span className="ddrm-arrow">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SIGNUP_URL = 'https://app.done.deals/signup';

const ROLE_OPTIONS = [
  {
    key: 'seller',
    title: "I'm raising or selling",
    desc: 'Get acquired or raise capital for your company.',
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
    base: 'https://app.done.deals/buyer/onboarding',
    newTab: true,
    title: "I'm an investor",
    desc: 'Discover and back vetted companies.',
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
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // utm_source reflects the page the visitor clicked "Get started" from.
  const pageSlug = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
  const withUtm = (base) => `${base}?utm_source=${encodeURIComponent(pageSlug)}`;

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
      const gs = txt === 'get started' || a.classList.contains('nav-cta') || a.classList.contains('dd-mn-cta') || a.classList.contains('cmpx-cta');
      if (gs) { e.preventDefault(); e.stopPropagation(); setOpen(true); }
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
        <div className="ddrm-title">How do you want to use Done Deal?</div>
        <div className="ddrm-sub">Tell us who you are and we'll take you to the right place. 🤝</div>
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

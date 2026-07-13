import React, { useEffect, useRef, useState } from 'react';
import useNav from '../hooks/useNav';

const NAV_LINKS = [
  { key: 'investors', label: 'For investors', href: '/investors' },
  { key: 'mandates', label: 'Mandates', href: '/mandates' },
  { key: 'faq', label: 'FAQ', href: '/faq' },
  { key: 'blog', label: 'Blog', href: '/blog' },
  { key: 'about', label: 'About Us', href: '/about' },
];

const brandLogoClass = 'brand-logo h-[26px] w-auto [body.is-light_&]:invert';
const linkClass =
  'whitespace-nowrap text-[14.5px] tracking-[-0.01em] text-[var(--bone-dim)] no-underline transition-colors duration-200 hover:text-[var(--bone)] [body.is-light_&]:text-[rgba(19,17,25,0.62)] [body.is-light_&]:hover:text-[#131119]';
const ctaClass =
  'nav-cta inline-flex items-center justify-center whitespace-nowrap rounded-[11px] px-5 py-[11px] text-[14.5px] font-semibold text-white no-underline shadow-[0_0_0_1px_rgba(255,255,255,.12),inset_0_1px_0_rgba(255,255,255,.22),0_8px_28px_rgba(92,111,255,.38)] transition-[filter,box-shadow,transform] duration-200 [background:radial-gradient(120%_160%_at_50%_-40%,rgba(166,174,255,.50),transparent_60%),linear-gradient(180deg,#6577FF_0%,#4B5CE8_100%)] hover:brightness-110 active:scale-[.98]';

export default function Nav({ current }) {
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useNav();

  useEffect(() => {
    document.body.classList.toggle('dd-nav-open', mobileOpen);
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.classList.remove('dd-nav-open');
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className="topnav !fixed !inset-x-0 !top-0 !z-50 !flex !items-center !justify-between !border-b !border-transparent !px-[var(--gutter)] !py-[18px] !transition-[background,backdrop-filter,border-color,transform] !duration-300"
        id="topnav"
        ref={headerRef}
      >
        <a className="inline-flex items-center no-underline" href="/" aria-label="Done Deal home">
          <img className={brandLogoClass} src="/assets/done-deal-icon.svg" alt="done.deals" />
        </a>

        <nav className="nav-links hidden items-center gap-[34px] min-[801px]:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              className={`${linkClass}${current === link.key ? ' !text-[var(--purple)]' : ''}`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className={`${ctaClass} hidden min-[801px]:inline-flex`} href="https://www.done.deals/get-started">
          Get started
        </a>

        <button
          className="dd-burger -mr-[9px] inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0 min-[801px]:hidden"
          id="ddBurger"
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="ddMobNav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className={`block h-0.5 w-6 rounded-sm bg-[var(--bone)] transition-transform duration-300 [body.is-light_&]:bg-[#131119]${mobileOpen ? ' translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-sm bg-[var(--bone)] transition-opacity duration-200 [body.is-light_&]:bg-[#131119]${mobileOpen ? ' opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-sm bg-[var(--bone)] transition-transform duration-300 [body.is-light_&]:bg-[#131119]${mobileOpen ? ' -translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      <nav
        className={`dd-mobnav fixed inset-0 z-[9998] flex flex-col bg-[rgba(8,8,12,0.97)] px-7 pb-10 pt-[104px] backdrop-blur-[22px] transition-[opacity,visibility,transform] duration-300 min-[801px]:hidden ${
          mobileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }${mobileOpen ? ' is-open' : ''}`}
        id="ddMobNav"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-x-0 top-0 flex h-[72px] items-center justify-between px-5">
          <a className="inline-flex items-center" href="/" onClick={closeMobile} aria-label="Done Deal home">
            <img className={brandLogoClass} src="/assets/done-deal-icon.svg" alt="done.deals" />
          </a>
          <button
            className="dd-mn-close -mr-[9px] inline-flex h-11 w-11 items-center justify-center border-0 bg-transparent p-0 text-[var(--bone)]"
            id="ddNavClose"
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {NAV_LINKS.map((link) => (
          <a
            key={link.key}
            className={`dd-mn-link border-b border-white/10 py-[18px] text-[30px] font-medium leading-tight tracking-[-0.02em] text-[var(--bone)] no-underline active:text-[var(--purple-soft)]${current === link.key ? ' !text-[var(--purple-soft)]' : ''}`}
            href={link.href}
            onClick={closeMobile}
          >
            {link.label}
          </a>
        ))}

        <a className={`${ctaClass} dd-mn-cta mt-auto !w-full !py-[17px] !text-[17px]`} href="https://www.done.deals/get-started" onClick={closeMobile}>
          Get started
        </a>
      </nav>
    </>
  );
}

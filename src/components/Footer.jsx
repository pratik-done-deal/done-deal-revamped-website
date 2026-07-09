import React from 'react';

const FOOTER_LINKS = [
  {
    title: 'Done Deal',
    links: [{ label: 'Contact us', href: '/contact' },  { label: 'About us', href: '/about' }],
  },
  {
    title: 'Product',
    links: [
      { label: 'For investors', href: '/investors' },
      { label: 'Mandates', href: '/mandates' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Investor Terms', href: '/legal#investor' },
      { label: 'Company Terms', href: '/legal#company' },
      { label: 'Privacy Policy', href: '/legal#privacy' },
    ],
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/donedeals/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v13H.2V8zm7.2 0h4.4v1.78h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7v6.6h-4.6v-5.85c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H7.4V8z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/donedeal.club/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@DoneDealClub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 8.5l6 3.5-6 3.5v-7z" />
      </svg>
    ),
  },
];

export default function Footer({ theme = 'dark' }) {
  const light = theme === 'light';
  const footerClass = light
    ? 'footer footer-light !mt-0 !border-t !border-[var(--line-ink)] !bg-[var(--paper)] !py-14 md:!pb-[50px] md:!pt-20'
    : 'footer !mt-5 !border-t !border-[var(--line)] !bg-[var(--ink-1)] !py-14 md:!pb-[50px] md:!pt-20';
  const logoClass = `brand-logo h-[30px] w-auto${light ? ' invert' : ' [body.is-light_&]:invert'}`;
  const bodyTextClass = light
    ? 'max-w-[300px] text-[15px] leading-relaxed text-[var(--ink-text-dim)]'
    : 'max-w-[300px] text-[15px] leading-relaxed text-[var(--bone-dim)]';
  const headingClass = light
    ? 'mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(19,17,25,0.42)]'
    : 'mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bone-faint)]';
  const linkClass = light
    ? 'mb-[13px] block text-[15px] text-[var(--ink-text-dim)] no-underline transition-colors duration-200 hover:text-[var(--ink-text)]'
    : 'mb-[13px] block text-[15px] text-[var(--bone-dim)] no-underline transition-colors duration-200 hover:text-[var(--bone)]';
  const copyrightClass = light
    ? 'text-[13.5px] text-[rgba(19,17,25,0.38)]'
    : 'text-[13.5px] text-[var(--bone-faint)]';
  const socialClass = light
    ? 'text-[var(--ink-text-dim)] transition-colors duration-200 hover:text-[var(--ink-text)]'
    : 'text-[var(--bone-dim)] transition-colors duration-200 hover:text-[var(--bone)]';

  return (
    <footer className={footerClass} data-screen-label="Footer">
      <div className="relative z-[1] mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        <div className={`footer-grid grid grid-cols-2 items-start gap-x-6 gap-y-8 border-b pb-10 pt-2 md:grid-cols-[1fr_auto_auto_auto_auto] md:gap-x-[52px] md:gap-y-10 md:pb-[60px]${light ? ' border-[var(--line-ink)]' : ' border-[var(--line)]'}`}>
          <div className="footer-brand-block col-span-2 md:col-span-1">
            <a className="mb-5 inline-flex items-center no-underline" href="DoneDeal-Homepage.html" aria-label="Done Deal home">
              <img className={logoClass} src="/assets/done-deal-icon.svg" alt="done.deals" />
            </a>
            <p className={bodyTextClass}>
              An investment bank, backed by AI. The fastest, most trusted way for founders to raise capital or get acquired.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h5 className={headingClass}>
                {group.title}
              </h5>
              {group.links.map((link) => (
                <a
                  key={link.href}
                  className={linkClass}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-[30px] md:flex-row md:items-center">
          <span className={copyrightClass}>
            ©2026 Done Deal · Securities services provided through registered affiliates.
          </span>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className={socialClass}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

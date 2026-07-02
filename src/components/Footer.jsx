import React from 'react';

const FOOTER_LINKS = [
  {
    title: 'Done Deal',
    links: [{ label: 'Contact us', href: 'DoneDeal-Contact.html' }],
  },
  {
    title: 'Product',
    links: [
      { label: 'For investors', href: 'DoneDeal-Investors.html' },
      { label: 'Mandates', href: 'DoneDeal-Mandates.html' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: 'DoneDeal-Blog.html' },
      { label: 'FAQ', href: 'DoneDeal-FAQ.html' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Investor Terms', href: 'DoneDeal-Legal.html#investor' },
      { label: 'Company Terms', href: 'DoneDeal-Legal.html#company' },
      { label: 'Privacy Policy', href: 'DoneDeal-Legal.html#privacy' },
    ],
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v13H.2V8zm7.2 0h4.4v1.78h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7v6.6h-4.6v-5.85c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H7.4V8z" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 1.5h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.8L0 1.5h7.6l5.2 6.9 6.1-6.9zm-1.3 19.5h2L6.5 3.4H4.4l13.2 17.6z" />
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
        <div className={`grid grid-cols-2 items-start gap-x-6 gap-y-8 border-b pb-10 pt-2 md:grid-cols-[1fr_auto_auto_auto_auto] md:gap-x-[52px] md:gap-y-10 md:pb-[60px]${light ? ' border-[var(--line-ink)]' : ' border-[var(--line)]'}`}>
          <div className="col-span-2 md:col-span-1">
            <a className="mb-5 inline-flex items-center no-underline" href="DoneDeal-Homepage.html" aria-label="Done Deal home">
              <img className={logoClass} src="/assets/06a40a90a90f.svg" alt="done.deals" />
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
              <a key={link.label} className={socialClass} href="#" aria-label={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

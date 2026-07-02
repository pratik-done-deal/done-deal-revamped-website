import React from 'react';

const COPY = {
  default: {
    label: 'Get started',
    micro: 'Know your number before anyone else does.',
  },
  light: {
    label: 'Start confidentially',
    micro: 'Stealth profile first - your name stays yours.',
  },
};

const ctaClass =
  'inline-flex items-center justify-center rounded-[13px] px-6 py-3 text-[15px] font-semibold text-white no-underline shadow-[0_0_0_1px_rgba(255,255,255,.12),inset_0_1px_0_rgba(255,255,255,.22),0_8px_28px_rgba(92,111,255,.38)] transition-[filter,box-shadow,transform] duration-200 [background:radial-gradient(120%_160%_at_50%_-40%,rgba(166,174,255,.50),transparent_60%),linear-gradient(180deg,#6577FF_0%,#4B5CE8_100%)] hover:brightness-110 active:scale-[.98]';

// The homepage ships two CTA bands: the visible dark one after Investors,
// and a light variant (hidden by default) inside the lightwell band.
export default function CtaBand({ variant = 'default', hidden = false }) {
  const light = variant === 'light';
  const copy = COPY[variant] || COPY.default;

  return (
    <section
      className={`flex flex-wrap items-center justify-center gap-x-[22px] gap-y-3 px-[var(--gutter)] pb-10 pt-2 text-center${light ? ' on-light !bg-[var(--paper)] !pb-[52px] !pt-0' : ''}`}
      data-screen-label="CTA"
      style={hidden ? { display: 'none' } : undefined}
    >
      <a className={ctaClass} href="#">
        {copy.label}
      </a>
      <span className={`text-[13.5px] tracking-[0.01em]${light ? ' text-[var(--ink-text-dim)]' : ' text-[var(--bone-faint)]'}`}>
        {copy.micro}
      </span>
    </section>
  );
}

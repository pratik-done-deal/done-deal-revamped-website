import React from 'react';

const DEALS = [
  { nm: 'ORBO AI × Niyogin', mt: 'SaaS / AI · 14w' },
  // { nm: 'Trase × Upscalio', mt: 'D2C · 9w' },
  // { nm: 'Zymrat × Stylcheck', mt: 'Consumer · 12w' },
  { nm: 'WLDD × ScoopWhoop', mt: 'Media · 11w' },
  { nm: 'Heritage × Get-A-Way', mt: 'Foods · 8w' },
  { nm: 'WLDD × 7-10', mt: 'D2C · 8w' },
  { nm: 'Sekkei Bio × Tenshi', mt: 'Biotech · 8w' },
  { nm: 'Ritualistic × Deep Bajaj', mt: 'Decor · 8w' },
  { nm: 'MetaShot × Sharrp Ventures ', mt: 'Gaming · 8w' },
  // { nm: 'The Soap Co.', mt: 'D2C · 6w' },
  { nm: 'Terribly Tiny Tales × CAN', mt: 'Media · 6w' },
  { nm: 'Styched × Flatheads', mt: 'D2C · 6w' },
  { nm: '₹150 Cr+ BPC Deal', mt: 'BPC · 6w' },
  // { nm: 'Ledgerly', mt: 'Fintech · 5w' },
];

function DealTick({ nm, mt }) {
  return (
    <span className="inline-flex items-center gap-3.5 px-[30px]">
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--bone)]">{nm}</span>
      <span className="text-[var(--purple)]">·</span>
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--bone-faint)]">{mt}</span>
    </span>
  );
}

export default function DealStrip() {
  return (
    <section
      className="strip overflow-hidden border-y border-[var(--line)] bg-[var(--ink-1)] p-0"
      data-screen-label="Live deals"
    >
      <div className="strip-inner flex items-stretch max-[800px]:flex-col">
        <div className="strip-pill flex h-16 flex-none items-center gap-2.5 border-r border-[var(--line)] bg-[var(--ink-2)] px-[26px] max-[800px]:h-auto max-[800px]:w-full max-[800px]:justify-center max-[800px]:border-b max-[800px]:border-r-0 max-[800px]:py-3">
          <span className="live-dot" />
          <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bone)]">
            30 done deals · live
          </span>
        </div>
        <div
          className="marquee relative flex flex-1 items-center overflow-hidden max-[800px]:w-full max-[800px]:py-[22px]"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)',
          }}
        >
          <div className="marquee-track flex items-center gap-0 whitespace-nowrap [animation:marquee_42s_linear_infinite] [.strip:hover_&]:[animation-play-state:paused] motion-reduce:animate-none">
            {DEALS.map((deal) => (
              <DealTick key={deal.nm} {...deal} />
            ))}
            {DEALS.map((deal) => (
              <DealTick key={`${deal.nm}-dup`} {...deal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

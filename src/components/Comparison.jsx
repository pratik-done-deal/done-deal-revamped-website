import React from 'react';

const COMPARISON_CARDS = [
  {
    name: 'Legacy bank',
    className: 'cmpx-card cmpx-alt',
    sub: "The outcome — slowly, expensively, and only if you're big enough.",
    items: [
      { status: 'mid', label: 'Bank-grade outcome', detail: '— if they take you on' },
      { status: 'no', label: '6–9 months', detail: 'to close' },
      { status: 'no', label: 'Retainer + minimums', detail: 'opaque fees' },
      { status: 'no', label: 'Relationship-bound', detail: 'buyer reach' },
      { status: 'mid', label: 'Banker runs it', detail: '— at their pace' },
      { status: 'no', label: 'Under ₹200 Cr', detail: 'often ignored' },
    ],
  },
  {
    name: 'DIY / marketplace',
    className: 'cmpx-card cmpx-alt',
    sub: 'Cheap and lonely — you do the work, you carry the risk.',
    items: [
      { status: 'no', label: 'Variable outcome', detail: 'unguided' },
      { status: 'no', label: 'Unpredictable', detail: 'timelines' },
      { status: 'mid', label: 'Low fee', detail: 'high effort' },
      { status: 'no', label: 'Self-serve listings', detail: 'only' },
      { status: 'no', label: 'You run everything', detail: 'yourself' },
      { status: 'mid', label: 'Any size', detail: '— but unsupported' },
    ],
  },
];

const DONE_DEAL_ITEMS = [
  { label: 'Bank-grade, banker-led', detail: 'outcome' },
  { label: '14 weeks', detail: 'median to close' },
  { label: 'Success fee only', detail: '— no retainer, ever' },
  { label: '10,427 verified buyers', detail: 'AI-ranked' },
  { label: 'Your banker runs it', detail: '— you approve' },
  { label: 'Built for ₹12–200 Cr', detail: 'deals' },
];

function ComparisonList({ items, defaultStatus = 'yes' }) {
  return (
    <ul className="cmpx-list">
      {items.map((item) => (
        <li key={`${item.label}-${item.detail}`}>
          <i className={`ck ${item.status || defaultStatus}`} aria-hidden="true" />
          <span>
            <b>{item.label}</b> {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Comparison() {
  return (
    <section className="section-pad framed combined-mh on-light" id="comparison" data-screen-label="Machine & comparison">
      <div className="amb">
        <div className="bigicon drift" data-speed="0.06" style={{ width: 440, height: 440, right: -70, top: 30 }}>
          <svg viewBox="0 0 24 24">
            <use href="#ic-cpu" />
          </svg>
        </div>
        <div className="halfcircle drift" data-speed="0.11" style={{ width: 380, height: 380, left: -170, bottom: -150 }} />
        <div className="halfcircle warm drift" data-speed="0.08" style={{ width: 340, height: 340, right: -130, bottom: -120 }} />
      </div>

      <div className="wrap">
        <div className="eyebrow-row reveal">
          <span className="num">04</span>
          <span className="kicker">The honest comparison</span>
          <span className="ln" />
        </div>

        <h2 className="h-sec reveal" style={{ maxWidth: 1000 }}>
          One choice beats every alternative — bank outcomes, AI speed, and <span className="accent-copper">fair economics.</span>
        </h2>

        <div className="cmpx reveal">
          <div className={COMPARISON_CARDS[0].className}>
            <div className="cmpx-name">{COMPARISON_CARDS[0].name}</div>
            <p className="cmpx-sub">{COMPARISON_CARDS[0].sub}</p>
            <ComparisonList items={COMPARISON_CARDS[0].items} />
          </div>

          <div className="cmpx-card cmpx-us">
            <span className="cmpx-badge">Why this wins</span>
            <div className="cmpx-brand">
              <span className="brand-mark">d</span>
              Done Deal
            </div>
            <p className="cmpx-sub">Bank outcomes, AI speed, fair economics — the only option with all three.</p>
            <ComparisonList items={DONE_DEAL_ITEMS} />
            <a className="btn btn-primary cmpx-cta" href="#">
              Get started
            </a>
          </div>

          <div className={COMPARISON_CARDS[1].className}>
            <div className="cmpx-name">{COMPARISON_CARDS[1].name}</div>
            <p className="cmpx-sub">{COMPARISON_CARDS[1].sub}</p>
            <ComparisonList items={COMPARISON_CARDS[1].items} />
          </div>
        </div>
      </div>
    </section>
  );
}

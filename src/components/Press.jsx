import React from 'react';

const PRESS_ITEMS = [
  {
    source: 'Startup Story Media',
    initials: 'SS',
    logoStyle: { background: 'linear-gradient(135deg,#7C8AFF,#5C6FFF)' },
    title: "Swipe, Match, Acquire: How Done Deal is Building a Tinder for Startup M&As",
    time: '4 Minutes Read',
    link: "https://startupstorymedia.com/insights-data-driven-platform-done-deal-secures-800000-in-pre-seed-funding/"
  },
  {
    source: 'Outlook',
    initials: 'O',
    logoStyle: { background: '#E11D48' },
    title: "Done Deal Secures $800,000 in Pre-Seed Funding Round",
    time: '2 Minutes Read',
    link: "https://startup.outlookindia.com/sector/saas/done-deal-secures-800-000-in-pre-seed-funding-round-news-9675"
  },
  {
    source: 'Youtube',
    initials: 'YT',
    logoStyle: { background: '#E11D48' },
    title: "A Marketplace Where You Can Buy or Sell Your Startups? Done Deal ✅ | FULL EPISODE",
    time: '1 Hour long',
    link: "https://www.youtube.com/watch?v=STV4s8_QqVw"
  }
];

export default function Press() {
  return (
    <section className="section-pad framed" id="press" data-screen-label="News">
      <div className="wrap">
        <div className="eyebrow-row reveal">
          <span className="num">08</span>
          <span className="kicker">Press</span>
          <span className="ln" />
        </div>

        <h2 className="h-sec reveal">
          We're in the <span className="accent-i">news.</span>
        </h2>

        <div className="press-list reveal">
          {PRESS_ITEMS.map((item) => (
            <a
              className="press-row"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.title}
            >
              <span className="pr-src">
                <span className="news-logo" style={item.logoStyle}>
                  {item.initials}
                </span>
                {item.source}
              </span>
              <span className="pr-title">{item.title}</span>
              <span className="pr-date">{item.time}</span>
              <span className="pr-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

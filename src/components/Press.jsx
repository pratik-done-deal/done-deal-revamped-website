import React from 'react';

const PRESS_ITEMS = [
  {
    source: 'Startup Story Media',
    initials: 'SS',
    logoStyle: { background: 'linear-gradient(135deg,#7C8AFF,#5C6FFF)' },
    title: "How Done Deal is rebuilding M&A for India's founders",
    date: 'Mar 2026',
  },
  {
    source: 'Outlook',
    initials: 'O',
    logoStyle: { background: '#E11D48' },
    title: 'The AI-native investment bank taking on legacy advisory',
    date: 'Feb 2026',
  },
  {
    source: 'The Economic Times',
    initials: 'ET',
    logoStyle: { background: '#2563EB' },
    title: 'Done Deal closes 30+ founder exits in two years',
    date: 'Jan 2026',
  },
  {
    source: 'Inc42',
    initials: 'i',
    logoStyle: { background: '#EA580C' },
    title: 'The startup running M&A on autopilot — with a banker in the loop',
    date: 'Nov 2025',
  },
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
            <a className="press-row" href="#" key={item.title}>
              <span className="pr-src">
                <span className="news-logo" style={item.logoStyle}>
                  {item.initials}
                </span>
                {item.source}
              </span>
              <span className="pr-title">{item.title}</span>
              <span className="pr-date">{item.date}</span>
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

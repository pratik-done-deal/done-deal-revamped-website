import React from 'react';

const DEALS = [
  {
    tag: 'Media · Acquisition',
    name: 'WLDD × ScoopWhoop',
    desc: 'Studio meets India’s biggest content engine.',
    image: '/assets/wldd-scoop.png',
    slug: 'wldd-x-scoopwhoop',
  },
  {
    tag: 'Consumer · Acquisition',
    name: 'Heritage × Get-A-Way',
    desc: 'Dessert brand meets India’s leading dairy company.',
    image: '/assets/heritage-get-a-way.png',
    slug: 'heritage-foods-x-get-a-way',
  },
  {
    tag: 'D2C · Exit',
    name: 'The Soap Co.',
    desc: 'A soap brand that 6×’d valuation in 18 months.',
    image: '/assets/the-soap-co.png',
    slug: "150-cr-commitment-bpc-brand"
  },
  {
    tag: 'Fintech · Acquisition',
    name: 'Niyogin x ORBO',
    desc: 'An Al powered solution for BFSI sector meets a listed Fintech. A done deal.',
    image: '/assets/niyogen-orbo.jpeg',
    slug: 'superscan-orbo-x-niyogin'
  },
  {
    tag: 'Healthcare · Funding',
    name: 'Sekkei × Tenshi Pharma & Ashish Kacholia Family office',
    desc: 'A platform-driven biologics discovery engine raises their Series A round with strong strategics to fuel their growth. A Done Deal',
    image: '/assets/sekkei.jpeg',
    slug: 'sekkei-bio-series-a',
  },
  {
    tag: 'Media · Acquisition',
    name: 'Collective Artists Network × Terribly Tiny Tales',
    desc: 'Short form story telling platform meets india largest creator platform. A Done Deal',
    image: '/assets/collective-tiny-tales.jpeg',
    slug: 'ttt-x-collective-artists-network'
  },
];

export default function DealsClosed() {
  const firstDeal = DEALS[0];

  return (
    <section className="section-pad framed" id="deals" data-screen-label="Deals closed">
      <div className="amb">
        <div className="glow warm" style={{ width: 480, height: 400, left: '4%', top: '6%', opacity: 0.2 }} />
        <div className="halfcircle drift" data-speed="0.2" style={{ width: 260, height: 260, right: -100, top: '18%' }} />
        <div className="bigicon drift" data-speed="0.07" style={{ width: 400, height: 400, left: -80, bottom: -60 }}>
          <svg viewBox="0 0 24 24">
            <use href="#ic-flag" />
          </svg>
        </div>
      </div>

      <div className="wrap">
        <div className="eyebrow-row reveal">
          <span className="num">03</span>
          <span className="kicker">Selected deals</span>
          <span className="ln" />
        </div>

        <div className="deals-head2 reveal">
          <h2 className="h-sec">
            Outcomes, not <span className="accent-i">promises.</span>
          </h2>
          <div className="sqz-nav">
            <button type="button" className="tnav" id="acc-prev" aria-label="Previous deal">
              ←
            </button>
            <button type="button" className="tnav" id="acc-next" aria-label="Next deal">
              →
            </button>
          </div>
        </div>

        <div className="acc reveal" id="acc">
          {DEALS.map((deal, index) => (
            <button
              type="button"
              className={`acc-panel${index === 0 ? ' on' : ''}`}
              data-i={index}
              data-tag={deal.tag}
              data-name={deal.name}
              data-desc={deal.desc}
              data-slug={deal.slug || ''}
              aria-label={deal.name}
              key={deal.name}
            >
              <img src={deal.image} alt={`${deal.name} — deal announcement`} draggable="false" />
              <span className="acc-vname">{deal.name}</span>
            </button>
          ))}
        </div>

        <div className="acc-cap reveal">
          <p id="acc-cap-text">
            <b>{firstDeal.name}.</b> {firstDeal.desc}
          </p>
          <a
            className="link"
            href={firstDeal.slug ? `/blog/${firstDeal.slug}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            id="acc-cap-link"
            style={{ visibility: firstDeal.slug ? 'visible' : 'hidden' }}
          >
            Read the story <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

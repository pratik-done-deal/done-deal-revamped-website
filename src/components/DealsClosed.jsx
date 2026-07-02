import React from 'react';

const DEALS = [
  {
    tag: 'Media · Acquisition',
    name: 'WLDD × ScoopWhoop',
    desc: 'Studio meets India’s biggest content engine.',
    image: '/assets/8f781d3e4ec2.png',
  },
  {
    tag: 'Consumer · Acquisition',
    name: 'Heritage × Get-A-Way',
    desc: 'Dessert brand meets India’s leading dairy company.',
    image: '/assets/9eebf2194260.png',
  },
  {
    tag: 'D2C · Exit',
    name: 'The Soap Co.',
    desc: 'A soap brand that 6×’d valuation in 18 months.',
    image: '/assets/9d35981c3de9.png',
  },
  {
    tag: 'SaaS / AI · Acquisition',
    name: 'ORBO × Niyogin',
    desc: 'Computer vision meets embedded finance.',
    image: '/assets/8f781d3e4ec2.png',
  },
  {
    tag: 'D2C · Acquisition',
    name: 'Trase × Upscalio',
    desc: 'A sneaker brand finds its house of brands.',
    image: '/assets/9eebf2194260.png',
  },
  {
    tag: 'Consumer · Exit',
    name: 'Zymrat × Stylcheck',
    desc: 'Performance wear, acquired in 12 weeks.',
    image: '/assets/9d35981c3de9.png',
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
          <a className="link" href="#" id="acc-cap-link">
            Read the story <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

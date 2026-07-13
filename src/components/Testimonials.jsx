import React from 'react';
import { cdnUrl } from '../config/cdn';

const imgTestimonialAjith = cdnUrl('testimonial-ajith.svg');
const imgTestimonialArihant = cdnUrl('testimonial-arihant.svg');

const TESTIMONIALS = [
  // {
  //   name: 'Anuj Verma',
  //   role: 'Founder, TTT',
  //   attribution: 'Founder & CEO, TTT — acquired by Collective Artists Network',
  //   portraitSrc: 'assets/ph-portrait.png',
  //   quotePre: "I'd braced for a year of pain. Instead I had a banker who knew my market, a model that knew my number, and ",
  //   quoteEm: 'four offers in eleven weeks.',
  //   quotePost: ' It felt less like selling software and more like having a partner.',
  // },
  // {
  //   name: 'Priya Nair',
  //   role: 'Co-founder, Loophealth',
  //   attribution: 'Co-founder, Loophealth — acquired by a US healthcare group',
  //   portraitSrc: 'assets/ph-head-3.png',
  //   quotePre: 'Three banks told me my category was "too early." Done Deal found ',
  //   quoteEm: 'nineteen strategic buyers',
  //   quotePost: ' who disagreed — and ran a process so tight I never lost a week to chasing paperwork.',
  // },
  // {
  //   name: 'Marcus Hale',
  //   role: 'CEO, Fernweh Labs',
  //   attribution: 'CEO, Fernweh Labs — acquired by a European platform',
  //   portraitSrc: 'assets/ph-head-5.png',
  //   quotePre: 'The valuation model was the unlock. I walked into every conversation knowing my floor, my ceiling, and exactly which buyer would pay it. We ',
  //   quoteEm: 'closed 23% above my own estimate.',
  //   quotePost: '',
  // },
  {
    name: 'Ajith',
    role: 'Co-Founder, Forthcode',
    attribution: 'Co-Founder, Forthcode',
    portraitSrc: imgTestimonialAjith,
    quotePre: 'We partnered with DoneDeal to support our fundraising efforts, and the experience was exceptional. Done Deal was instrumental in connecting us with high-quality leads and key decision-makers across ',
    quoteEm: '7 different investment firms',
    quotePost: ", all of whom were genuinely relevant to our sector. The level of access and professionalism they provided was top-tier. They don't just facilitate introductions; they facilitate meaningful conversations. I highly recommend DoneDeal to any founder looking for a structured and efficient fundraising support system.",
  },
  {
    name: 'Arihant Jain',
    role: 'Founder, WLDD',
    attribution: 'Founder, WLDD',
    portraitSrc: imgTestimonialArihant,
    quotePre: 'ScoopWhoop was always an asset we were keen on acquiring. ',
    quoteEm: "We'd tried reaching out multiple times on our own, but could never get through.",
    quotePost: " That's when we turned to Done Deal - having successfully acquired two companies through them before, we already had a high level of trust and comfort in their process. Done Deal was instrumental in finally making the ScoopWhoop acquisition happen.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial framed on-light" id="testimonials" data-screen-label="Testimonial">
      <div className="amb">
        <div className="glow p" style={{ width: '520px', height: '420px', left: '8%', top: '10%', opacity: 0.22 }} />
        <div className="glow warm" style={{ width: '440px', height: '380px', right: '4%', bottom: 0, opacity: 0.34 }} />
      </div>
      <div className="wrap">
        <div className="testi-carousel reveal" id="testi-carousel">
          <div className="testi-ctrl">
            <div className="testi-dots" id="testi-dots">
              {TESTIMONIALS.map((t, i) => (
                <button key={t.name} type="button" className="td" data-i={i} aria-label={`Testimonial ${i + 1}`}>
                  <i></i>
                </button>
              ))}
            </div>
            <div className="testi-nav">
              <button type="button" className="tnav" id="testi-prev" aria-label="Previous">←</button>
              <button type="button" className="tnav" id="testi-next" aria-label="Next">→</button>
            </div>
          </div>
          <div className="testi-viewport">
            <div className="testi-track" id="testi-track">
              {TESTIMONIALS.map((t, i) => (
                <div className="testi-slide" key={t.name}>
                  <div className="testi-grid">
                    <div className="testi-portrait">
                      <image-slot
                        id={`testi-${i + 1}`}
                        shape="rect"
                        fit="cover"
                        src={t.portraitSrc}
                        placeholder="Drop the founder's photo"
                      ></image-slot>
                      <div className="tp-scrim" />
                      {/* <div className="tp-cap">
                        <b>{t.name}</b>
                        <span>{t.role}</span>
                      </div> */}
                    </div>
                    <div className="testi-body">
                      <span className="testi-mark">"</span>
                      <p className="quote">
                        {t.quotePre}
                        <em>{t.quoteEm}</em>
                        {t.quotePost}
                      </p>
                      <div className="testi-attrib">
                        <b>{t.name}</b>
                        <span>{t.attribution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

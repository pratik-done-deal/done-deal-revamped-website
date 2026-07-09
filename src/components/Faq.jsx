import React from 'react';
import { FAQS } from '../data/faqs';

const DISPLAY_FAQS = ['general', 'founder', 'buyer'].flatMap((cat) =>
  FAQS.filter((faq) => faq.cat === cat).slice(0, 2)
);

export default function Faq() {
  return (
    <section className="section-pad framed" id="faq" data-screen-label="FAQ">
      <div className="amb">
        <div className="bigicon drift" data-speed="0.05" style={{ width: 400, height: 400, left: -60, top: 40 }}>
          <svg viewBox="0 0 24 24">
            <use href="#ic-spark" />
          </svg>
        </div>
        <div className="halfcircle drift" data-speed="0.12" style={{ width: 360, height: 360, right: -160, bottom: -140 }} />
      </div>

      <div className="wrap">
        <div className="eyebrow-row reveal">
          <span className="num">06</span>
          <span className="kicker">Questions</span>
          <span className="ln" />
        </div>

        <h2 className="h-sec reveal">
          Everything you need to <span className="accent-i">know.</span>
        </h2>

        <div className="faq-list">
          {DISPLAY_FAQS.map((faq) => (
            <div className="faq-item reveal" key={faq.id}>
              <button className="faq-q" type="button">
                {faq.q}
                <span className="pm" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  {faq.a.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

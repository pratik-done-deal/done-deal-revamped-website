import React from 'react';

const FAQS = [
  {
    question: 'What does it cost — I mean ALL the charges?',
    answer:
      "A tiered success fee of 3–5%, agreed before you sign, and nothing else. No retainer, no monthly fee, no hidden line items. If we don't close, you don't pay.",
  },
  {
    question: "Will my competitors or team find out I'm exploring a sale?",
    answer:
      'Not unless you decide they should. Buyers see an anonymous, range-only profile. No introduction happens, and your identity is never revealed, without your explicit approval on each name.',
  },
  {
    question: 'How is this different from a traditional investment bank?',
    answer:
      'Same calibre of banker and outcome — without the retainer, the year-long timeline, or the minimum deal size. AI does the heavy lifting on valuation, materials and buyer mapping, so your banker spends their time where judgement matters.',
  },
  {
    question: 'Is the AI just drafting things with ChatGPT?',
    answer:
      'No. Our models are trained on real transaction data and run against a verified buyer network. Everything AI produces — the IM, the teaser, the buyer list — is reviewed and rewritten by a senior banker before it leaves the building.',
  },
  {
    question: 'What size of deal do you work on?',
    answer:
      "We specialise in ₹12–200 Cr transactions — raises and exits — the band most legacy banks ignore and most marketplaces can't serve well.",
  },
];

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
          {FAQS.map((faq) => (
            <div className="faq-item reveal" key={faq.question}>
              <button className="faq-q" type="button">
                {faq.question}
                <span className="pm" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

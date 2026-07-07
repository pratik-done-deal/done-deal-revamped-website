import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import { FAQS } from '../data/faqs.jsx';
import '../styles/faq.css';

const FILTERS = [
  { key: 'all',     label: 'All questions' },
  { key: 'general', label: 'General' },
  { key: 'founder', label: 'For founders' },
  { key: 'buyer',   label: 'For buyers' },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`ddfaq-item${isOpen ? ' open' : ''}`}>
      <button className="ddfaq-q" type="button" onClick={onToggle}>
        <span className={`ddfaq-tag ${faq.cat}`}>
          {faq.cat === 'founder' ? 'Founder' : faq.cat === 'buyer' ? 'Buyer' : 'General'}
        </span>
        <span className="q-text">{faq.q}</span>
        <span className="ddfaq-plus" aria-hidden="true" />
      </button>
      <div className="ddfaq-a">
        <div className="ddfaq-a-inner">
          <div className="ddfaq-a-pad">
            {faq.a.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  useReveal();
  useParallax();
  useLightwell();

  const [filter, setFilter] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visible = filter === 'all' ? FAQS : FAQS.filter((f) => f.cat === filter);

  return (
    <>
      <Nav current="faq" />
      <main id="top">

        {/* ── FAQ hero ───────────────────────────────────────────── */}
        <section className="section-pad faq-top">
          <div className="amb">
            <div
              className="glow p absolute"
              style={{ width: 560, height: 440, left: '50%', top: '-18%', transform: 'translateX(-50%)', opacity: 0.4 }}
            />
            <div
              className="glow warm absolute"
              style={{ width: 300, height: 280, left: '3%', top: '18%', opacity: 0.34 }}
            />
            <div className="ring drift absolute" data-speed="0.10" style={{ width: 260, height: 260, right: '5%', top: '10%' }} />
            <div
              className="float-ic gold drift absolute"
              data-speed="0.2"
              style={{ width: 62, height: 62, right: '11%', bottom: '10%' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>

          <div className="wrap">
            <div className="m-hero-text reveal" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              <div className="kicker" style={{ justifyContent: 'center' }}>
                <span className="live-dot" />
                Help center&nbsp;&nbsp;<span style={{ color: 'var(--bone-faint)' }}>·</span>&nbsp;&nbsp;Founders &amp; buyers
              </div>
              <h1
                className="h-display"
                style={{ fontSize: 'clamp(36px,4.6vw,56px)', marginTop: 16 }}
              >
                Frequently asked <span className="accent-i">questions.</span>
              </h1>
              <p className="lede" style={{ margin: '18px auto 0', maxWidth: 600 }}>
                Everything you need to know about getting acquired, raising capital, and how Done Deal works — for founders and buyers alike.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ list ──────────────────────────────────────────── */}
        <section className="section-pad" id="faq" style={{ paddingTop: 'clamp(20px,3vh,40px)' }}>
          <div className="amb">
            <div
              className="glow p absolute"
              style={{ width: 420, height: 380, right: '-8%', top: '6%', opacity: 0.3 }}
            />
            <div
              className="glow warm absolute"
              style={{ width: 300, height: 280, left: '-6%', bottom: '8%', opacity: 0.3 }}
            />
          </div>

          <div className="wrap">
            <div className="ddfaq-wrap">

              {/* Filter chips */}
              <div
                className="mand-filters reveal"
                style={{ justifyContent: 'center', margin: '0 0 8px' }}
                role="tablist"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    className={`fchip${filter === f.key ? ' on' : ''}`}
                    role="tab"
                    aria-selected={filter === f.key}
                    onClick={() => {
                      setFilter(f.key);
                      setOpenItems(new Set());
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* FAQ items */}
              <div className="ddfaq-list">
                {visible.map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
                {visible.length === 0 && (
                  <div className="ddfaq-empty">No questions in this category yet.</div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

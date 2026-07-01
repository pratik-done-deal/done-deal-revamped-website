import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/faq.css';

const FAQS = [
  {
    id: 0, cat: 'founder',
    q: 'What is Done Deal?',
    a: [
      'Done Deal is a full-suite operating system to help start-ups succeed. This has been built ground up by founders who understand what a start-up needs to succeed and we want to provide you the best quality service in an easy, transparent manner.',
      'Our first offering was to help companies get acquired by letting them list anonymously on the platform and get bids to unlock their maximum value. Selling your start-up is a BIG decision. We understand there might never be the perfect time, but the right partner might be out there right now looking for a company just like yours.',
      "In our experience, fundraising works best when you don't need it, and it's the same with acquisitions. Exploring fundraising or getting acquired takes time and effort for a founder, and we don't want to let this distract you from your core focus — running your start-up. Our platform will make your fund raise or acquisition easy, fast and hassle free.",
      'We are constantly working to add more features to enable start-up success, including enabling acquisition and growth financing, connecting you to the best services (branding, legal, PR, financing) to improve your metrics, helping you find a mentor who has sold their own start-up in your sector and other tools to help you grow and unlock value.',
    ],
  },
  {
    id: 1, cat: 'founder',
    q: 'What are the charges if I list my start-up on Done Deal? I mean ALL the charges?',
    a: [
      'When we started Done Deal we were clear on one thing, we are founder-first and your trust means everything to us.',
      <><b>We DO NOT</b> charge a monthly retainer or an upfront one-time listing fee.</>,
      <><b>We DO NOT</b> charge the investor to search for sellers or charge them for acquiring a start-up. We want to make it easier for buyers to come find you.</>,
      'Companies will look for an acquisition at various points of time in their growth cycle — we want to make it easy and frictionless so that both sellers and buyers find each other at the right time. We charge a flat success fee which is clearly mentioned in the engagement letter you enter with us. The fee is linked to the value you sell your company for, and payable to us only when you get money in the bank.',
    ],
  },
  {
    id: 2, cat: 'founder',
    q: 'I am not sure if I want to be acquired. Should I still explore listing on Done Deal?',
    a: [
      'Yes, with Done Deal you can stay anonymous and receive inbound interest from acquirers and investors, and take a call on engaging further and revealing your identity.',
      'Use this to assess the interest in the market and keep your metrics updated through the platform. If it feels right, take the decision to list and engage with the investor universe.',
    ],
  },
  {
    id: 3, cat: 'founder',
    q: "Is the listing anonymous? I don't want competitors finding out that I am interested in selling.",
    a: [
      'Yes, the listing is completely anonymous. Your inputs result in an anonymous cue card which is made available to interested investors. If they like your profile, they will express interest in having a conversation with you. The name of the potential investor is visible to you. If you like their profile, you can give them access to your name and more details to take the discussion forward.',
    ],
  },
  {
    id: 4, cat: 'founder',
    q: 'How long does it typically take to get acquired through Done Deal?',
    a: [
      'Timelines vary by sector, size and deal complexity, but founders who engage actively often see meaningful conversations within weeks rather than months.',
      'Because buyers come to you with intent — matched to your profile — the process is far faster and less distracting than running a traditional outbound sale.',
    ],
  },
  {
    id: 5, cat: 'founder',
    q: 'What information do I need to list my start-up?',
    a: [
      'Just the essentials to build your anonymous cue card — sector, stage, revenue range, growth and what you’re exploring (acquisition, capital, or both).',
      'You can keep your metrics updated over time, and you only reveal your identity when you decide to engage with an interested party.',
    ],
  },
  {
    id: 6, cat: 'founder',
    q: 'Can I raise capital instead of selling?',
    a: [
      "Yes. Done Deal isn't only about acquisitions — you can explore growth and acquisition financing with the same vetted investor network. Many founders use the platform to gauge interest before deciding which path is right for them.",
    ],
  },
  {
    id: 7, cat: 'buyer',
    q: 'Are there any hidden charges on your platform, or is it really zero fees?',
    a: [
      "Yes, we are genuinely a zero-fee platform. There are no subscription fees, success fees, or any other charges for discovering and acquiring or investing in companies through our platform. However, if you decide to acquihire a company, there is a fee equivalent to 1 month's CTC of the key leadership.",
    ],
  },
  {
    id: 8, cat: 'buyer',
    q: 'What happens once I express interest in a company?',
    a: [
      'After expressing interest in a company, the designated representative of that company receives prompt notification along with your company description. The decision to accept or reject your interest rests with the seller. In the event of acceptance, a connecting email is automatically generated, enabling a call to delve deeper into discussions and share additional information.',
    ],
  },
  {
    id: 9, cat: 'buyer',
    q: 'Does Done Deal handle due diligence and other legal procedures for closing a deal?',
    a: [
      'Done Deal has established partnerships with trusted service providers to handle all the necessary due diligence and legal procedures for closing a deal. If you lack the required resources, you can easily access these services through our partner program at a pre-decided fee.',
    ],
  },
  {
    id: 10, cat: 'buyer',
    q: "What if I can't find the type of company I'm looking to invest into on the platform?",
    a: [
      "If you can't find the ideal company on the platform, simply navigate to the ‘Create a mandate’ button at the bottom right of your browse screen. Fill in the information, and our scouts will be activated to find you the right fit based on your requirements — all at no cost to you. Rest assured, the mandates you create are anonymized by our teams before being made public. We prioritize your privacy and never reveal your name.",
    ],
  },
  {
    id: 11, cat: 'buyer',
    q: 'How are companies verified on the platform?',
    a: [
      'Every company is reviewed by our team before it goes live. We validate the core details on the cue card so that the dealflow you see is genuine, relevant and ready for a real conversation.',
    ],
  },
  {
    id: 12, cat: 'buyer',
    q: 'Can I create a mandate for a specific kind of company?',
    a: [
      "Yes. Use the ‘Create a mandate’ option to tell us exactly what you’re looking for — sector, revenue range, geography and thesis. Our scouts then source matching companies, and your mandate is anonymized by our team before it’s ever made public.",
    ],
  },
  {
    id: 13, cat: 'buyer',
    q: 'Is there a limit to how many companies I can engage with?',
    a: [
      'No. You can express interest in as many companies as fit your thesis. There are no per-deal charges for discovering, acquiring or investing — the platform is genuinely free for buyers.',
    ],
  },
];

const FILTERS = [
  { key: 'all',     label: 'All questions' },
  { key: 'founder', label: 'For founders' },
  { key: 'buyer',   label: 'For buyers' },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`ddfaq-item${isOpen ? ' open' : ''}`}>
      <button className="ddfaq-q" type="button" onClick={onToggle}>
        <span className={`ddfaq-tag ${faq.cat}`}>
          {faq.cat === 'founder' ? 'Founder' : 'Buyer'}
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

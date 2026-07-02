import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/blog.css';

/* ── Shared icon for deal acquisition posts ────────────────────── */
const DealHandshake = () => (
  <>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </>
);

const ORB_SM = { width: 200, height: 200, left: '-10%', top: '-18%', opacity: 0.55 };

/* ── Post data ─────────────────────────────────────────────────── */
const POSTS = [
  {
    slug: 'managing-multiple-deal-flow', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: 'Managing multiple deal flow: how Done Deal streamlines the process for investors',
    excerpt: 'Optimize your investment strategy with a single, organised pipeline for every active conversation.',
    date: 'May 14, 2025', readTime: '6 min read',
    icon: <><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></>,
  },
  {
    slug: 'how-to-read-a-cue-card', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: 'How to read a cue card: a section-by-section guide',
    excerpt: 'Streamline your decisions with anonymized cue cards — here is what every section is telling you.',
    date: 'May 2, 2025', readTime: '5 min read',
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="7" y1="14.5" x2="13" y2="14.5" /></>,
  },
  {
    slug: 'strategic-growth-early-stage-acquisitions', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: 'Strategic growth through early-stage acquisitions',
    excerpt: 'A guide for founders and investors on unlocking growth by mastering early-stage M&A.',
    date: 'Apr 22, 2025', readTime: '8 min read',
    icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
  },
  {
    slug: 'essential-steps-in-the-m-a-process', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: 'Essential steps in the M&A process: a detailed guide',
    excerpt: 'From first conversation to close — the milestones and the expert tips that keep deals on track.',
    date: 'Apr 9, 2025', readTime: '9 min read',
    icon: <><circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><path d="M5 8v8" /><path d="M9 6h7a3 3 0 0 1 0 6H9" /><path d="M9 18h11" /></>,
  },
  {
    slug: 'private-equity-in-indian-m-a', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: 'The growing role of private equity in Indian M&A deals',
    excerpt: 'How PE capital is reshaping deal structures, valuations and timelines across India.',
    date: 'Mar 28, 2025', readTime: '7 min read',
    icon: <><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><polygon points="12 2 20 7 4 7" /></>,
  },
  {
    slug: 'confidential-information-memorandum-cim', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer',
    title: "What's a Confidential Information Memorandum (CIM) in M&A?",
    excerpt: 'Decoding the CIM — your essential guide to the document that frames every serious transaction.',
    date: 'Mar 15, 2025', readTime: '6 min read',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></>,
  },
  {
    slug: 'how-to-write-a-cue-card', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: 'How to write a cue card that investors will read',
    excerpt: 'Crafting the perfect cue card — what to lead with, what to leave out, and how to stand out.',
    date: 'May 9, 2025', readTime: '5 min read',
    icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  },
  {
    slug: 'how-done-deal-keeps-identity-secret', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: "How does Done Deal keep your company's identity a secret",
    excerpt: 'Protecting your confidentiality at every step of the investing process — by design.',
    date: 'Apr 30, 2025', readTime: '4 min read',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    slug: 'insights-from-f-b-founders', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: 'Insights from F&B founders',
    excerpt: 'What food & beverage founders are seeing on market trends and where the growth is.',
    date: 'Apr 17, 2025', readTime: '6 min read',
    icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  },
  {
    slug: 'how-to-attract-strategic-investors', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: 'How to attract strategic investors for your startup',
    excerpt: 'Key steps to elevate your startup and secure the strategic investors that move the needle.',
    date: 'Apr 4, 2025', readTime: '7 min read',
    icon: <><path d="M6 3v6a6 6 0 0 0 12 0V3" /><line x1="6" y1="3" x2="10" y2="3" /><line x1="14" y1="3" x2="18" y2="3" /></>,
  },
  {
    slug: 'embracing-the-sports-revolution-in-india', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: 'Embracing the sports revolution in India: opportunities for startups',
    excerpt: 'Seizing a fast-growing market — where founders can build and where capital is flowing.',
    date: 'Mar 21, 2025', readTime: '8 min read',
    icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  },
  {
    slug: 'role-of-due-diligence-in-m-a', cat: 'founder', cover: 'cov-founder', tag: 'Founder',
    title: 'The role of due diligence in ensuring a successful M&A',
    excerpt: 'Mastering due diligence in the dynamic Indian startup ecosystem — what buyers really check.',
    date: 'Mar 7, 2025', readTime: '9 min read',
    icon: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  },
  {
    slug: 'heritage-foods-x-get-a-way', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals',
    title: 'Heritage Foods x Get-A-Way is a Done Deal',
    excerpt: 'A strategic move in the F&B space — facilitated end-to-end on Done Deal.',
    date: 'Jun 2, 2025', readTime: '4 min read',
    icon: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>,
  },
  {
    slug: 'sekkei-bio-series-a', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals',
    title: 'Sekkei Bio secures Series A co-led by Tenshi Pharmaceuticals & Ashish Kacholia',
    excerpt: 'A landmark deep-tech raise, matched and momentum-built through the platform.',
    date: 'May 20, 2025', readTime: '4 min read',
    icon: <><path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /><path d="M6 14h12" /></>,
  },
  {
    slug: 'wldd-x-7-10', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals',
    title: 'WLDD x 7-10 is a Done Deal',
    excerpt: 'WLDD acquires a majority stake in 7-10 to expand its D2C portfolio in an all-cash deal.',
    date: 'Apr 4, 2025', readTime: '5 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'ritualistic-x-deep-bajaj', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals',
    title: 'Ritualistic x Deep Bajaj is a Done Deal',
    excerpt: 'Ritualistic secures $1M to celebrate Indian heritage in home décor.',
    date: 'Mar 30, 2025', readTime: '4 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'wldd-x-scoopwhoop', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals',
    title: 'WLDD x ScoopWhoop is a Done Deal',
    excerpt: 'WLDD acquires ScoopWhoop to strengthen its digital media play — closed in just 3 weeks.',
    date: 'Mar 12, 2025', readTime: '5 min read',
    icon: <DealHandshake />,
  },
];

/* ── Helper components ─────────────────────────────────────────── */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

function BlogMeta({ date, readTime, className }) {
  return (
    <div className={`blog-meta${className ? ' ' + className : ''}`}>
      <span className="mi"><CalendarIcon />{date}</span>
      <span className="sep" />
      <span className="mi"><ClockIcon />{readTime}</span>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <a className="bcard reveal" href={`DoneDeal-Blog-Post.html?p=${post.slug}`}>
      <div className={`cover ${post.cover}`} style={{ height: 160 }}>
        <div className="cov-grid" />
        <div className="cov-orb" style={ORB_SM} />
        <span className="cov-tag">{post.tag}</span>
        <div className="cov-ic"><svg viewBox="0 0 24 24">{post.icon}</svg></div>
      </div>
      <div className="bcard-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <BlogMeta date={post.date} readTime={post.readTime} className="mt" />
        <span className="read-link">Read the post <span className="arrow">→</span></span>
      </div>
    </a>
  );
}

const FILTERS = [
  { key: 'all',     label: 'All posts' },
  { key: 'founder', label: 'For founders' },
  { key: 'buyer',   label: 'For buyers' },
  { key: 'deal',    label: 'Done Deals' },
];

/* ── Page ──────────────────────────────────────────────────────── */
export default function Blog() {
  useReveal();
  useParallax();
  useLightwell();

  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? POSTS : POSTS.filter(p => p.cat === filter);

  return (
    <>
      <Nav current="blog" />
      <main id="top">

        {/* ── Hero: featured post ─────────────────────────────── */}
        <section
          className="blog-hero section-pad relative"
          style={{ paddingTop: 'clamp(112px,13vh,150px)', paddingBottom: 'clamp(48px,6vh,72px)' }}
        >
          <div className="amb">
            <div className="glow warm absolute" style={{ width: 520, height: 440, left: '50%', top: '-16%', transform: 'translateX(-50%)', opacity: 0.32 }} />
            <div className="glow p absolute" style={{ width: 340, height: 300, left: '2%', top: '18%', opacity: 0.3 }} />
            <div className="ring drift absolute" data-speed="0.10" style={{ width: 260, height: 260, right: '5%', top: '10%' }} />
          </div>

          <div className="wrap" style={{ maxWidth: 1480 }}>
            <div className="reveal text-center mx-auto mb-11" style={{ maxWidth: 960 }}>
              <div className="kicker" style={{ justifyContent: 'center' }}>
                <span className="live-dot" />
                Done Deal Club&nbsp;&nbsp;<span className="dot">·</span>&nbsp;&nbsp;Insights &amp; playbooks
              </div>
              <h1 className="h-display mt-4" style={{ fontSize: 'clamp(32px,4.6vw,56px)', whiteSpace: 'nowrap' }}>
                The blog for founders <span className="accent-copper">&amp; buyers.</span>
              </h1>
              <p className="lede" style={{ margin: '18px auto 0', maxWidth: 560 }}>
                Resources, deal stories and expert advice to help you navigate the acquisition market — whichever side you&apos;re on.
              </p>
            </div>

            <div className="blog-feat reveal">
              <span className="ribbon">Featured</span>
              <div className="cover cov-deal">
                <div className="cov-grid" />
                <div className="cov-orb" style={{ width: 300, height: 300, left: '-8%', top: '-12%', opacity: 0.5 }} />
                <span className="cov-tag">Done Deals</span>
                <div className="cov-ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
              </div>
              <div className="blog-feat-body">
                <span className="feat-eyebrow">Editor&apos;s pick</span>
                <h2>A ₹150 Cr+ commitment for a BPC brand — our biggest deal yet</h2>
                <p>Inside the largest commitment facilitated on Done Deal to date: how a beauty &amp; personal care brand attracted a nine-figure strategic partner, and what it signals for the market.</p>
                <BlogMeta date="Jun 10, 2025" readTime="7 min read" className="mt" />
                <div className="cta-row mt-6">
                  <a className="btn btn-primary" href="DoneDeal-Blog-Post.html?p=150-cr-commitment-bpc-brand">
                    Read the post
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── All articles ────────────────────────────────────── */}
        <section id="all" className="section-pad relative" style={{ paddingTop: 'clamp(20px,3vh,44px)' }}>
          <div className="amb">
            <div className="glow p absolute" style={{ width: 440, height: 380, right: '-8%', top: '4%', opacity: 0.3 }} />
            <div className="glow warm absolute" style={{ width: 300, height: 280, left: '-6%', bottom: '6%', opacity: 0.3 }} />
          </div>
          <div className="wrap">
            <div className="eyebrow-row reveal">
              <span className="num">01</span>
              <span className="kicker">All articles</span>
              <span className="ln" />
            </div>

            <h2 className="h-sec reveal">Read by topic, <span className="accent-i">or by deal.</span></h2>

            <div className="mand-filters blog-filters reveal" style={{ marginTop: 30 }} role="tablist">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  className={`fchip${filter === f.key ? ' on' : ''}`}
                  onClick={() => setFilter(f.key)}
                  role="tab"
                  aria-selected={filter === f.key}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {visible.length > 0 ? (
              <div className="blog-grid">
                {visible.map(post => <BlogCard key={post.slug} post={post} />)}
              </div>
            ) : (
              <div className="blog-empty">No posts in this category yet.</div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import { POSTS } from '../data/posts';
import LazyImage from '../components/LazyImage';
import '../styles/blog.css';

const ORB_SM = { width: 200, height: 200, left: '-10%', top: '-18%', opacity: 0.55 };

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
        {post.image ? (
          <>
            <LazyImage src={post.image} alt={post.title} />
            <span className="cov-tag">{post.tag}</span>
          </>
        ) : (
          <>
            <div className="cov-grid" />
            <div className="cov-orb" style={ORB_SM} />
            <span className="cov-tag">{post.tag}</span>
            <div className="cov-ic"><svg viewBox="0 0 24 24">{post.icon}</svg></div>
          </>
        )}
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
              <div className="cover cov-deal has-img">
                <span className="cov-tag">Done Deals</span>
                <LazyImage src={POSTS[0].image} alt={POSTS[0].title} />
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

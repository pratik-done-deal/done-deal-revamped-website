import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import '../styles/blog.css';

export default function BlogPost() {
  useReveal();
  useParallax();
  useLightwell();

  return (
    <>
      <Nav current="blog" />
      <main id="top">
        <article>

          {/* ── Article hero ────────────────────────────────────────── */}
          <section className="relative" style={{ paddingTop: 'clamp(116px,15vh,168px)' }}>

            {/* Ambient decorative layer */}
            <div className="amb">
              <div
                className="glow p absolute"
                id="artOrbA"
                style={{ width: 480, height: 420, left: '50%', top: '-14%', transform: 'translateX(-50%)', opacity: 0.32 }}
              />
              <div
                className="glow warm absolute"
                style={{ width: 320, height: 300, left: '2%', top: '18%', opacity: 0.3 }}
              />
              <div
                className="ring drift absolute"
                data-speed="0.10"
                style={{ width: 240, height: 240, right: '5%', top: '10%' }}
              />
            </div>

            <div className="wrap">
              <div className="reveal max-w-[1000px] mx-auto">

                {/* Top bar: back link + category eyebrow */}
                <div className="flex items-center justify-between gap-4">
                  <Link
                    to="/blog"
                    className="art-back inline-flex items-center gap-2 no-underline text-sm font-medium transition-colors duration-[250ms]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-[15px] h-[15px] fill-none stroke-current"
                      style={{ strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                    >
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to blog
                  </Link>
                  <div
                    id="artEyebrow"
                    className="art-eyebrow inline-flex items-center gap-[9px] m-0 text-[11px] font-semibold tracking-[0.14em] uppercase"
                  />
                </div>

                {/* Title */}
                <h1
                  id="artTitle"
                  className="font-medium leading-[1.05] mt-[26px] [text-wrap:balance]"
                  style={{ fontSize: 'clamp(30px,4.2vw,52px)', letterSpacing: '-0.035em', color: 'var(--bone)' }}
                >
                  Loading…
                </h1>

                {/* Author / date / read-time — injected by data loader */}
                <div
                  id="artMeta"
                  className="art-meta flex items-center gap-[14px] mt-6 text-[13.5px]"
                  style={{ color: 'var(--bone-faint)' }}
                />
              </div>

              {/* Cover image — injected by data loader */}
              <div id="artCover" className="art-cover reveal max-w-[1000px] mx-auto mt-11" />
            </div>
          </section>

          {/* ── Article body ─────────────────────────────────────────── */}
          <section className="section-pad" style={{ paddingTop: 'clamp(40px,5vh,64px)' }}>
            <div className="wrap">

              {/* Rich text — injected by data loader */}
              <div id="artBody" className="art-body max-w-[720px] mx-auto" />

              {/* CTA card */}
              <div
                className="reveal max-w-[720px] mx-auto mt-14 border rounded-[20px] text-center"
                style={{
                  borderColor: 'var(--line)',
                  padding: 'clamp(28px,4vw,40px)',
                  background: 'linear-gradient(150deg, rgba(92,111,255,0.12), var(--ink-purple) 64%)',
                }}
              >
                <h3
                  className="font-medium"
                  style={{ fontSize: 'clamp(20px,2.2vw,26px)', letterSpacing: '-0.025em', color: 'var(--bone)' }}
                >
                  Find out what your company is worth.
                </h3>
                <p className="mt-[10px] text-[15.5px]" style={{ color: 'var(--bone-dim)' }}>
                  It&apos;s free, anonymous, and takes just a few minutes.
                </p>
                <div className="cta-row justify-center mt-6">
                  <a className="btn btn-primary" href="https://app.done.deals/valuation-calculator">
                    Get your valuation
                  </a>
                  <a className="link" href="DoneDeal-Mandates.html">
                    Browse live mandates <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Prev / next ──────────────────────────────────────────── */}
          <section
            className="section-pad max-sm:!pt-[10px] max-sm:!pb-7"
            style={{ paddingTop: 'clamp(20px,3vh,40px)' }}
          >
            <div className="wrap">
              <div className="eyebrow-row reveal max-sm:!mb-[14px]">
                <span className="kicker">Keep reading</span>
                <span className="ln" />
              </div>
              {/* Prev/next cards — injected by data loader */}
              <div
                id="artNav"
                className="reveal max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-[22px]"
              />
            </div>
          </section>

        </article>
      </main>
      <Footer />
    </>
  );
}

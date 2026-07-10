import { Link, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import { POSTS } from '../data/posts';
import LazyImage from '../components/LazyImage';
import '../styles/blog.css';
import Seo from '../components/Seo';
import { SITE_URL, getBlogPostMeta, resolveImageUrl } from '../seo/meta';

// eager: true bundles every post body at build time so it's present in the
// initial render output — required for the body to show up in prerendered
// (crawlable) HTML instead of only appearing after a client-side fetch.
const blogFiles = import.meta.glob('../blogs/*.html', { query: '?raw', import: 'default', eager: true });

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

function NavCard({ post, dir, alone }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`art-navcard${dir === 'next' ? ' next' : ''}${alone ? ' sm:col-start-2' : ''}`}
    >
      <span className="nav-dir">{dir === 'next' ? 'Next →' : '← Previous'}</span>
      <span className="nav-title">{post.title}</span>
      <span className="nav-tag">{post.tag} · {post.readTime}</span>
    </Link>
  );
}

export default function BlogPost() {
  useReveal();
  useParallax();
  useLightwell();

  const { slug } = useParams();
  const idx = POSTS.findIndex(p => p.slug === slug);
  const post = POSTS[idx];
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;

  const bodyHtml = post ? (blogFiles[`../blogs/${post.slug}.html`] || null) : null;

  if (!post) {
    return (
      <>
        <Seo
          title="Post not found | Done Deal"
          description="This blog post couldn't be found."
          path={`/blog/${slug || ''}`}
          noindex
        />
        <Nav current="blog" />
        <main id="top" style={{ paddingTop: 'clamp(116px,15vh,168px)', textAlign: 'center', color: 'var(--bone)' }}>
          <h1 style={{ fontSize: 'clamp(24px,3vw,36px)' }}>Post not found</h1>
          <Link to="/blog" className="art-back" style={{ display: 'inline-block', marginTop: 20 }}>
            ← Back to blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const postMeta = getBlogPostMeta(post);
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: resolveImageUrl(post.image),
    datePublished: new Date(post.date).toISOString(),
    author: { '@type': 'Organization', name: 'Done Deal' },
    publisher: { '@type': 'Organization', name: 'Done Deal' },
    mainEntityOfPage: `${SITE_URL}${postMeta.path}`,
  };

  return (
    <>
      <Seo {...postMeta} type="article" structuredData={articleStructuredData} />
      <Nav current="blog" />
      <main id="top">
        <article>

          {/* ── Article hero ────────────────────────────────────────── */}
          <section className="relative" style={{ paddingTop: 'clamp(116px,15vh,168px)' }}>

            <div className="amb">
              <div
                className="glow p absolute"
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

                {/* Back link + category eyebrow */}
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
                  <div className={`art-eyebrow ${post.cat} inline-flex items-center gap-[9px] m-0 text-[11px] font-semibold tracking-[0.14em] uppercase`}>
                    {post.tag}
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="font-medium leading-[1.05] mt-[26px] [text-wrap:balance]"
                  style={{ fontSize: 'clamp(30px,4.2vw,52px)', letterSpacing: '-0.035em', color: 'var(--bone)' }}
                >
                  {post.title}
                </h1>

                {/* Meta */}
                <div
                  className="art-meta flex items-center gap-[14px] mt-6 text-[13.5px]"
                  style={{ color: 'var(--bone-faint)' }}
                >
                  <span className="mi"><CalendarIcon />{post.date}</span>
                  <span className="sep" />
                  <span className="mi"><ClockIcon />{post.readTime}</span>
                </div>
              </div>

              {/* Cover */}
              <div className="art-cover reveal max-w-[1000px] mx-auto mt-11">
                {post.image ? (
                  <div className={`cover ${post.cover} has-img`}>
                    <span className="cov-tag">{post.tag}</span>
                    <LazyImage src={post.image} alt={post.title} />
                  </div>
                ) : (
                  <div className={`cover ${post.cover}`}>
                    <div className="cov-grid" />
                    <div
                      className="cov-orb"
                      style={{ width: 480, height: 420, left: '50%', top: '-14%', transform: 'translateX(-50%)', opacity: 0.5 }}
                    />
                    <span className="cov-tag">{post.tag}</span>
                    <div className="cov-ic">
                      <svg viewBox="0 0 24 24">{post.icon}</svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── Article body ─────────────────────────────────────────── */}
          <section className="section-pad" style={{ paddingTop: 'clamp(40px,5vh,64px)' }}>
            <div className="wrap">

              <div className="art-body max-w-[720px] mx-auto">
                {bodyHtml
                  ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                  : <p className="lead">{post.excerpt}</p>
                }
              </div>

              {/* CTA card */}
              {/* <div
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
                  <Link className="link" to="/mandates">
                    Browse live mandates <span className="arrow">→</span>
                  </Link>
                </div>
              </div> */}
            </div>
          </section>

          {/* ── Prev / next ──────────────────────────────────────────── */}
          {(prev || next) && (
            <section
              className="section-pad max-sm:!pt-[10px] max-sm:!pb-7"
              style={{ paddingTop: 'clamp(20px,3vh,40px)' }}
            >
              <div className="wrap">
                <div className="eyebrow-row reveal max-sm:!mb-[14px]">
                  <span className="kicker">Keep reading</span>
                  <span className="ln" />
                </div>
                <div className="reveal max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
                  {prev && <NavCard post={prev} dir="prev" />}
                  {next && <NavCard post={next} dir="next" alone={!prev} />}
                </div>
              </div>
            </section>
          )}

        </article>
      </main>
      <Footer />
    </>
  );
}

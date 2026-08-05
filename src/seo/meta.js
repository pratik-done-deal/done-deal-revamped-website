// Single source of truth for per-route SEO metadata, used by both the <Seo />
// component (client + SSR render) and scripts/prerender.mjs (sitemap.xml).
//
// SITE_URL intentionally points at the production domain (done.deals), not the
// preview deployment host — canonical/OG URLs must resolve to where the site
// will actually live once DNS cuts over from Webflow.
import { POSTS } from '../data/posts';

export const SITE_URL = 'https://www.done.deals';
export const SITE_NAME = 'Done Deal';
export const DEFAULT_OG_IMAGE = '/assets/og/done-deal-og.png';

export const ROUTE_META = {
  '/': {
    title: 'Investment bank for ambitious founders | Done Deal',
    description:
      "Done Deal is the AI-native investment bank for founders raising capital and buyers sourcing acquisitions. We run every deal from mandate to close.",
  },
  '/investors': {
    title: 'Find Your Next Acquisition | Done Deal for Investors',
    description:
      'Source vetted, high-intent acquisition and investment opportunities before the market does — Done Deal connects investors with founder-verified deal flow.',
  },
  '/mandates': {
    title: 'Live Buyer Mandates | Done Deal',
    description:
      'Browse live mandates from buyers ready to deploy capital now. See what active acquirers and investors are looking for on Done Deal.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | Done Deal',
    description:
      'Everything you need to know about getting acquired, raising capital, and how Done Deal works — for founders and buyers alike.',
  },
  '/blog': {
    title: 'The Done Deal Blog — Insights for Founders & Buyers',
    description:
      'Guides and insights on M&A, fundraising, due diligence, and deal-making from the team behind Done Deal.',
  },
  '/legal': {
    title: 'Terms & Privacy Policy | Done Deal',
    description:
      'The terms and policies that govern your use of Done Deal — for investors, for companies, and the data we hold on your behalf.',
  },
  '/contact': {
    title: 'Contact Us | Done Deal',
    description:
      "Have questions about a deal, a mandate, or a partnership? Get in touch with the Done Deal team.",
  },
  '/about': {
    title: 'About Done Deal | An Investment Bank, Backed by AI',
    description:
      'Done Deal pairs AI-driven buyer discovery and document generation with experienced bankers to get deals done faster.',
  },
};

export function resolveImageUrl(image) {
  if (!image) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (image.startsWith('http') || image.startsWith('data:')) return image;
  return `${SITE_URL}${image}`;
}

export function getBlogPostMeta(post) {
  return {
    title: `${post.title} | Done Deal Blog`,
    description: post.excerpt,
    image: post.image,
    path: `/blog/${post.slug}`,
  };
}

// Every route the app serves, used to drive prerendering + sitemap generation.
export function getAllRoutes() {
  const staticRoutes = Object.keys(ROUTE_META);
  const blogRoutes = POSTS.map((post) => `/blog/${post.slug}`);
  return [...staticRoutes, ...blogRoutes];
}

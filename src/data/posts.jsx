import React from 'react';
import imgManagingMultipleDeal from '../assets/managing-multiple-deal.png';
import imgHowToReadCuecard from '../assets/how-to-read-cuecard.png';
import imgStrategicGrowth from '../assets/strategic-growth.png';
import imgEssentialSteps from '../assets/essential-steps.png';
import imgPrivateEquity from '../assets/growing-role-of-private-equity.png';
import imgCIM from '../assets/confidential-information-memorandum.png';
import imgHowToWriteCuecard from '../assets/how-to-write-a-cuecard.png';
import imgKeepIdentitySecret from '../assets/how-does-donedeal-keep-your-identity-secret.png';
import imgInsightsFnB from '../assets/insights-from-f&b-founders.png';
import imgAttractInvestors from '../assets/attract-strategic-investors.png';
import imgDueDiligence from '../assets/role-of-due-diligence.png';
import imgSportsRevolution from '../assets/embracing-the-sports-revolution.png';
import img150CrDeal from '../assets/150-cr-commitment.png';
import imgSekkeiSeries from '../assets/SEKKEI-raise-funds.png';
import imgHeritageGetaway from '../assets/heritage-get-a-way.png';
import imgRitualistic from '../assets/ritualistic-deep-bajaj.png';
import imgWldd710 from '../assets/wlld-seven-ten.png';
import imgWlddScoop from '../assets/wldd-scoop-whoop.png';
import imgMetashot from '../assets/metashot.png';
import imgCollective from '../assets/collective.png';
import imgNiyogin from '../assets/niyogen.png';

const DealHandshake = () => (
  <>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </>
);

export const POSTS = [
  {
    slug: '150-cr-commitment-bpc-brand', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: img150CrDeal,
    title: 'A ₹150 Cr+ commitment for a BPC brand — our biggest deal yet',
    excerpt: 'Inside the largest commitment facilitated on Done Deal to date: how a beauty & personal care brand attracted a nine-figure strategic partner, and what it signals for the market.',
    date: 'Jun 10, 2025', readTime: '7 min read',
    icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  },
  {
    slug: 'managing-multiple-deal-flow', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgManagingMultipleDeal,
    title: 'Managing multiple deal flow: how Done Deal streamlines the process for investors',
    excerpt: 'Optimize your investment strategy with a single, organised pipeline for every active conversation.',
    date: 'May 14, 2025', readTime: '6 min read',
    icon: <><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></>,
  },
  {
    slug: 'how-to-read-a-cue-card', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgHowToReadCuecard,
    title: 'How to read a cue card: a section-by-section guide',
    excerpt: 'Streamline your decisions with anonymized cue cards — here is what every section is telling you.',
    date: 'May 2, 2025', readTime: '5 min read',
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="7" y1="14.5" x2="13" y2="14.5" /></>,
  },
  {
    slug: 'strategic-growth-early-stage-acquisitions', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgStrategicGrowth,
    title: 'Strategic growth through early-stage acquisitions',
    excerpt: 'A guide for founders and investors on unlocking growth by mastering early-stage M&A.',
    date: 'Apr 22, 2025', readTime: '8 min read',
    icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
  },
  {
    slug: 'essential-steps-in-the-m-a-process', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgEssentialSteps,
    title: 'Essential steps in the M&A process: a detailed guide',
    excerpt: 'From first conversation to close — the milestones and the expert tips that keep deals on track.',
    date: 'Apr 9, 2025', readTime: '9 min read',
    icon: <><circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><path d="M5 8v8" /><path d="M9 6h7a3 3 0 0 1 0 6H9" /><path d="M9 18h11" /></>,
  },
  {
    slug: 'private-equity-in-indian-m-a', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgPrivateEquity,
    title: 'The growing role of private equity in Indian M&A deals',
    excerpt: 'How PE capital is reshaping deal structures, valuations and timelines across India.',
    date: 'Mar 28, 2025', readTime: '7 min read',
    icon: <><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><polygon points="12 2 20 7 4 7" /></>,
  },
  {
    slug: 'confidential-information-memorandum-cim', cat: 'buyer', cover: 'cov-buyer', tag: 'Buyer', image: imgCIM,
    title: "What's a Confidential Information Memorandum (CIM) in M&A?",
    excerpt: 'Decoding the CIM — your essential guide to the document that frames every serious transaction.',
    date: 'Mar 15, 2025', readTime: '6 min read',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></>,
  },
  {
    slug: 'how-to-write-a-cue-card', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgHowToWriteCuecard,
    title: 'How to write a cue card that investors will read',
    excerpt: 'Crafting the perfect cue card — what to lead with, what to leave out, and how to stand out.',
    date: 'May 9, 2025', readTime: '5 min read',
    icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  },
  {
    slug: 'how-done-deal-keeps-identity-secret', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgKeepIdentitySecret,
    title: "How does Done Deal keep your company's identity a secret",
    excerpt: 'Protecting your confidentiality at every step of the investing process — by design.',
    date: 'Apr 30, 2025', readTime: '4 min read',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    slug: 'insights-from-f-b-founders', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgInsightsFnB,
    title: 'Insights from F&B founders',
    excerpt: 'What food & beverage founders are seeing on market trends and where the growth is.',
    date: 'Apr 17, 2025', readTime: '6 min read',
    icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  },
  {
    slug: 'how-to-attract-strategic-investors', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgAttractInvestors,
    title: 'How to attract strategic investors for your startup',
    excerpt: 'Key steps to elevate your startup and secure the strategic investors that move the needle.',
    date: 'Apr 4, 2025', readTime: '7 min read',
    icon: <><path d="M6 3v6a6 6 0 0 0 12 0V3" /><line x1="6" y1="3" x2="10" y2="3" /><line x1="14" y1="3" x2="18" y2="3" /></>,
  },
  {
    slug: 'embracing-the-sports-revolution-in-india', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgSportsRevolution,
    title: 'Embracing the sports revolution in India: opportunities for startups',
    excerpt: 'Seizing a fast-growing market — where founders can build and where capital is flowing.',
    date: 'Mar 21, 2025', readTime: '8 min read',
    icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  },
  {
    slug: 'role-of-due-diligence-in-m-a', cat: 'founder', cover: 'cov-founder', tag: 'Founder', image: imgDueDiligence,
    title: 'The role of due diligence in ensuring a successful M&A',
    excerpt: 'Mastering due diligence in the dynamic Indian startup ecosystem — what buyers really check.',
    date: 'Mar 7, 2025', readTime: '9 min read',
    icon: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  },
  {
    slug: 'heritage-foods-x-get-a-way', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgHeritageGetaway,
    title: 'Heritage Foods x Get-A-Way is a Done Deal',
    excerpt: 'A strategic move in the F&B space — facilitated end-to-end on Done Deal.',
    date: 'Jun 2, 2025', readTime: '4 min read',
    icon: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>,
  },
  {
    slug: 'sekkei-bio-series-a', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgSekkeiSeries,
    title: 'Sekkei Bio secures Series A co-led by Tenshi Pharmaceuticals & Ashish Kacholia',
    excerpt: 'A landmark deep-tech raise, matched and momentum-built through the platform.',
    date: 'May 20, 2025', readTime: '4 min read',
    icon: <><path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /><path d="M6 14h12" /></>,
  },
  {
    slug: 'wldd-x-7-10', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgWldd710,
    title: 'WLDD x 7-10 is a Done Deal',
    excerpt: 'WLDD acquires a majority stake in 7-10 to expand its D2C portfolio in an all-cash deal.',
    date: 'Apr 4, 2025', readTime: '5 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'ritualistic-x-deep-bajaj', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgRitualistic,
    title: 'Ritualistic x Deep Bajaj is a Done Deal',
    excerpt: 'Ritualistic secures $1M to celebrate Indian heritage in home décor.',
    date: 'Mar 30, 2025', readTime: '4 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'wldd-x-scoopwhoop', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgWlddScoop,
    title: 'WLDD x ScoopWhoop is a Done Deal',
    excerpt: 'WLDD acquires ScoopWhoop to strengthen its digital media play — closed in just 3 weeks.',
    date: 'Mar 12, 2025', readTime: '5 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'metashot-x-sharrp-ventures', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgMetashot,
    title: 'Metashot x Sharrp Ventures is a Done Deal',
    excerpt: 'MetaShot raises ₹11 Cr to scale the future of physical-virtual gaming.',
    date: 'Mar 1, 2025', readTime: '3 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'ttt-x-collective-artists-network', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgCollective,
    title: 'Terribly Tiny Tales x Collective Artists Network is a Done Deal',
    excerpt: "India's largest storytelling community joins one of India's largest creator companies.",
    date: 'Jul 15, 2024', readTime: '4 min read',
    icon: <DealHandshake />,
  },
  {
    slug: 'superscan-orbo-x-niyogin', cat: 'deal', cover: 'cov-deal', tag: 'Done Deals', image: imgNiyogin,
    title: 'SuperScan by Orbo AI x Niyogin is a Done Deal',
    excerpt: "Niyogin acquires Orbo's SuperScan to accelerate AI-led transformation in BFSI.",
    date: 'Jun 10, 2024', readTime: '3 min read',
    icon: <DealHandshake />,
  },
];

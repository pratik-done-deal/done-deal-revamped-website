import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import DealStrip from '../components/DealStrip';
import Process from '../components/Process';
import DealMakers from '../components/DealMakers';
import DealsClosed from '../components/DealsClosed';
import Testimonials from '../components/Testimonials';
import TrackRecord from '../components/TrackRecord';
import Comparison from '../components/Comparison';
import CtaBand from '../components/CtaBand';
import Assurance from '../components/Assurance';
import Faq from '../components/Faq';
import Investors from '../components/Investors';
import Press from '../components/Press';
import Footer from '../components/Footer';

import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import useMakersPin from '../hooks/useMakersPin';
import useProcessScenes from '../hooks/useProcessScenes';
import useScrollPercentageTracker from '../hooks/useScrollPercentageTracker';
import Seo from '../components/Seo';
import { SITE_URL, SITE_NAME, ROUTE_META } from '../seo/meta';
import { trackEvent } from '../helper/posthogHelper';
import { POSTHOG_EVENTS } from '../constants/posthogEvents';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/done-deal-icon.svg`,
  sameAs: [],
};

export default function Home() {
  useEffect(() => {
    trackEvent(POSTHOG_EVENTS.HOMEPAGE.WEBSITE_USER_LANDED_HOMEPAGE);
  }, []);

  // Pinned / scroll-driven sections
  useProcessScenes();
  useMakersPin();
  // Shared scroll behaviours
  useReveal();
  useParallax();
  useLightwell();
  useScrollPercentageTracker('home');

  return (
    <>
      <Seo {...ROUTE_META['/']} path="/" structuredData={STRUCTURED_DATA} />
      <Nav current="home" />
      <main id="top">
        <Hero />
        <DealStrip />
        <Process />
        <DealMakers />
        <DealsClosed />
        {/* dark → light band: testimonial + track record, comparison, fees */}
        <div className="lightwell">
          <div className="ttband">
            <Testimonials />
            <TrackRecord />
          </div>
          <Comparison />
          <CtaBand variant="light" hidden />
          <Assurance />
        </div>
        <Faq />
        <Investors />
        <CtaBand />
        <Press />
      </main>
      <Footer />
    </>
  );
}

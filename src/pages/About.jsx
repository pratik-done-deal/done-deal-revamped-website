import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import About from '../components/About';
import Seo from '../components/Seo';
import { ROUTE_META } from '../seo/meta';
import { trackEvent } from '../helper/posthogHelper';
import { POSTHOG_EVENTS } from '../constants/posthogEvents';
import useScrollPercentageTracker from '../hooks/useScrollPercentageTracker';
import useReveal from '../hooks/useReveal';

export default function AboutPage() {
  // Page content lives in <About /> and drives its own reveal-on-scroll via a
  // private React implementation, so this is a no-op here — it's wired up only
  // for parity with every other page, in case shared .reveal markup is ever added.
  useReveal();
  useScrollPercentageTracker('about');

  useEffect(() => {
    trackEvent(POSTHOG_EVENTS.ABOUT_US.WEBSITE_USER_LANDED_ABOUT_US);
  }, []);

  return (
    <>
      <Seo {...ROUTE_META['/about']} path="/about" />
      <Nav current="about" />
      <main id="top">
        <About />
      </main>
      <Footer />
    </>
  );
}

import React from 'react';
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
export default function Home() {
  // Pinned / scroll-driven sections
  useProcessScenes();
  useMakersPin();
  // Shared scroll behaviours
  useReveal();
  useParallax();
  useLightwell();

  return (
    <>
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

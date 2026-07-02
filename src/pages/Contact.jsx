import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import IndiaOfficeMap from '../components/IndiaOfficeMap';
import useReveal from '../hooks/useReveal';
import useParallax from '../hooks/useParallax';
import useLightwell from '../hooks/useLightwell';
import useHeroAurora from '../hooks/useHeroAurora';
import '../styles/contact.css';

const OFFICES = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    address: 'Regus Duru House, Juhu, Mumbai, Maharashtra 400049',
  },
  {
    id: 'gurgaon',
    city: 'Gurgaon',
    address: 'India Accelerator, MGF Metropolis Mall, MG Road, Sector 25, Gurgaon - 122002',
  },
];

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function OfficeCard({ office }) {
  return (
    <article className="loc-card" data-loc={office.id}>
      <span className="loc-pin-ic">
        <PinIcon />
      </span>
      <span className="loc-body">
        <span className="loc-city">{office.city}</span>
        <address className="loc-addr">{office.address}</address>
      </span>
    </article>
  );
}

function ContactMail() {
  return (
    <a className="contact-mail" href="mailto:hello@done.deals">
      <span className="cm-ic">
        <MailIcon />
      </span>
      <span className="cm-text">
        <span className="cm-label">Email us</span>
        <span className="cm-addr">hello@done.deals</span>
      </span>
      <span className="cm-arrow" aria-hidden="true">
        -&gt;
      </span>
    </a>
  );
}

export default function Contact() {
  const panelRef = React.useRef(null);
  const auroraRef = React.useRef(null);

  useReveal();
  useParallax();
  useLightwell();
  useHeroAurora(auroraRef, panelRef, 1);

  return (
    <>
      <Nav />
      <main id="top">
        <section className="contact-fold wrap" data-screen-label="Contact">
          <div className="hero-panel contact-panel" ref={panelRef}>
            <canvas className="hero-aurora" aria-hidden="true" ref={auroraRef} />
            <div className="amb" aria-hidden="true">
              <div className="glow p contact-glow-primary" />
              <div className="glow warm contact-glow-warm" />
            </div>

            <div className="cf-grid">
              <div className="cf-left reveal">
                <h1 className="h-display hero-h1">
                  Have any questions or
                  <br />
                  <span className="accent-i">need assistance?</span>
                </h1>
                <p className="lede">
                  We're here to help with anything you need - deal questions, mandates,
                  partnerships, or just getting started.
                </p>
                <ContactMail />

                <div className="cf-locs">
                  <span className="cf-locs-label">Our offices</span>
                  <div className="loc-list">
                    {OFFICES.map((office) => (
                      <OfficeCard key={office.id} office={office} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="cf-right reveal">
                <IndiaOfficeMap />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

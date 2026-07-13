import React from 'react';
import { cdnUrl } from '../config/cdn';

const logoGruhas = cdnUrl('gruhas.svg');
const logoWfc = cdnUrl('wfc.svg');
const logoBarbershop = cdnUrl('barbershop.svg');
const logoDezerv = cdnUrl('dezerv.svg');
const logoCapitalA = cdnUrl('capitalA.svg');

const INVESTOR_LOGOS = [
  { src: logoGruhas, alt: 'Gruhas' },
  { src: logoBarbershop, alt: 'The Barbershop' },
  { src: logoCapitalA, alt: 'Capital A' },
  { src: logoWfc, alt: 'We Founder Circle' },
  { src: logoDezerv, alt: 'Dezerv Innovation Fund' },
];

export default function Investors() {
  const marqueeLogos = [...INVESTOR_LOGOS, ...INVESTOR_LOGOS];

  return (
    <section className="section-pad investors3 framed" data-screen-label="Investors">
      <div className="amb">
        <div className="halfcircle drift" data-speed="0.16" style={{ width: 260, height: 260, left: -100, top: '10%' }} />
        <div className="halfcircle warm drift" data-speed="0.09" style={{ width: 220, height: 220, right: -80, bottom: -60 }} />
      </div>

      <div className="wrap">
        <div className="eyebrow-row reveal" style={{ justifyContent: 'center' }}>
          <span className="num">07</span>
          <span className="kicker">Backed by</span>
        </div>

        <h2 className="h-sec reveal" style={{ textAlign: 'center', marginInline: 'auto' }}>
          Trusted by the best <span className="accent-copper">investors.</span>
        </h2>

        <div className="inv4 reveal" aria-label="Our investors">
          <div className="inv4-track">
            {marqueeLogos.map((logo, index) => {
              const isDuplicate = index >= INVESTOR_LOGOS.length;

              return (
                <img
                  key={`${logo.src}-${index}`}
                  src={logo.src}
                  alt={isDuplicate ? '' : logo.alt}
                  aria-hidden={isDuplicate ? 'true' : undefined}
                  draggable="false"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

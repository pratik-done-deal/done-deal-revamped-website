import React from 'react';
import { cdnUrl } from '../config/cdn';

const photoGaurav = cdnUrl('gaurav.png');
const photoVinit = cdnUrl('vinit.png');
const photoDhrish = cdnUrl('dhrish.png');
const photoSagar = cdnUrl('sagar.png');
const photoDeepty = cdnUrl('deepty.png');
const photoDhairya = cdnUrl('dhairya.png');
const photoAneesh = cdnUrl("aneesh.png");
const photoRohit = cdnUrl("rohit.png");


const MAKERS = [
  { id: 'mk-1', sector: 'M&A Lead', photoSrc: photoAneesh, name: 'Aneesh Sivakumar', role: 'M&A Lead', linkedin: 'https://www.linkedin.com/in/aneesh-sivakumar/' },
  { id: 'mk-1', sector: 'M&A Lead', photoSrc: photoRohit, name: 'Rohit Raj', role: 'M&A Lead', linkedin: 'https://www.linkedin.com/in/rohitrajkaral/' },
  { id: 'mk-6', sector: 'M&A', photoSrc: photoDhairya, name: 'Dhairya Borar', role: 'M&A Lead', linkedin: "https://www.linkedin.com/in/dhairya-borar/" },
  { id: 'mk-1', sector: 'Media', photoSrc: photoGaurav, name: 'Gaurav Jha', role: 'Lead, Media | Consumer | F&B', linkedin: 'https://www.linkedin.com/in/gaurav-jha1910' },
  { id: 'mk-4', sector: 'Fintech', photoSrc: photoSagar, name: 'Sagar Parekh', role: 'Lead, Fintech | Logistics | ESG', linkedin: 'https://www.linkedin.com/in/parekh-sagar/' },
  { id: 'mk-3', sector: 'Edtech', photoSrc: photoDhrish, name: 'Dhrish Saggi', role: 'Lead, Edtech | IT Services | SaaS', linkedin: 'https://www.linkedin.com/in/dhrishsaggi/' },
  { id: 'mk-2', sector: 'Logistics', photoSrc: photoVinit, name: 'Vinit Jain', role: 'Lead, Logistics | Consumer', linkedin: 'https://www.linkedin.com/in/win-it-jain' },
  { id: 'mk-5', sector: 'Fundraising', photoSrc: photoDeepty, name: 'Deepty Chopra', role: 'Lead, Fundraising', linkedin: 'https://www.linkedin.com/in/deepty-chopra/' },
];

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.8A5.8 5.8 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" rx="0.8" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function DealMakers() {
  return (
    <section className="makers-h" id="makers" data-screen-label="Deal makers">
      <div className="makers-sticky">
        <div className="amb">
          <div className="glow p" style={{ width: '560px', height: '460px', left: '-6%', top: '8%', opacity: 0.18 }} />
          <div className="halfcircle warm drift" data-speed="0.14" style={{ width: '300px', height: '300px', right: '-120px', top: '14%' }} />
          <div className="bigicon drift" data-speed="0.05" style={{ width: '430px', height: '430px', left: '-90px', bottom: '-80px' }}>
            <svg viewBox="0 0 24 24"><use href="#ic-users" /></svg>
          </div>
        </div>
        <div className="makers-head wrap">
          <div className="eyebrow-row reveal">
            <span className="num">02</span>
            <span className="kicker">The bankers · Sector specialists</span>
            <span className="ln" />
          </div>
          <div className="makers-headrow reveal">
            <h2 className="h-sec">Meet your <span className="accent-copper">Deal Makers.</span></h2>
          </div>
        </div>
        <div className="makers-viewport">
          <div className="makers-track">
            {MAKERS.map((m) => (
              <div className="maker-card" key={m.id}>
                <div className="mph">
                  <image-slot id={m.id} shape="rect" fit="cover" src={m.photoSrc}></image-slot>
                  <div className="mscrim" />
                  <span className="mph-sector">{m.sector}</span>
                  {m.linkedin && (
                    <a className="mln" href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                      <LinkedInGlyph />
                    </a>
                  )}
                </div>
                <div className="mn">{m.name}</div>
                <div className="mr">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="makers-progress"><i id="makers-bar" /></div>
      </div>
    </section>
  );
}

import React from 'react';

const HTML_DEFAULT = "\n  <a class=\"btn btn-primary\" href=\"#\">Get started</a>\n  <span class=\"micro\">Know your number before anyone else does.</span>\n";
const HTML_LIGHT = "\n  <a class=\"btn btn-primary\" href=\"#\">Start confidentially</a>\n  <span class=\"micro\">Stealth profile first — your name stays yours.</span>\n";

// The homepage ships two CTA bands: the visible dark one after Investors,
// and a light variant (hidden by default) inside the lightwell band.
export default function CtaBand({ variant = 'default', hidden = false }) {
  const light = variant === 'light';
  return (
    <section
      className={light ? 'cta-band on-light' : 'cta-band'}
      data-screen-label="CTA"
      style={hidden ? { display: 'none' } : undefined}
      dangerouslySetInnerHTML={{ __html: light ? HTML_LIGHT : HTML_DEFAULT }}
    />
  );
}

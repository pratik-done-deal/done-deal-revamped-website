import React, { useEffect, useRef } from 'react';
import useNav from '../hooks/useNav';

const HEADER_HTML = "\n  <a class=\"brand\" href=\"DoneDeal-Homepage.html\"><img class=\"brand-logo\" src=\"/assets/06a40a90a90f.svg\" alt=\"done.deals\"></a>\n  <nav class=\"nav-links\">\n    <a href=\"DoneDeal-Investors.html\">For investors</a>\n    <a href=\"DoneDeal-Mandates.html\">Mandates</a>\n    <a href=\"DoneDeal-FAQ.html\">FAQ</a>\n    <a href=\"DoneDeal-Blog.html\">Blog</a>\n  </nav>\n  <a class=\"nav-cta\" href=\"https://www.done.deals/get-started\">Get started</a>\n  <button class=\"dd-burger\" id=\"ddBurger\" aria-label=\"Open menu\" aria-expanded=\"false\"><span></span><span></span><span></span></button>\n";
const MOBNAV_HTML = "<nav class=\"dd-mobnav\" id=\"ddMobNav\" aria-label=\"Mobile navigation\">\n  <div class=\"dd-mn-top\">\n    <a class=\"dd-mn-brand\" href=\"DoneDeal-Homepage.html\"><img class=\"brand-logo\" src=\"/assets/06a40a90a90f.svg\" alt=\"done.deals\"></a>\n    <button class=\"dd-mn-close\" id=\"ddNavClose\" aria-label=\"Close menu\"><svg viewBox=\"0 0 24 24\" width=\"26\" height=\"26\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 6l12 12M18 6L6 18\"></path></svg></button>\n  </div>\n  <a class=\"dd-mn-link\" href=\"DoneDeal-Investors.html\">For investors</a>\n  <a class=\"dd-mn-link\" href=\"DoneDeal-Mandates.html\">Mandates</a>\n  <a class=\"dd-mn-link\" href=\"DoneDeal-FAQ.html\">FAQ</a>\n  <a class=\"dd-mn-link\" href=\"DoneDeal-Blog.html\">Blog</a>\n  <a class=\"dd-mn-cta\" href=\"https://www.done.deals/get-started\">Get started</a>\n</nav>";

// href on the live site -> route path, so the active link can be highlighted
const HREF_FOR = {
  investors: 'DoneDeal-Investors.html',
  mandates: 'DoneDeal-Mandates.html',
  faq: 'DoneDeal-FAQ.html',
  blog: 'DoneDeal-Blog.html',
};

export default function Nav({ current }) {
  const headerRef = useRef(null);
  useNav();
  useEffect(() => {
    const href = HREF_FOR[current];
    if (!href || !headerRef.current) return;
    const link = headerRef.current.querySelector('a[href="' + href + '"]');
    if (link) link.style.color = 'var(--purple)';
  }, [current]);
  return (
    <>
      <header className="topnav" id="topnav" ref={headerRef} dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
      <div dangerouslySetInnerHTML={{ __html: MOBNAV_HTML }} />
    </>
  );
}

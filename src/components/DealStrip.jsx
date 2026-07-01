import React from 'react';

const HTML = "\n  <div class=\"strip-inner\">\n    <div class=\"strip-pill\"><span class=\"live-dot\"></span><span>30 done deals · live</span></div>\n    <div class=\"marquee\">\n      <div class=\"marquee-track\" id=\"marquee-track\">\n        <span class=\"deal-tick\"><span class=\"nm\">ORBO × Niyogin</span><span class=\"sep\">·</span><span class=\"mt\">SaaS / AI · 14w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">Trase × Upscalio</span><span class=\"sep\">·</span><span class=\"mt\">D2C · 9w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">Zymrat × Stylcheck</span><span class=\"sep\">·</span><span class=\"mt\">Consumer · 12w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">WLDD × ScoopWhoop</span><span class=\"sep\">·</span><span class=\"mt\">Media · 11w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">Heritage × Get-A-Way</span><span class=\"sep\">·</span><span class=\"mt\">Foods · 8w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">The Soap Co.</span><span class=\"sep\">·</span><span class=\"mt\">D2C · 6w</span></span>\n        <span class=\"deal-tick\"><span class=\"nm\">Ledgerly</span><span class=\"sep\">·</span><span class=\"mt\">Fintech · 5w</span></span>\n      </div>\n    </div>\n  </div>\n";

export default function DealStrip() {
  return (
    <section className="strip" data-screen-label="Live deals" dangerouslySetInnerHTML={{ __html: HTML }} />
  );
}

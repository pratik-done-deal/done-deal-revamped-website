import React from 'react';

/**
 * Done Deal icon set — minimal, purpose-driven, stroke-based (1.5–2px,
 * rounded caps) to match the brand. Most icons in the page markup are authored
 * inline; these React components are here for new JSX you build on top.
 */

const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
};

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);

export const Lock = (p) => (
  <svg {...base} {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);

export const Plus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
);

export const Refresh = (p) => (
  <svg {...base} {...p}><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></svg>
);

export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const Linkedin = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" /></svg>
);

export const Twitter = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.5 3h3l-7 8 8.5 10h-6.5l-5-6-5.5 6H1l7.5-8.5L0 3h6.7l4.4 5.4L17.5 3zm-1.2 16h1.8L7.8 4.8H5.9L16.3 19z" />
  </svg>
);

export default { ArrowRight, Mail, Lock, Plus, Refresh, Close, Linkedin, Twitter };

import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import './lib/imageSlot.js'; // registers the <image-slot> web component
import './index.css';
import App from './App.jsx';
import { POSTHOG_KEY, POSTHOG_HOST } from './config/posthog';

// No key configured (e.g. local dev without .env set up) — leave the SDK
// uninitialized. trackEvent's `posthog?.capture` calls become safe no-ops.
if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    debug: false,
  });
}

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <PostHogProvider client={posthog}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostHogProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Prerendered routes ship with content already in #root — hydrate those.
// The dev server (`npm run dev`) serves an empty #root, so fall back to a
// plain client render there.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

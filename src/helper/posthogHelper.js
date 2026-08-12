import posthog from 'posthog-js';
import { POSTHOG_DEBUG_MODE } from '../config/posthog';

// Properties every event should carry. This site has no login/user state of
// its own (accounts live on app.done.deals) — path and any incoming
// utm_source are the only "always useful" context we have.
function commonProperties() {
  if (typeof window === 'undefined') return {};
  return {
    path: window.location.pathname,
    utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
  };
}

export function trackEvent(eventName, properties = {}) {
  const payload = { ...commonProperties(), ...properties };

  if (POSTHOG_DEBUG_MODE) {
    console.log(`[posthog] ${eventName}`, payload);
  }

  posthog?.capture(eventName, payload);
}

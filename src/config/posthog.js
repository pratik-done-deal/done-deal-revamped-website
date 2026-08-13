const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';

export const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || '';

export const POSTHOG_HOST = (
  import.meta.env.VITE_POSTHOG_HOST || DEFAULT_POSTHOG_HOST
).replace(/\/+$/, '');

// On for local dev, or wherever VITE_POSTHOG_DEBUG is explicitly set (e.g.
// staging builds) — off in production by default. Only gates the console
// logging in posthogHelper, not the SDK's own `debug` init option.
export const POSTHOG_DEBUG_MODE = false;

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../helper/posthogHelper';
import { POSTHOG_EVENTS } from '../constants/posthogEvents';

/**
 * Hook to track how far down a page or container the user has scrolled.
 * Fires a tracking event on unmount (page exit / route change) with the
 * maximum scroll percentage reached during the session.
 *
 * @param {string} pageName - Name of the page for tracking purposes
 * @param {React.RefObject} [containerRef] - Optional ref to track how much of a specific
 *   element has been scrolled into the viewport. If omitted, tracks the main page scroll.
 */
export default function useScrollPercentageTracker(pageName, containerRef) {
  const location = useLocation();
  const maxScrollPercentRef = useRef(0);

  useEffect(() => {
    maxScrollPercentRef.current = 0;
    let hasFired100Percent = false;

    const measure = (target) => {
      let percent = 0;

      if (containerRef && containerRef.current) {
        // Track how much of this specific element has been scrolled into view
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.height <= viewportHeight) {
          // Element entirely fits on screen
          percent = 100;
        } else {
          // How many pixels of the element have scrolled above the top of the viewport
          const scrolledPastTop = Math.max(0, -rect.top);

          // The maximum distance we can scroll this element before its bottom hits the bottom of the viewport
          const totalScrollable = rect.height - viewportHeight;

          percent = totalScrollable > 0 ? (scrolledPastTop / totalScrollable) * 100 : 100;
        }
      } else {
        const el = target === document ? document.documentElement : target;

        // Skip invalid targets or elements that aren't scroll containers
        if (!el || typeof el.scrollTop === 'undefined' || el.clientHeight === 0) return;

        const scrollable = el.scrollHeight - el.clientHeight;

        // Only elements that are actually major layout sections (meaningful scrollable
        // height, taking up most of the screen) should be able to drive page scroll depth —
        // this keeps small interior containers (e.g. a dropdown) from overwriting it.
        if (scrollable > window.innerHeight * 0.5 && el.clientHeight >= window.innerHeight * 0.5) {
          percent = (el.scrollTop / scrollable) * 100;
        } else {
          return;
        }
      }

      // Clamp between 0 and 100
      percent = Math.max(0, Math.min(100, percent));

      if (percent > maxScrollPercentRef.current) {
        maxScrollPercentRef.current = percent;
      }

      // Fire a 'scroll completed' event only the first time the user reaches 100%
      if (Math.round(percent) === 100 && !hasFired100Percent) {
        hasFired100Percent = true;
        trackEvent(POSTHOG_EVENTS.SCROLL_TRACKING.WEBSITE_SCROLL_COMPLETED, {
          page: pageName,
        });
      }
    };

    // Scroll fires far more often than the display can paint, and measuring involves
    // layout reads (scrollHeight/getBoundingClientRect). Batch to one measurement per
    // animation frame so this doesn't force synchronous reflow on every scroll tick.
    let ticking = false;
    let pendingTarget = document;
    let rafId = null;
    const handleScroll = (event) => {
      pendingTarget = event.target;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          ticking = false;
          rafId = null;
          measure(pendingTarget);
        });
      }
    };

    // capture: true catches scroll events from any layout wrapper that handles page scrolling
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });

    // Also run once on mount in case the user never scrolls but the page already fits on screen
    measure(document);

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      if (rafId !== null) cancelAnimationFrame(rafId);

      const maxPercent = Math.min(100, Math.round(maxScrollPercentRef.current));
      if (maxPercent <= 0) return;

      trackEvent(POSTHOG_EVENTS.SCROLL_TRACKING.WEBSITE_PAGE_SCROLL_DEPTH, {
        page: pageName,
        maxScrollPercent: maxPercent,
      });
    };
  }, [location.pathname, pageName, containerRef]);
}

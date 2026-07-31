import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import { EVENTS } from "@/config/analytics";
import { initAnalytics, trackEvent, trackPageview } from "@/lib/analytics";

/**
 * Mount once in __root.tsx. Boots GA4 + Clarity and reports a pageview on every
 * client-side route change (a single-page app fires only one real page load, so
 * without this every visit looks like it landed on "/" and never moved).
 */
export function Analytics() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    initAnalytics();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent(EVENTS.clickCall);
      } else if (href.startsWith("sms:")) {
        trackEvent(EVENTS.clickText);
      } else {
        const url = new URL(anchor.href, window.location.href);
        if (
          url.hostname.endsWith("google.com") &&
          url.pathname.startsWith("/maps/dir")
        ) {
          trackEvent(EVENTS.clickDirections);
        }
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // Let the route's <Seo> effect set document.title first.
    const id = window.setTimeout(() => trackPageview(pathname), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

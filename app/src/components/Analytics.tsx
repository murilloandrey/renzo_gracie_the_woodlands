import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import { initAnalytics, trackPageview } from "@/lib/analytics";

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

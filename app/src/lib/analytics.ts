/**
 * GA4 + Microsoft Clarity loader.
 *
 * Scripts are injected at runtime rather than hardcoded in index.html so that
 * nothing loads in dev, on preview deploys, or when an ID is not configured.
 *
 * PRIVACY NOTE: Clarity records sessions. Anything a visitor types into the free
 * trial form — their name, their child's name, a phone number — must be masked
 * before it reaches the recording. See maskSensitiveInputs() below and the
 * data-clarity-mask attributes on the form.
 */

import {
  ANALYTICS_ENABLED,
  CLARITY_PROJECT_ID,
  GA_MEASUREMENT_ID,
  type EventName,
} from "@/config/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

let initialized = false;

function loadScript(src: string, async = true): void {
  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
}

function initGA(): void {
  if (!GA_MEASUREMENT_ID) return;

  loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
  );

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    // We send pageviews manually on route change — this is a single-page app,
    // so the automatic one would only ever fire once.
    send_page_view: false,
    anonymize_ip: true,
  });
}

function initClarity(): void {
  if (!CLARITY_PROJECT_ID) return;

  window.clarity =
    window.clarity ||
    function clarity(...args: unknown[]) {
      (window.clarity as unknown as { q?: unknown[] }).q =
        (window.clarity as unknown as { q?: unknown[] }).q || [];
      (window.clarity as unknown as { q: unknown[] }).q.push(args);
    };

  loadScript(`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`);
}

export function initAnalytics(): void {
  if (initialized || !ANALYTICS_ENABLED) return;
  initialized = true;
  initGA();
  initClarity();
}

export function trackPageview(path: string, title = document.title): void {
  if (!ANALYTICS_ENABLED) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/**
 * Fire a named event. Keep the payload small and free of anything personal —
 * never pass an email address, phone number or name.
 */
export function trackEvent(
  name: EventName,
  params: Record<string, string | number> = {},
): void {
  if (!ANALYTICS_ENABLED) {
    if (import.meta.env.DEV) console.debug("[analytics]", name, params);
    return;
  }
  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}

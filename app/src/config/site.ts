/**
 * Canonical origin for the site.
 *
 * Sourced from VITE_SITE_URL, which is set per-environment in Vercel
 * (Production / Preview / Development). Falls back to the current origin so a
 * missing variable degrades gracefully instead of emitting the literal string
 * "undefined" into canonical URLs and social card tags.
 *
 * Update the Vercel variable — not this file — when the custom domain goes live.
 */
const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (
  fromEnv && fromEnv !== "undefined"
    ? fromEnv
    : typeof window !== "undefined"
      ? window.location.origin
      : ""
).replace(/\/$/, "");

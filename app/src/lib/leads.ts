/**
 * Lead capture -> Supabase.
 *
 * Deliberately uses plain fetch against the PostgREST endpoint rather than
 * @supabase/supabase-js. One insert does not justify ~40kb of client bundle on
 * a landing page. Pull in the SDK in phase 2, when admin auth and realtime
 * schedule editing actually need it.
 *
 * The anon key is publishable and is expected to ship in the bundle. Safety
 * comes from RLS (insert-only, no select) — see supabase/001_leads.sql.
 * A service-role key must NEVER appear in this file or any VITE_ variable.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  string | undefined;

export const leadCaptureConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export type LeadInput = {
  email: string;
  name?: string;
  phone?: string;
  source: string;
  offerCode: string;
};

export type LeadResult =
  | { ok: true; duplicate: boolean }
  | {
      ok: false;
      reason: "invalid-email" | "not-configured" | "network" | "server";
    };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim()) && value.trim().length <= 254;
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const email = input.email.trim().toLowerCase();

  if (!isValidEmail(email)) return { ok: false, reason: "invalid-email" };

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Loud in dev, silent in production — a misconfigured deploy should not
    // throw in a visitor's face, but you should never ship without noticing.
    if (import.meta.env.DEV) {
      console.error(
        "[leads] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Lead was NOT saved.",
      );
    }
    return { ok: false, reason: "not-configured" };
  }

  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        name: input.name?.trim() || null,
        phone: input.phone?.trim() || null,
        source: input.source,
        offer_code: input.offerCode,
        page_path:
          typeof window !== "undefined" ? window.location.pathname : null,
      }),
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  // 409 = the unique index rejected a repeat email for this source.
  // They already signed up. Show them success; don't make them feel punished.
  if (response.status === 409) return { ok: true, duplicate: true };

  if (!response.ok) return { ok: false, reason: "server" };

  return { ok: true, duplicate: false };
}

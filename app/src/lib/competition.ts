/**
 * Competition team — upcoming tournaments and recent podium results.
 *
 * BOTH ARRAYS SHIP EMPTY ON PURPOSE. The section renders nothing until there is
 * real data, so an unfilled section can never appear on the live site.
 *
 * Do not invent results. These are real athletes with real records; a made-up
 * placement is the kind of thing that ends a client relationship. Get the list
 * from the academy — "send me your team's last few tournament results and what
 * you're signed up for next" is a good thing to ask in the meeting, and the
 * fact that this changes every month is exactly why it belongs in the retainer.
 *
 * Phase 2: replace these constants with a Supabase fetch. Nothing else changes.
 */

export type Tournament = {
  /** "IBJJF Houston International Open" */
  name: string;
  /** "IBJJF" | "NAGA" | "Grappling Industries" | "Fuji" ... */
  org: string;
  /** ISO date, gym-local. "2026-09-12" */
  date: string;
  /** "Houston, TX" */
  city: string;
  /** Registration or event info page. */
  url?: string;
  /** Optional one-liner: "Team travels together — carpool from the academy." */
  note?: string;
};

export type Placement = 1 | 2 | 3;

export type Result = {
  athlete: string;
  placement: Placement;
  /** "Blue Belt Adult Middleweight" */
  division: string;
  /** Event name. */
  event: string;
  /** ISO date. */
  date: string;
};

/**
 * Example shape — delete the comment markers and replace with real events.
 *
 * export const TOURNAMENTS: Tournament[] = [
 *   {
 *     name: "IBJJF Houston International Open",
 *     org: "IBJJF",
 *     date: "2026-09-12",
 *     city: "Houston, TX",
 *     url: "https://ibjjf.com/events",
 *     note: "Team travels together — carpool from the academy.",
 *   },
 * ];
 */
export const TOURNAMENTS: Tournament[] = [];

export const RESULTS: Result[] = [];

const PLACEMENT_LABELS: Record<Placement, string> = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

export function placementLabel(placement: Placement): string {
  return PLACEMENT_LABELS[placement];
}

/** Parsed as local midnight so a same-day event still counts as upcoming. */
function toDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function formatEventDate(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Tournaments still ahead of us, soonest first.
 * Past-dated events drop out automatically — a stale "upcoming" tournament from
 * last month is worse than showing nothing at all.
 */
export function upcomingTournaments(
  now: Date = new Date(),
  limit = 3,
): Tournament[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return TOURNAMENTS.filter((event) => toDate(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

/** Most recent podiums first. */
export function recentResults(limit = 6): Result[] {
  return [...RESULTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function hasCompetitionContent(now: Date = new Date()): boolean {
  return upcomingTournaments(now).length > 0 || RESULTS.length > 0;
}

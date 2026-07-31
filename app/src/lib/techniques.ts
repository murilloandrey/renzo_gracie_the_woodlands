/**
 * "How We Teach" — a small library of fundamental techniques.
 *
 * The point of this section is not to teach jiu-jitsu on a marketing page. It is
 * to let a nervous beginner see that instruction here is structured and named,
 * and to give a curious visitor something concrete to recognise when they walk in.
 *
 * Each entry can carry a YouTube video ID from the academy's own channel. Cards
 * without a video still render — they just show the written breakdown. Swapping
 * the featured technique each month is a natural retainer task.
 *
 * These are universally taught BJJ fundamentals; the descriptions are generic and
 * true of any well-run academy. Do not add claims about this specific gym's
 * curriculum that the coaches have not confirmed.
 */

export type Level = "Day one" | "White belt" | "Blue belt and up";

export type Technique = {
  /** Common English name. */
  name: string;
  /** Traditional or alternate name, if it has one. */
  altName?: string;
  /** "Submission" | "Position" | "Escape" | "Sweep" */
  category: string;
  /** When a student typically meets this. */
  level: Level;
  /** One or two sentences. What it is and, more importantly, what it teaches. */
  summary: string;
  /** YouTube video ID from the academy's channel. Empty = no embed. */
  videoId?: string;
};

export const TECHNIQUES: Technique[] = [
  {
    name: "Americana",
    altName: "Keylock",
    category: "Submission",
    level: "Day one",
    summary:
      "A shoulder lock applied from side control. It is usually the first submission a new student learns, because it teaches the thing everything else depends on: control the position first, finish second.",
  },
  {
    name: "Armbar from Guard",
    altName: "Juji-gatame",
    category: "Submission",
    level: "White belt",
    summary:
      "Attacking the elbow joint from the bottom. New students learn it slowly and with a partner who is taught to feel the tap coming — it is the standard lesson in how leverage beats strength.",
  },
  {
    name: "Bridge and Roll",
    altName: "Upa",
    category: "Escape",
    level: "Day one",
    summary:
      "The first escape everyone learns: how to get out from underneath someone bigger. Most beginners find this more useful in the first month than any submission.",
  },
  {
    name: "Rear Naked Choke",
    altName: "Mata leão",
    category: "Submission",
    level: "White belt",
    summary:
      "A blood choke from back control. Taught with an emphasis on tapping early and releasing instantly — the etiquette around it matters more than the mechanics.",
  },
];

/** The one currently featured, if any card carries a video. */
export function featuredTechnique(): Technique | null {
  return TECHNIQUES.find((technique) => Boolean(technique.videoId)) ?? null;
}

export function hasTechniques(): boolean {
  return TECHNIQUES.length > 0;
}

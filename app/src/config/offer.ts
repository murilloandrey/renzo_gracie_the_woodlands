/**
 * The lead-magnet offer shown in the popup.
 *
 * IMPORTANT: a discount is the gym's money, not yours. Do not enable an offer
 * the owner has not agreed to. The default below is the 3-day free trial he
 * already gives everyone, so it is true on day one and needs no approval.
 *
 * When he approves the 15% discount, change ACTIVE_OFFER to "first-month-15"
 * and redeploy. That is the only edit required.
 */

export type Offer = {
  /** Stored on the lead row so you can measure offers against each other. */
  code: string;
  /** Big line in the popup. */
  headline: string;
  /** Supporting line. */
  body: string;
  /** Button label. */
  cta: string;
  /** Shown on the success screen after they submit. */
  successHeadline: string;
  successBody: string;
  /** Small print under the form. Keep it honest. */
  finePrint: string;
};

export const OFFERS = {
  /**
   * Default. Reflects what the academy actually offers today.
   * The site currently says "free trial class" in most places — it is three
   * full days, which is a materially better offer. Say so.
   */
  "free-3-day": {
    code: "free-3-day",
    headline: "Train free for 3 days",
    body: "Not one class — three full days on the mats. Any program, any schedule. Drop your email and we'll set it up.",
    cta: "Claim my 3 days",
    successHeadline: "You're in.",
    successBody:
      "Check your inbox — we'll confirm your first class and what to bring. Prefer to just show up? Text (832) 584-0565 and we'll sort it out.",
    finePrint:
      "New students only. No card required. We'll never share your email.",
  },

  /**
   * Needs the owner's sign-off before this goes live.
   */
  "first-month-15": {
    code: "first-month-15",
    headline: "15% off your first month",
    body: "Start with 3 free days, then take 15% off your first month when you join. Drop your email and we'll send your code.",
    cta: "Send my code",
    successHeadline: "Code on the way.",
    successBody:
      "Check your inbox. Bring it up at the front desk when you sign up and we'll apply it.",
    finePrint:
      "New students only. Applies to the first month of a new membership. Cannot be combined with other offers.",
  },
} as const satisfies Record<string, Offer>;

export type OfferCode = keyof typeof OFFERS;

/** Flip this to "first-month-15" once the owner approves the discount. */
export const ACTIVE_OFFER: OfferCode = "free-3-day";

/** Master switch. Set false to disable the popup entirely without a code change. */
export const POPUP_ENABLED = true;

export const offer: Offer = OFFERS[ACTIVE_OFFER];

/** Popup behavior. */
export const POPUP_CONFIG = {
  /** Show after this many ms on the page. */
  dwellMs: 25_000,
  /** ...or after scrolling this fraction of the page, whichever comes first. */
  scrollFraction: 0.45,
  /** Desktop only: show when the pointer leaves through the top of the window. */
  exitIntent: true,
  /** Don't ask again for this many days after a dismiss. */
  dismissDays: 30,
  /** Never show on these paths — they're already converting or staff-only. */
  suppressOnPaths: ["/free-trial", "/admin"],
} as const;

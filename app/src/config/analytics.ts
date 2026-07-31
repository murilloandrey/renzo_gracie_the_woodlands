/**
 * Analytics configuration.
 *
 * Two tools, because they answer different questions:
 *   - GA4 (VITE_GA_MEASUREMENT_ID)   — how many, from where, did they convert
 *   - Clarity (VITE_CLARITY_PROJECT_ID) — heatmaps + session recordings: where
 *     they actually scrolled, tapped, and gave up
 *
 * Google Analytics does NOT produce heatmaps. Clarity is the one that does, and
 * it is free with no traffic cap.
 *
 * Both are optional. If an ID is missing, that tool simply never loads.
 */

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ??
  "") as string;
export const CLARITY_PROJECT_ID = (import.meta.env.VITE_CLARITY_PROJECT_ID ??
  "") as string;

/**
 * Never load trackers in dev or on preview deploys — otherwise your own
 * clicking through the site pollutes the client's numbers, and Clarity burns
 * recordings on you instead of real visitors.
 */
export const ANALYTICS_ENABLED =
  import.meta.env.PROD &&
  (Boolean(GA_MEASUREMENT_ID) || Boolean(CLARITY_PROJECT_ID));

/**
 * Events worth having on a gym site. Keep this list short and stable — a
 * hundred event names you never look at is worse than six you check weekly.
 */
export const EVENTS = {
  leadPopupShown: "lead_popup_shown",
  leadSubmitted: "lead_submitted",
  trialFormStarted: "trial_form_started",
  trialFormSubmitted: "trial_form_submitted",
  clickCall: "click_call",
  clickText: "click_text",
  clickDirections: "click_directions",
  scheduleFiltered: "schedule_filtered",
  techniqueVideoPlayed: "technique_video_played",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

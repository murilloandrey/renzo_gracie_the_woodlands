/**
 * Every outbound link in one place, so the gym can change a URL without
 * touching a component.
 */

export const PHONE_DISPLAY = "(832) 584-0565";
export const PHONE_E164 = "+18325840565";

export const TEL_URL = `tel:${PHONE_E164}`;

/** Pre-filled text. SMS deep links convert far better than forms for gyms. */
export const SMS_URL = `sms:${PHONE_E164}?&body=${encodeURIComponent(
  "Hi! I'd like to book a free trial class.",
)}`;

export const EMAIL_URL = "mailto:info@renzograciethewoodlands.com";

export const INSTAGRAM_URL = "https://instagram.com/renzo_gracie_the_woodlands";
export const FACEBOOK_URL = "https://facebook.com/renzograciethewoodlands1";
export const YOUTUBE_URL =
  "https://www.youtube.com/channel/UCOLzhYYnoYRtR_HPvRLXD3Q";

export const GEAR_URL =
  "https://www.breakpointfc.com/collections/renzo-gracie-the-woodlands";

export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=9391+Grogans+Mill+Rd+Ste+B12+The+Woodlands+TX";

/**
 * Zen Planner member portal.
 *
 * Every gym gets its own portal URL — zenplanner.com's marketing site will NOT
 * log a member in. Ask the owner to send you the exact link his members use
 * (Zen Planner staff console -> Setup -> Member Portal, or the link in the
 * welcome email he sends new members). It usually looks like:
 *
 *   https://studio.zenplanner.com/zenplanner/portal/login.cfm?...
 *   https://<gym-partition>.zenplanner.com/...
 *
 * Leave this as an empty string until you have the real URL. The Member Login
 * link renders as a "Coming soon"-free fallback rather than a dead `#`.
 */
export const MEMBER_PORTAL_URL = "";

/** Zen Planner's member-facing apps, useful as a secondary link. */
export const MEMBER_APP_IOS =
  "https://apps.apple.com/us/app/zen-planner-member-app/id1065000091";
export const MEMBER_APP_ANDROID =
  "https://play.google.com/store/apps/details?id=com.zenplanner.member";

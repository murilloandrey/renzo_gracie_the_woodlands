/**
 * Every outbound link in one place, so the gym can change a URL without
 * touching a component.
 */

export const PHONE_DISPLAY = "(832) 584-0565";
export const PHONE_E164 = "+18325840565";

export const TEL_URL = `tel:${PHONE_E164}`;

/** Pre-filled text. SMS deep links convert far better than forms for gyms. */
export const SMS_URL = `sms:${PHONE_E164}?&body=${encodeURIComponent(
  "Hi! I'd like to claim three free training days.",
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

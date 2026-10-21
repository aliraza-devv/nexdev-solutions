// Shared by the inline consent-default script in app/layout.js (which runs
// before GTM) and the CookieConsent banner, so both always read and write the
// same localStorage key.
export const CONSENT_STORAGE_KEY = "nexdev_consent_v1";

// Dispatched on window by the footer "Cookie settings" link; the banner
// listens for it and reopens.
export const OPEN_COOKIE_SETTINGS_EVENT = "nexdev:open-cookie-settings";

export interface StoredConsent {
  v: 1;
  analytics: boolean;
  ts: number;
}

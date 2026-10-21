// Shared by the inline consent-default script in app/layout.js (which runs
// before GTM) and the CookieConsent banner, so both always read and write the
// same localStorage key.
export const CONSENT_STORAGE_KEY = "nexdev_consent_v1";

// Dispatched on window by the footer "Cookie settings" link; the banner
// listens for it and reopens.
export const OPEN_COOKIE_SETTINGS_EVENT = "nexdev:open-cookie-settings";

// Pushed to the dataLayer when a visitor clicks Accept. GTM does not re-run tags it
// already blocked for lack of consent when consent is updated later, so this is the
// extra trigger for GA4 Config and Clarity Base on a first-visit Accept.
export const CONSENT_GRANTED_EVENT = "consent_granted";

export interface StoredConsent {
  v: 1;
  analytics: boolean;
  ts: number;
}

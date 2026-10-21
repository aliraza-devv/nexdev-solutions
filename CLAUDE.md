# Project rules

## Consent and tracking

- consent_granted is pushed only by the tagsStartedRef guard in CookieConsent.tsx. Never push it from anywhere else, because GTM's Google tag and Clarity template cannot enforce once-per-page, so a second push would double-fire both tags.

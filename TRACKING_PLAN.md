# Tracking plan

All events are pushed to `window.dataLayer` by [`public/tracking.js`](public/tracking.js),
loaded on every page from `src/app/layout.js`. GTM (`GTM-KS6ZXGGR`) turns them into GA4
and Clarity tags. The file uses event delegation only (two document listeners, no
per-element listeners).

GTM and the consent defaults are described at the bottom.

## Events

| Event | Trigger | Parameters |
|---|---|---|
| `cta_click` | Click on any element inside `[data-track="cta"]` | `cta_text`, `cta_location` |
| `nav_click` | Click on any element inside `[data-track="nav"]` (main navigation, desktop and mobile drawer) | `link_text` |
| `form_start` | First focus or click inside `[data-track-form="<name>"]`, once per form per page load | `form_name` |
| `generate_lead` | Confirmed success only (see below). At most once per `lead_type` per page load. Also calls `clarity("event", "generate_lead")` | `form_name`, `lead_type` |
| `booking_click` | Click on a link to `cal.com` or `calendly.com`, or any link with `data-track="booking"`. Also calls `clarity("event", "booking_click")` | `click_location` |
| `whatsapp_click` | Click on a link to `wa.me`, `api.whatsapp.com` or `web.whatsapp.com` | `click_location` |
| `email_click` | Click on a `mailto:` link | `click_location` |
| `phone_click` | Click on a `tel:` link | `click_location` |
| `qualify_complete` | Legacy. The `/qualify` questionnaire was submitted and the server answered OK. `/qualify` now redirects to `/book-call`, so this no longer fires; the code is kept | `qualified` (true or false) |

`clarity(...)` is only called when `typeof window.clarity === "function"`, inside a
try/catch.

### Parameters

| Parameter | Values |
|---|---|
| `cta_text` | The button label, trimmed to 60 characters. From `data-track-text` if present, otherwise the element text. |
| `cta_location` | From `data-track-location`. Values in use: `nav`, `nav_mobile`, `hero`, `results`, `calculator`, `calculator_sticky`, `deliverables`, `why_us`, `final_cta`, `case_study_hero`. Falls back to `footer`, `nav` or `page` from the DOM when missing. |
| `link_text` | The nav link label (Results, The Math, How It Works, FAQs), trimmed to 60 characters. |
| `form_name` | `book_call` or `review_request` (`qualify` is legacy). Any `[a-z0-9_]` identifier up to 40 characters is accepted, so a future form needs only the attribute. |
| `lead_type` | `nurture` (the "quick website review by email" box on `/book-call` submitted) or `booked_call` (Cal.com booking confirmed). |
| `click_location` | Same values as `cta_location`, with the same DOM fallback. |
| `qualified` | Boolean verdict from `/api/qualify`. The answers themselves are never sent. |

### Where `generate_lead` fires

The site has no contact page (`/contact` is a "coming soon" page). The two confirmed lead
moments are:

| `lead_type` | `form_name` | Fires when | Source |
|---|---|---|---|
| `nurture` | `review_request` | A visitor submits the "quick website review by email" box under the calendar and `/api/lead` returns OK | `src/app/book-call/ReviewRequest.tsx` |
| `booked_call` | `book_call` | Cal.com reports `bookingSuccessfulV2` or the older `bookingSuccessful` (whichever arrives first; a guard handles it once) | `src/app/book-call/page.tsx`, the Cal callback, just before the redirect to `/book-call/confirmed` |

Both go through `src/lib/track.ts`, which dispatches a `nexdev:generate_lead` window event
that `tracking.js` turns into the push. A failed request never reaches that call.

## Privacy rules

- Never sent: names, email addresses, phone numbers, message text, questionnaire answers,
  link targets (so no `mailto:` address, no `tel:` number, no WhatsApp number).
- `tracking.js` never reads an input's value.
- Every value is trimmed to 60 characters, and any value that looks like an email address
  or contains a run of 7 or more digits is dropped.
- `src/lib/track.ts` types its arguments as fixed string unions, so free text cannot be
  passed through by mistake.
- The review-by-email box sends the email address and optional WhatsApp number only to
  `/api/lead` (our own server), which forwards them to the owner's inbox. Nothing from the
  box reaches `dataLayer`, GA4 or Clarity, and the API route never logs the values.

## Tagged elements

| Attribute | File |
|---|---|
| `data-track="nav"` | `Navbar.tsx` (desktop links, mobile drawer links) |
| `cta` / `nav`, `nav_mobile` | `Navbar.tsx` |
| `cta` / `hero` | `Hero.tsx` |
| `cta` / `results` | `Results.tsx` |
| `cta` / `calculator`, `calculator_sticky` | `ConversionCalculator.tsx` |
| `cta` / `deliverables` | `Deliverables.tsx` |
| `cta` / `why_us` | `WhyUs.tsx` |
| `cta` / `final_cta` | `FinalCTA.tsx` |
| `cta` / `case_study_hero` | `case-studies/_components/CaseStudyTemplate.tsx` |
| `data-track-form="qualify"` | `qualify/page.tsx` (the card wrapping every step). Legacy: the page is redirected, so `form_start` no longer fires from it. The review-by-email box has no `data-track-form`, so it sends `generate_lead` only |

WhatsApp, email and phone clicks need no attributes: they are detected from the link
itself, anywhere on the site (footer, Privacy Policy, Terms).

To track a new CTA: add `data-track="cta"` and `data-track-location="<where>"` to the
link or button. Put them on the outer `<a>`, not on a button nested inside it.

## Notes

- Every CTA on the site now goes straight to `/book-call` (the qualification step was
  removed). `/qualify` redirects permanently (308) to `/book-call`; its page and
  `/api/qualify` code are kept so the change can be reverted by deleting one entry in
  `next.config.mjs`.
- Vercel Web Analytics custom events are not used: they need a Pro plan, and the project is
  on Hobby. Page views for `/book-call` (reached the calendar) and `/book-call/confirmed`
  (booking confirmed) already count visitors without cookies.
- `booking_click` currently has no live trigger: CTAs are normal links to `/book-call`, not
  to cal.com. It is ready for the day a direct Cal.com or Calendly link is added.
- `phone_click` has no live trigger today: the footer phone number is a WhatsApp link.
- `qualify_complete` is not a lead. It means the questionnaire was finished, whether or
  not the visitor qualified.

## GTM and consent

- GTM loads in production builds, or in development when `NEXT_PUBLIC_ENABLE_GTM=true` is set
  in `.env.local`. Without that flag, local development never reaches GA4 or Clarity.
- Consent Mode v2 defaults are set before GTM loads: `ad_storage`, `analytics_storage`,
  `ad_user_data` and `ad_personalization` start `denied`, `wait_for_update` is 500.
- Clicking Accept also pushes `{ event: "consent_granted" }` to the dataLayer. GTM does not
  re-run tags it blocked at load when consent is updated later, so this event is the extra
  trigger for `GA4 | Config.` and `Clarity | Base`. It is not sent to GA4. GTM has no
  once-per-page option on those two tag types, so the banner pushes it at most once per page
  and never when a saved Accept was restored at load (those tags already started from their
  normal triggers, because consent is granted before GTM loads).
- Clarity needs no separate consent call: it honours Google Consent Mode signals itself.
- Accept grants `analytics_storage` only. Reject keeps everything denied. Ad signals are
  never granted. The choice is stored in `localStorage` under `nexdev_consent_v1` and
  restored before GTM runs on every page load.
- [`gtm-events-import.json`](gtm-events-import.json) contains one Custom Event trigger,
  one GA4 Event tag (Google tag ID `G-ZHNHCL33GH`, `analytics_storage` consent required)
  and the Data Layer Variables for the events above. Names are prefixed `GA4 | Event | `.
  It does not include the GA4 Config or Clarity tags. Import it with Merge, never
  Overwrite.
- After importing, register `cta_text`, `cta_location`, `link_text`, `form_name`,
  `lead_type`, `click_location` and `qualified` as event-scoped custom dimensions in GA4,
  otherwise the parameters are collected but do not appear in reports. Mark
  `generate_lead` as a key event.
- If GA4 Enhanced Measurement "Form interactions" is on, GA4 also sends its own
  `form_start`, which would double count with ours. Turn that option off.
- Events are pushed to `dataLayer` whatever the consent state. What each tag does with
  them is controlled by the consent settings of the GA4 and Clarity tags inside the GTM
  container, so both tags need `analytics_storage` set as required consent there.

# Changelog

Conversion experiments on nexdevsolutions.net. Newest first. Each entry says what
changed, what we expect, and the one number that decides whether it worked.

## 2026-11-07: Fewer steps, workable call times, follow-up

### Why

In the 30 days to Nov 6, 404 people visited the home page, 45 opened `/qualify`, 11 reached
`/book-call` and 3 reached `/book-call/confirmed`. Cal.com showed 3 real bookings. Two
problems stood out: the calendar was open only 8 PM to midnight Pakistan time, and nobody
was followed up when they did not book.

### Changes

Cal.com ("Book Your Call", `discovery-call`):

- New schedule "Discovery call hours": Tuesday, Wednesday and Thursday, 7:00 to 10:00 PM,
  Asia/Karachi. Used only by this event (Strategy Call keeps its own hours).
- 60 minute slot interval, 15 minute buffer after each call, 12 hours minimum notice, at most
  2 bookings per day and 6 per week.
- Description now tells visitors in Australia and New Zealand to message on WhatsApp.
- Booking questions: what you need help with (required), budget (required), anything else
  (optional). Nobody is turned away on budget.

Website:

- The qualification step is gone. Every CTA goes straight to `/book-call`: the navigation
  button (desktop and mobile menu), hero, results, both calculator buttons, deliverables, why
  us, the final CTA and every case study page.
- `/qualify` redirects permanently to `/book-call`. The page and `/api/qualify` code are kept.
  To revert, delete the `/qualify` entry in `next.config.mjs`.
- `/book-call` loses the "Quick questions / Book your call" stepper, since step 1 no longer
  exists, and gains a small line under the calendar: "Not ready for a call? Get a quick
  website review by email." It opens an email field (WhatsApp number optional) that posts to
  the new `/api/lead` route.
- The booking message handler now listens to both `bookingSuccessfulV2` and
  `bookingSuccessful`, with a guard, because Cal.com marks the old one as deprecated.
- `generate_lead` fires for a confirmed booking (`booked_call`) and for the email box
  (`nurture`, form `review_request`). `/qualify` no longer sends `form_start` or
  `qualify_complete`. See `TRACKING_PLAN.md`.

### Hypotheses

1. Fewer steps before the calendar means more visitors reach it.
2. Slots at hours people can actually make means more of those who reach it book.
3. A follow-up for people who leave their email means some of them book later.

### Metric

Confirmed bookings per 100 home page visitors, counted from Vercel Analytics page views
(`/book-call/confirmed` against `/`) and checked against Cal.com.

- Baseline (Oct 7 to Nov 6): 3 per 404 = 0.74 per 100.
- Review after 4 weeks, or sooner once about 100 people have reached the calendar.
- Volumes are small. A change of a few bookings is noise, so judge the trend over the full
  period, not week to week.

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

Follow-up system (`src/lib/followup/`, all email through Resend):

- Someone who leaves their email: a thank-you at once, then a tip on day 2, "Want to talk it
  through?" on day 5 and a last note on day 10. The job runs once a day, so each email lands
  within half a day of its day. It stops the moment they book or unsubscribe.
- Someone who books (matched by email through a Cal.com webhook): "what to prepare" within
  minutes, reminders 24 hours and 2 hours before with a one-click reschedule link, and "Sorry
  we missed you" one hour after a no-show. Moving or cancelling a booking moves or cancels its
  reminders. Cal.com cannot detect a no-show on Google Meet, so that email goes out only when
  the owner marks the attendee as a no-show in Cal.com.
- The owner gets an email for every new lead and booking (contact details, page they came
  from, answers). If a WhatsApp number was given, it includes a pre-written message and a
  `wa.me` link to send by hand. Nothing is ever sent on WhatsApp automatically. About 15
  minutes after a call ends, the owner gets a draft thank-you to edit and send by hand. It is
  never sent automatically, and it is cancelled if the owner marks the attendee as a no-show
  before it goes out. Every Monday the owner gets the list of people who asked for a
  review and have not booked.
- Every email to a lead has an unsubscribe link, the business name and a one line reason for
  receiving it, plus the one-click `List-Unsubscribe` header. Unsubscribing takes effect at
  once and deletes the contact details.
- Storage is Upstash Redis (free tier). The daily job is one cron entry in `vercel.json`
  (`0 5 * * *`, 10 AM Pakistan time, Mondays include the weekly list).
- Environment variables (names only, values are set in Vercel): `RESEND_API_KEY` (already
  set), `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `LEAD_TOKEN_SECRET`,
  `CAL_WEBHOOK_SECRET`, `CRON_SECRET`, and optionally `MAIL_POSTAL_ADDRESS` (printed in the
  footer of lead emails when set).
- Cal.com: one webhook to `https://www.nexdevsolutions.net/api/cal-webhook` with the secret
  above, for Booking created, Booking cancelled, Booking rescheduled and No-show updated. When
  it goes live, Cal.com's three default email workflows are paused so people do not get
  duplicate reminders.
- To turn it off without removing code: delete the Cal.com webhook (stops booking emails),
  remove the `crons` entry in `vercel.json` (stops follow-ups), or revert the commit.

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

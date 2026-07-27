import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque",
  clientLogo: "PLACEHOLDER: client-logo.svg (120×40)",
  liveUrl: "https://example.com",
  headline: "How Pakistan's biggest coaching platform enrolled 407 members in 24 hours",
  heroImage: "PLACEHOLDER: hero-device-mockup 1600×1000",
  meta: {
    year: "2025",
    timeline: "4 weeks",
    industry: "Coaching / Education",
    services: ["Webflow Development", "CRO", "Sales Page Copy"],
  },
  metrics: [
    {
      label: "Conversion Rate",
      from: "1.8%",
      to: "2.7%",
      change: "+51%",
      window: "in 30 days",
    },
    {
      label: "New Members",
      from: "0",
      to: "407",
      change: "407",
      window: "in 24 hrs",
    },
    {
      label: "Video → Signup Rate",
      from: "12%",
      to: "29%",
      change: "+142%",
      window: "in 60 days",
    },
  ],
  challenge: {
    intro: "A trusted coaching brand with a signup page that undersold the offer.",
    problems: [
      "The course's value wasn't clear until minute eight of a long sales video",
      "No urgency mechanism, so most visitors said 'I'll join later'",
      "Payment plans were buried instead of shown upfront",
      "The mobile signup form had 9 fields before payment even started",
    ],
  },
  approach: [
    {
      title: "Sales page rebuilt around the offer, not the founder bio",
      body: "PLACEHOLDER: expand on how the page was restructured to lead with outcomes and social proof instead of a long personal introduction.",
      microResult: "Time on page +64%",
      image: "PLACEHOLDER: sales-page 1200×900",
    },
    {
      title: "Cohort-based urgency and cart-close messaging",
      body: "PLACEHOLDER: expand on the enrollment window mechanics that gave visitors a real reason to act on this specific cohort.",
      microResult: "Enrollment page CTR +38%",
      image: "PLACEHOLDER: urgency-banner 1200×900",
    },
    {
      title: "Payment plans shown above the fold",
      body: "PLACEHOLDER: expand on surfacing pricing and installment options immediately instead of hiding them behind a click.",
      microResult: "Checkout starts +47%",
      image: "PLACEHOLDER: pricing-section 1200×900",
    },
    {
      title: "A 5-field mobile signup flow",
      body: "PLACEHOLDER: expand on cutting the enrollment form down to only what's needed to start checkout, deferring the rest to after payment.",
      microResult: "Form completion +71%",
      image: "PLACEHOLDER: mobile-signup 1200×900",
    },
  ],
  quote: {
    text: "PLACEHOLDER: real client quote about the launch and enrollment results.",
    name: "PLACEHOLDER: Client Name",
    role: "Founder, Reality Cheque",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    intro: "Every cohort launch since has beaten the one before it.",
    stats: [
      { label: "Payback period", value: "3 days" },
      { label: "Next-cohort waitlist", value: "1,900+" },
      { label: "Course completion rate", value: "88%" },
    ],
    note: "PLACEHOLDER: expand with what's compounding now — waitlist growth, referral enrollments, or a new cohort cadence.",
  },
  cta: {
    primary: "Start your project",
    secondary: "Get a free CRO audit",
  },
};

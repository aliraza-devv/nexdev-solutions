import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque",
  liveUrl: "https://example.com",
  headline: "How Pakistan's biggest coaching platform enrolled 407 members in 24 hours",
  heroStat: "+210% subscription revenue in 8 weeks",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
  ],
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
  context:
    "PLACEHOLDER: 2-3 sentence introduction to Reality Cheque's business, what they teach, and the scope of this engagement before diving into what wasn't working.",
  challenge: {
    intro: "A trusted coaching brand with a signup page that undersold the offer.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Value buried in the video",
        desc: "The course's value wasn't clear until minute eight of a long sales video.",
      },
      {
        tag: "Drop-Off",
        severity: "warning",
        title: "No urgency mechanism",
        desc: "With nothing pushing a decision, most visitors said 'I'll join later' — and didn't.",
      },
      {
        tag: "Friction",
        severity: "warning",
        title: "Pricing buried",
        desc: "Payment plans were buried instead of being shown upfront where they'd build confidence.",
      },
    ],
  },
  approach: [
    {
      title: "Sales page rebuilt around the offer, not the founder bio",
      body: "PLACEHOLDER: expand on how the page was restructured to lead with outcomes and social proof instead of a long personal introduction.",
      microResult: "Time on page +64%",
      solves: 0,
      images: [
        "PLACEHOLDER: sales-page 1200×900",
        "PLACEHOLDER: outcomes + social proof section 1200×900",
      ],
    },
    {
      title: "Cohort-based urgency and cart-close messaging",
      body: "PLACEHOLDER: expand on the enrollment window mechanics that gave visitors a real reason to act on this specific cohort.",
      microResult: "Enrollment page CTR +38%",
      solves: 1,
      images: [
        "PLACEHOLDER: urgency-banner 1200×900",
        "PLACEHOLDER: cart-close countdown 1200×900",
      ],
    },
    {
      title: "Payment plans shown above the fold",
      body: "PLACEHOLDER: expand on surfacing pricing and installment options immediately instead of hiding them behind a click.",
      microResult: "Checkout starts +47%",
      solves: 2,
      images: [
        "PLACEHOLDER: pricing-section 1200×900",
        "PLACEHOLDER: installment options detail 1200×900",
      ],
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
    chartImage: "PLACEHOLDER: results-chart — signups per cohort 1400×600",
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

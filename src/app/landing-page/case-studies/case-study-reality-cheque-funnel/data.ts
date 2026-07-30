import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque",
  liveUrl: "https://example.com",
  headline: "A lead-gen funnel that returned 26× on ad spend in two weeks",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
  ],
  meta: {
    year: "2025",
    timeline: "3 weeks",
    industry: "Service Business",
    services: ["Funnel Design", "Paid Ads Landing Page", "CRO"],
  },
  metrics: [
    {
      label: "Cost Per Lead",
      from: "$42",
      to: "$11",
      change: "-74%",
      window: "in 2 weeks",
    },
    {
      label: "Qualified Leads",
      from: "0",
      to: "70",
      change: "70+",
      window: "in 2 weeks",
    },
    {
      label: "Return on Ad Spend",
      from: "1×",
      to: "26×",
      change: "26×",
      window: "in 2 weeks",
    },
  ],
  challenge: {
    intro:
      "Paid traffic was arriving, and almost none of it was converting into booked calls.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No reason to act now",
        desc: "A generic contact form gave leads no reason to book right now instead of 'later.'",
      },
      {
        tag: "Sales Waste",
        severity: "warning",
        title: "No qualification step",
        desc: "With no way to filter leads first, the sales team wasted calls on bad-fit prospects.",
      },
      {
        tag: "Mismatch",
        severity: "warning",
        title: "Ad-to-page mismatch",
        desc: "Ad creative promised one thing, and the landing page said another.",
      },
      {
        tag: "Lost Leads",
        severity: "info",
        title: "No follow-up sequence",
        desc: "Zero retargeting or follow-up for the 95% who didn't convert instantly.",
      },
    ],
  },
  approach: [
    {
      title: "Message-matched landing pages for every ad angle",
      body: "PLACEHOLDER: expand on building a dedicated landing page per ad creative so the promise on the ad matches the promise on the page.",
      microResult: "Bounce rate -33%",
      images: [
        "PLACEHOLDER: landing-page-variants 1200×900",
        "PLACEHOLDER: ad-to-page match detail 1200×900",
      ],
    },
    {
      title: "A built-in lead qualification quiz",
      body: "PLACEHOLDER: expand on the short quiz used to filter and route leads before they ever reach the sales team.",
      microResult: "Sales-qualified rate +58%",
      images: [
        "PLACEHOLDER: qualification-quiz 1200×900",
        "PLACEHOLDER: lead routing logic 1200×900",
      ],
    },
    {
      title: "One-click call booking, no back-and-forth",
      body: "PLACEHOLDER: expand on embedding a real-time booking calendar directly in the funnel instead of a 'we'll email you' form.",
      microResult: "Booking rate +44%",
      images: [
        "PLACEHOLDER: booking-calendar 1200×900",
        "PLACEHOLDER: instant confirmation step 1200×900",
      ],
    },
    {
      title: "Retargeting and an email sequence for non-converters",
      body: "PLACEHOLDER: expand on the follow-up sequence built to recover the majority of visitors who didn't book on their first visit.",
      microResult: "Recovered leads: 22",
      images: [
        "PLACEHOLDER: retargeting-sequence 1200×900",
        "PLACEHOLDER: email nurture flow 1200×900",
      ],
    },
  ],
  quote: {
    text: "PLACEHOLDER: real client quote about the funnel and lead quality.",
    name: "PLACEHOLDER: Client Name",
    role: "Operations Lead, Reality Cheque",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    intro: "Two weeks in, the funnel is still the highest-performing channel in the account.",
    chartImage: "PLACEHOLDER: results-chart — cost per lead over time 1400×600",
    stats: [
      { label: "Payback period", value: "2 days" },
      { label: "Avg. deal size", value: "+18%" },
      { label: "Call show-up rate", value: "91%" },
    ],
    note: "PLACEHOLDER: expand with what's compounding now — ad spend scaling, sales cycle length, or lifetime value of booked leads.",
  },
  cta: {
    primary: "Start your project",
    secondary: "Get a free CRO audit",
  },
};

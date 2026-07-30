import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Bamper",
  liveUrl: "https://example.com",
  headline:
    "How a bamboo toilet paper brand sold out its first inventory in 60 days",
  heroStat: "+210% subscription revenue in 8 weeks",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
  ],
  meta: {
    year: "2025",
    timeline: "5 weeks",
    industry: "eCommerce / DTC",
    services: ["Shopify Development", "Brand Identity", "CRO"],
  },
  metrics: [
    {
      label: "Conversion Rate",
      from: "1.6%",
      to: "4.2%",
      change: "+163%",
      window: "in 60 days",
    },
    {
      label: "Average Order Value",
      from: "$28",
      to: "$41",
      change: "+46%",
      window: "in 60 days",
    },
    {
      label: "First Production Run",
      from: "0%",
      to: "100%",
      change: "Sold Out",
      window: "in 60 days",
    },
  ],
  resultsAtLaunchEyebrow: "At Launch · First 8 Weeks",
  resultsSustainedEyebrow: "6 Months Post-Launch",
  context: [
    "PLACEHOLDER: 2-3 sentence introduction to Bamper's business, what they sell, and the scope of this engagement before diving into what wasn't working.",
  ],
  challenge: {
    intro:
      "A clever, sustainable product with zero brand recognition and a hard launch deadline.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No existing audience",
        desc: "No existing audience or social proof before launch day — the brand needed to sell cold.",
      },
      {
        tag: "Off-Brand",
        severity: "warning",
        title: "Generic Shopify theme",
        desc: "A stock theme made a bamboo brand look like every other DTC store on the shelf.",
      },
      {
        tag: "Missed Revenue",
        severity: "info",
        title: "Subscribe & save missing",
        desc: "The recurring-revenue option wasn't presented anywhere, leaving repeat revenue on the table.",
      },
    ],
  },
  approachHeader: "Three fixes, each mapped directly to the challenge it solves.",
  approach: [
    {
      title: "Brand-first product photography and storytelling",
      body: "PLACEHOLDER: expand on how the store's visual identity was rebuilt around sustainability and premium positioning instead of a generic Shopify theme.",
      microResult: "Add-to-cart +38%",
      solves: 1,
      images: [
        "PLACEHOLDER: brand-photography 1200×900",
        "PLACEHOLDER: brand-storytelling section 1200×900",
      ],
    },
    {
      title: "A launch-day landing page built for urgency",
      body: "PLACEHOLDER: expand on the limited-run messaging, countdown, and pre-launch waitlist mechanics used to build demand before stock even shipped.",
      microResult: "Pre-launch signups: 1,200",
      solves: 0,
      images: [
        "PLACEHOLDER: launch-page 1200×900",
        "PLACEHOLDER: countdown + waitlist module 1200×900",
      ],
    },
    {
      title: "Subscribe & save built into the buy box",
      body: "PLACEHOLDER: expand on how the subscription option was surfaced at the moment of decision instead of being buried in a separate page.",
      microResult: "Subscribe opt-in 24%",
      solves: 2,
      images: [
        "PLACEHOLDER: subscribe-buybox 1200×900",
        "PLACEHOLDER: subscription pricing detail 1200×900",
      ],
    },
  ],
  quote: {
    text: "PLACEHOLDER: real client quote about the launch and the results.",
    name: "PLACEHOLDER: Client Name",
    role: "Founder, Bamper",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    intro: "Bamper didn't just sell out — they built a waitlist for round two.",
    chartImage:
      "PLACEHOLDER: results-chart — conversion rate over 60 days 1400×600",
    stats: [
      { label: "Payback period", value: "9 days" },
      { label: "Email list growth", value: "+2,400" },
      { label: "Repeat purchase rate", value: "18%" },
    ],
    note: "PLACEHOLDER: expand with what's compounding now — restock demand, repeat customers, or new SKUs in the pipeline.",
  },
  cta: {
    primary: "Start your project",
    secondary: "Get a free CRO audit",
  },
};

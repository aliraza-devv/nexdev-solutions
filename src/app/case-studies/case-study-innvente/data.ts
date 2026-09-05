import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Innvente",
  heroEyebrow: "Case Study · Innvente · Y Combinator-Trusted Dev Agency",
  headline:
    "$63npm run dev per qualified founder lead from Meta ads for a Y Combinator-trusted dev agency.",
  heroStat: "$63 per qualified lead and a 71% show rate on Meta ad traffic",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "/assets/case-studies/Innvente-hero-left.webp",
    "/assets/case-studies/Innvente-hero-right.webp",
  ],
  meta: {
    year: "",
    timeline: "2 Weeks",
    industry: "Rapid MVP Development",
    services: [
      "SYNC Audit",
      "Design",
      "Lead Qualification Funnel",
      "Next.js Development",
    ],
  },
  resultsAtLaunchEyebrow: "FIRST 30 DAYS",
  metrics: [
    {
      label: "cost per qualified lead",
      from: "$310",
      to: "$63",
    },
    {
      label: "show rate on booked calls",
      from: "0%",
      to: "71%",
    },
    {
      label:
        "Funnel leads converting into noticeably larger deals than average",
      qualitative: true,
    },
  ],
  context: [
    "A conversion funnel for a rapid MVP agency targeting venture-backed founders through Meta ads.",
    "Innvente is a rapid MVP development agency that ships investor-ready products in 21 to 30 days for Y Combinator portfolio companies and venture-backed founders racing to Series A. They have delivered $238K+ in projects, with a 100% next-round funding rate for their clients.",
  ],
  challenge: {
    intro: "Real credibility, but no system turning it into a steady pipeline.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Inconsistent Pipeline, No Control",
        desc: "Referrals and Upwork brought in work, but volume was inconsistent and there was no control over who actually reached the calendar.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: "No Filter Between Ads and the Calendar",
        desc: "The standard ad-to-homepage-to-calendar path would have sent every bootstrapped side-project builder and price-shopper straight into the sales calendar alongside real prospects.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Wasted Calls Cost Real Time at High Stakes",
        desc: "At $50K to $80K average deal sizes, one wasted call is an hour the founder and CTO do not get back.",
      },
    ],
  },
  approachHeader:
    "Three pages, one job: only funded founders reach the calendar.",
  approach: [
    {
      title: "A Dedicated Landing Page on offer.innvente.com",
      body: "Next.js, one offer, one CTA. Copy speaks to the funded founder's pain: 6-month timelines, junior devs, code that breaks at scale. Case studies with real exits and a trust bar naming Y Combinator, BBC Studios, Microsoft.",
      solves: 0,
      image: "/assets/case-studies/Innvente-approach-1.webp",
    },
    {
      title: "A Qualification Page Before the Calendar Loads",
      body: "Collects project details, timeline, and funding stage before the calendar loads. Screens out enquiries not ready for a $20K+ engagement and lets Innvente prepare for every call.",
      solves: 1,
      image: "/assets/case-studies/Innvente-approach-2.webp",
    },
    {
      title: "A Thank You Page That Pre-Frames the Call",
      body: "Post-booking confirmation that pre-frames the call, reduces no-shows by reinforcing what the founder will walk away with.",
      solves: 2,
      image: "/assets/case-studies/Innvente-approach-3.webp",
    },
  ],
  approachPlusLine:
    "Built on Next.js and hosted on Vercel, from brief to live in 2 weeks.",
  turningPoint: {
    header: "We built the filter before the calendar.",
    body: [
      "Every ad click landed on the homepage. There was no way to tell a funded YC founder from someone with an idea and no budget until the call was already booked.",
      "The problem was not awareness. Innvente had the portfolio and the trust signals. The problem was routing. We built a dedicated landing page on a subdomain, tuned entirely for one conversion: book a technical discovery call. Between the page and the calendar sits a qualification step that filters by funding stage, project readiness, and timeline. Only founders who clear the filter reach the calendar.",
    ],
  },
  results: {
    chartImage: "/assets/case-studies/Innvente-results-chart.webp",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline:
      "Running ads to funded founders? Filter them before your calendar does.",
    subline:
      "30 minutes. No pitch. Just a clear look at how a qualification step protects your team's time and your close rate.",
  },
};

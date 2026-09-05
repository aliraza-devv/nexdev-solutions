import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "The We One",
  heroEyebrow: "Case Study · The We One · Amazon Growth Agency Funnel",
  headline: "42% of Meta ad leads qualified before they touched the calendar.",
  heroStat: "42% qualified lead rate and a 74% show rate on Meta ad traffic",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "/assets/case-studies/TheWeOne-hero-left.webp",
    "/assets/case-studies/TheWeOne-hero-right.webp",
  ],
  meta: {
    year: "",
    timeline: "3 Weeks",
    industry: "Amazon Growth Agency",
    services: [
      "SYNC Audit",
      "Design",
      "Lead Qualification Funnel",
      "WordPress Development",
    ],
  },
  resultsAtLaunchEyebrow: "FIRST 30 DAYS",
  metrics: [
    {
      label: "qualified lead rate",
      from: "0%",
      to: "42%",
    },
    {
      label: "A cost per qualified lead low enough to justify scaling the ad budget",
      qualitative: true,
    },
  ],
  context: [
    "A conversion funnel for an Amazon growth agency running Meta ads to their free Profit Leak Audit offer.",
    "The We One is a full-service Amazon growth agency based in Virginia, working with brands generating $10K to $100K monthly on Amazon and TikTok. They help sellers solve the Profitability Paradox: when sales grow but profits don't.",
  ],
  challenge: {
    intro: "Real ad traffic, but no way to know who was worth a call.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No Filter Before the Calendar",
        desc: "Every ad click went straight to a booking link. The sales team had no way to know if the person booking was a $60K Amazon brand or someone just getting started.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: "Hours Lost to Unqualified Calls",
        desc: "10 to 15 hours a week went to calls that had no realistic chance of closing, time the sales team could have spent on leads that were actually ready.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Rising Cost Per Client, No Visibility",
        desc: "Cost per closed client kept climbing with no obvious reason, because there was no data on who was booking or why they weren't converting.",
      },
    ],
  },
  approachHeader: "Four pages. One job each.",
  approach: [
    {
      title: "A Landing Page With One Offer, One CTA",
      body: "One offer, one CTA. Copy built around the exact pain of The We One's ICP: growing sales, shrinking margins, 20 hours a week in Seller Central.",
      solves: 0,
      image: "/assets/case-studies/TheWeOne-approach-1.webp",
    },
    {
      title: "A Multi-Step Qualification Form",
      body: "Collects monthly revenue, primary pain, and readiness. Qualified leads ($10K and above, clear pain, real timeline) route to booking. Everyone else gets a warm exit.",
      solves: 1,
      image: "/assets/case-studies/TheWeOne-approach-2.webp",
    },
    {
      title: "A Booking Page That Only Unlocks After Qualifying",
      body: "Only accessible after qualifying. Pre-frames the call, what to expect and what to prepare.",
      solves: 0,
      image: "/assets/case-studies/TheWeOne-approach-3.webp",
    },
    {
      title: "A Post-Booking Page That Protects the Show Rate",
      body: "Confirms the slot, reinforces the value of showing up, reduces no-shows.",
      solves: 2,
      image: "/assets/case-studies/TheWeOne-approach-4.webp",
    },
  ],
  approachPlusLine:
    "Built on WordPress with Elementor, from brief to live in 3 weeks.",
  turningPoint: {
    header: "We built the filter before the calendar.",
    body: [
      "Every ad click went straight to a calendar. The sales team had no way to know if they were about to talk to a $60K Amazon brand or someone just starting out.",
      "The problem wasn't the ads. The offer was strong and the traffic was real. The problem was what the traffic landed on. A single page with one button and no way to separate the right fit from the wrong one. We stopped thinking about the landing page as a page and started treating it as the first sales conversation.",
    ],
  },
  results: {
    chartImage: "/assets/case-studies/TheWeOne-results-chart.webp",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Sending ad traffic straight to a calendar? Filter it first.",
    subline:
      "30 minutes. No pitch. Just a clear look at how a qualification step protects your sales team's time.",
  },
};

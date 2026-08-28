import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "The We One",
  liveUrl: "https://theweone.com",
  heroEyebrow: "Case Study · The We One · Amazon Growth Agency Funnel",
  headline: "42% of Meta ad leads qualified before they touched the calendar.",
  heroStat: "42% qualified lead rate and a 74% show rate on Meta ad traffic",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup, desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup, mobile 1600×1000",
  ],
  meta: {
    year: "",
    timeline: "3 Weeks",
    industry: "Amazon Growth Agency / E-commerce Services",
    services: [
      "SYNC Audit",
      "Landing Page Design",
      "Lead Qualification Funnel",
      "WordPress + Elementor Development",
      "Booking Flow Optimization",
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
      label: "of form starts completed the qualifier",
      from: "0%",
      to: "68%",
    },
    {
      label: "show rate",
      from: "51%",
      to: "74%",
    },
    {
      label: "of booked calls were with brands at $10K or above monthly revenue",
      from: "0%",
      to: "81%",
    },
    {
      label: "cost per qualified lead",
      from: "$74",
      to: "$38",
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
      image: "PLACEHOLDER: landing-page 1200×900",
    },
    {
      title: "A Multi-Step Qualification Form",
      body: "Collects monthly revenue, primary pain, and readiness. Qualified leads ($10K and above, clear pain, real timeline) route to booking. Everyone else gets a warm exit.",
      solves: 1,
      image: "PLACEHOLDER: qualification-form 1200×900",
    },
    {
      title: "A Booking Page That Only Unlocks After Qualifying",
      body: "Only accessible after qualifying. Pre-frames the call, what to expect and what to prepare.",
      solves: 0,
      image: "PLACEHOLDER: booking-page 1200×900",
    },
    {
      title: "A Post-Booking Page That Protects the Show Rate",
      body: "Confirms the slot, reinforces the value of showing up, reduces no-shows.",
      solves: 2,
      image: "PLACEHOLDER: post-booking-page 1200×900",
    },
  ],
  approachPlusLine: "Built on WordPress with Elementor, from brief to live in 3 weeks.",
  turningPoint: {
    header: "We built the filter before the calendar.",
    body: [
      "Every ad click went straight to a calendar. The sales team had no way to know if they were about to talk to a $60K Amazon brand or someone just starting out.",
      "The problem wasn't the ads. The offer was strong and the traffic was real. The problem was what the traffic landed on. A single page with one button and no way to separate the right fit from the wrong one. We stopped thinking about the landing page as a page and started treating it as the first sales conversation.",
    ],
  },
  results: {
    chartImage: "PLACEHOLDER: results-chart, qualified lead funnel 1400×600",
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

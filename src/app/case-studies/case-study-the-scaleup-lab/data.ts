import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "The Scaleup Lab",
  heroEyebrow:
    "Case Study · The Scaleup Lab · Crowdfunding Launch Agency Funnel",
  headline: "47% of Meta ad leads qualified as launch-ready product founders.",
  heroStat:
    "47% qualified lead rate and $89 cost per qualified lead from cold Meta traffic",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "/assets/case-studies/TheScaleupLab-hero-left.webp",
    "/assets/case-studies/TheScaleupLab-hero-right.webp",
  ],
  meta: {
    year: "",
    timeline: "2 Weeks",
    industry: "Crowdfunding Launch Agency",
    services: [
      "SYNC Audit",
      "Design",
      "Lead Qualification Funnel",
      "Webflow Development",
    ],
  },
  resultsAtLaunchEyebrow: "FIRST 45 DAYS",
  metrics: [
    {
      label: "cost per qualified lead",
      from: "$210",
      to: "$89",
    },
    {
      label: "New partnerships closed directly from funnel traffic within the first 45 days",
      qualitative: true,
    },
  ],
  context: [
    "A conversion funnel for a crowdfunding launch agency targeting physical product founders through Meta ads.",
    "The Scaleup Lab is a crowdfunding launch agency that gets physical products fully funded within 24 hours of launch using their Funded Launch Framework. They have raised over $6M across 100+ founder launches, with a 35 to 45% VIP-to-backer conversion rate. They are a Kickstarter Expert Partner and LaunchBoom Certified.",
  ],
  challenge: {
    intro: "Real proof, but no system turning it into a steady pipeline.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No System For Inbound Demand",
        desc: "The Scaleup Lab had the track record: $6M raised, 50+ successful launches, video testimonials from real founders. What they did not have was a system to generate inbound demand at scale. Their pipeline depended on referrals, DMs, and organic content, which meant unpredictable volume every month.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: "Every Agency Runs The Same Playbook",
        desc: "The pre-launch founder audience is flooded with agency ads promising fully funded in 24 hours. Every crowdfunding agency runs the same playbook, so The Scaleup Lab needed a page that stood out and built trust fast, not another look-alike ad.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "No Way To Filter Who Reached The Calendar",
        desc: "Running Meta ads straight to this audience meant no control over who entered the pipeline. Founders who were too early, too small, or just browsing could book a call as easily as a founder ready to move.",
      },
    ],
  },
  approachHeader:
    "Four pages, one job: only launch-ready founders reach the calendar.",
  approach: [
    {
      title: "A Dedicated Offer Page on thescaleuplab.com/offer",
      body: "Built on Webflow. One offer, one audience. The hero promises the specific outcome: fully funded within 24 hours. A VSL builds trust, and social proof answers objections in sequence: $6M raised for scale, 35 to 45% conversion rate for system proof, video testimonials from named founders for credibility. The case study section shows campaigns with exact numbers, and the 60 Days to a Fully Funded Launch framework gives founders a clear picture of the engagement before they apply.",
      solves: 1,
      image: "/assets/case-studies/TheScaleupLab-approach-1.webp",
    },
    {
      title: "A Qualification Page Before the Calendar Loads",
      body: "Collects product stage, timeline, and context before the calendar loads. Filters out idea-stage founders and budget shoppers so only launch-ready founders reach the calendar.",
      solves: 2,
      image: "/assets/case-studies/TheScaleupLab-approach-2.webp",
    },
    {
      title: "A Thank You Page That Pre-Frames the Call",
      body: "Sets expectations for the strategy call and tells the founder exactly what to prepare, so every call starts on the business, not the logistics.",
      solves: 0,
      image: "/assets/case-studies/TheScaleupLab-approach-3.webp",
    },
    {
      title: "A Post-Booking Page That Protects the Show Rate",
      body: "Reinforces the value of the call and reminds the founder what they will walk away with, reducing no-shows on booked strategy calls.",
      solves: 0,
      image: "/assets/case-studies/TheScaleupLab-approach-4.webp",
    },
  ],
  approachPlusLine: "Built on Webflow, from brief to live in 2 weeks.",
  turningPoint: {
    header: "We built the filter before the calendar.",
    body: [
      "Every enquiry landed on a generic homepage. The team had no way to tell a founder with a working prototype and a $15K budget from someone with a napkin sketch and no money until they were already on the call.",
      "The old setup had no qualification layer. We built a dedicated offer page designed for one conversion: apply for a launch strategy call. The application form pre-qualifies by product stage, timeline, and commitment level. Every call the team now takes is with a founder who is ready to move.",
    ],
  },
  results: {
    chartImage: "/assets/case-studies/TheScaleupLab-results-chart.webp",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline:
      "Running ads to founders who are not ready? Filter them before your calendar does.",
    subline:
      "30 minutes. No pitch. Just a clear look at how a qualification step protects your pipeline and your close rate.",
  },
};

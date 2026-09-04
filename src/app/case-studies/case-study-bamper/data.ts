import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Bamper",
  heroEyebrow: "Case Study · Bamper · Bamboo Toilet Paper, Built From Zero",
  headline: "How a brand-new bamboo brand sold out its inventory in 60 days.",
  heroStat: "Sold out in 60 days at a 4.2% conversion rate",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "/assets/case-studies/Bamper-hero-left.webp",
    "/assets/case-studies/Bamper-hero-right.webp",
  ],
  meta: {
    year: "",
    timeline: "5 Weeks",
    industry: "Consumer Packaged Goods / Sustainable Home Goods",
    services: [
      "SYNC Audit",
      "Brand-Aligned UI/UX",
      "Shopify Development",
      "Product Page CRO",
      "Checkout Optimization",
    ],
  },
  resultsAtLaunchEyebrow: "FIRST 60 DAYS",
  metrics: [
    {
      label: "Sold out inventory in 60 days",
      qualitative: true,
    },
    {
      label: "conversion rate",
      from: "0%",
      to: "4.2%",
    },
    {
      label: "A real brand identity, built from nothing in 5 weeks",
      qualitative: true,
    },
  ],
  context: [
    "Bamper launched a bamboo toilet paper brand with zero name recognition, going up against household bamboo brands already doing millions. No past customers, no reviews, no story yet, just a product and a launch date.",
  ],
  challenge: {
    intro: "A new brand with nothing to lean on but the site itself.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Zero Brand Recognition",
        desc: "In a market with established players already spending big on trust, a first-time visitor had no reason to believe in Bamper yet. The site had to do all of that convincing alone.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Every Second Thought Was a Lost Sale",
        desc: "A new brand gets picked apart. Any hesitation, any unanswered question, any friction at checkout, and the visitor bounces to a brand they already trust.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: "One Shot to Get the Story Right",
        desc: "With no existing audience to test on, the brand story, the product page, and the checkout all had to work on the first real batch of visitors. There was no slow ramp-up.",
      },
    ],
  },
  approachHeader:
    "We didn't just build a store. We built the trust a new brand doesn't start with.",
  approachIntro:
    "We started with discovery, mapping the competitors already dominating this space and where Bamper could actually win. A SYNC Method audit shaped the plan. Then we built it out, piece by piece.",
  approach: [
    {
      title: "An About Page That Earns Belief",
      body: 'We gave Bamper a real story, not a generic "who we are" block. It\'s the page a skeptical first-time visitor reads before they trust anything else on the site.',
      solves: 0,
      image: "/assets/case-studies/Bamper-approach-1.webp",
    },
    {
      title: "A High-Converting, Objection-Killing Product Page",
      body: "Every likely doubt got answered before the visitor could ask it. Real video reviews from actual customers sat right where the hesitation would happen, so trust showed up exactly when it was needed.",
      solves: 1,
      image: "/assets/case-studies/Bamper-approach-2.webp",
    },
    {
      title: "A Seamless, Branded Checkout",
      body: "We built checkout to remove friction and reinforce trust at the exact moment people talk themselves out of buying. Every screen matched the brand, so nothing felt like a generic Shopify template bolted on at the end.",
      solves: 2,
      image: "/assets/case-studies/Bamper-approach-3.webp",
    },
  ],
  turningPoint: {
    header: "We didn't build a store. We built trust.",
    body: [
      "An established brand can lean on its name. Bamper couldn't: every visitor showed up a stranger who had to leave convinced.",
      "So we stopped building a store and started building trust: the about page, product page, reviews, and checkout each existed to answer doubt the moment it appeared. That's what let an unknown brand quickly sell out in 60 days.",
    ],
  },
  results: {
    chartImage: "/assets/case-studies/Bamper-results-chart.webp",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Starting from zero doesn't mean starting without a plan.",
    subline:
      "30 minutes. No pitch. Just a clear look at what a new brand needs to earn trust fast and start selling.",
  },
};

import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Bamper",
  liveUrl: "https://example.com",
  heroEyebrow: "Case Study — Bamper · Bamboo Toilet Paper, Built From Zero",
  headline: "How a brand-new bamboo brand sold out its inventory in 60 days.",
  heroStat: "Sold out in 60 days at a 4.2% conversion rate",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
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
    "Bamper makes bamboo toilet paper, and it launched with zero name recognition in the US market. That market already has a handful of household bamboo brands doing millions in revenue.",
    "No past customers, no reviews, no story anyone had heard yet. Just a product and a launch date.",
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
      images: [
        "PLACEHOLDER: about-page 1200×900",
        "PLACEHOLDER: brand-story section 1200×900",
      ],
    },
    {
      title: "A High-Converting, Objection-Killing Product Page",
      body: "Every likely doubt got answered before the visitor could ask it. Real video reviews from actual customers sat right where the hesitation would happen, so trust showed up exactly when it was needed.",
      solves: 1,
      images: [
        "PLACEHOLDER: product-page 1200×900",
        "PLACEHOLDER: video-reviews section 1200×900",
      ],
    },
    {
      title: "A Seamless, Branded Checkout",
      body: "We built checkout to remove friction and reinforce trust at the exact moment people talk themselves out of buying. Every screen matched the brand, so nothing felt like a generic Shopify template bolted on at the end.",
      solves: 2,
      images: [
        "PLACEHOLDER: checkout-flow 1200×900",
        "PLACEHOLDER: branded-checkout-detail 1200×900",
      ],
    },
  ],
  turningPoint: {
    header: "A new brand can't sell on trust it hasn't earned yet. So we built the site to earn it.",
    body: [
      "An established brand can survive an average product page. Its name does some of the selling before anyone reads a word.",
      "Bamper didn't have that. Every visitor showed up as a stranger, and had to leave convinced.",
      "So we stopped treating this as a store build and started treating it as a trust build. The about page, the product page, the video reviews, the checkout: every piece existed to answer the doubt a new brand naturally creates, right at the moment it would show up.",
      "That's what let a brand nobody had heard of sell out in 60 days.",
    ],
  },
  quote: {
    text: "Working with Ali on Bamper felt different from the start. He didn't just design a website, he understood we needed sales, not just a nice-looking store. He got our brand fast and built a site that made total strangers trust a company they had never heard of. Selling out in two months on a brand-new launch still doesn't feel real.",
    name: "",
    role: "Founder, Bamper",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "PLACEHOLDER: results-chart — sell-through over 60 days 1400×600",
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

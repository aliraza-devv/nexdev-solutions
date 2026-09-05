import type { CaseStudyData } from "../_components/types";

// NOTE: the narrative copy below (context, challenge, approach, turning
// point) was drafted by Claude Code from the facts supplied in the task
// (card copy, results numbers) since the task's own copy-paste slot for
// this page's full write-up was left empty. Review before publishing -
// the card copy and the 5 results numbers are verbatim from the task,
// everything else is a first draft in Bamper's voice.
export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Clenvia",
  backLink: { href: "/case-studies", label: "Back to case studies" },
  heroEyebrow: "Case Study · Clenvia · A Supplement Brand Built From Zero",
  headline: "3.8% conversion rate for a supplement brand we launched from scratch.",
  heroStat: "3.8% store conversion rate, $142K in the first 90 days",
  heroCtaMicrocopy: "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "PLACEHOLDER: Clenvia storefront homepage",
    "PLACEHOLDER: Clenvia product page",
  ],
  meta: {
    year: "",
    timeline: "",
    industry: "Consumer Packaged Goods / Supplements",
    services: [
      "SYNC Audit",
      "Brand-Aligned UI/UX",
      "Shopify Development",
      "Product Page CRO",
      "Checkout Optimization",
    ],
  },
  resultsAtLaunchEyebrow: "FIRST 90 DAYS",
  metrics: [
    { label: "Store conversion rate", from: "0%", to: "3.8%" },
    { label: "Revenue in the first 90 days", from: "$0", to: "$142K" },
    { label: "+41% add-to-cart rate after product page testing", qualitative: true },
    { label: "Revenue from repeat and cross-category purchases", from: "0%", to: "23%" },
    { label: "Orders from international buyers", from: "0%", to: "18%" },
  ],
  context: [
    "Clenvia had the products, the certifications, and the manufacturing to sell across health, skincare, and pet care, but no store to sell them from. We built their Shopify presence from the ground up, engineered to convert from launch day.",
  ],
  challenge: {
    intro: "A wide catalog with real credibility, but nowhere to sell it yet.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No Store, No Track Record",
        desc: "A first-time visitor had no past purchases and no reviews to lean on. The certifications and manufacturing quality meant nothing until the site could prove it.",
      },
      {
        tag: "Structural",
        severity: "warning",
        title: "Three Categories, One Store",
        desc: "Health, skincare, and pet care are three different shopping mindsets. A single flat catalog would confuse a visitor who came for one and bury the other two.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Launch Day Was the Only Test",
        desc: "With no existing audience, the product pages and checkout had to convert on the first real batch of traffic. There was no slow ramp-up to fix mistakes on.",
      },
    ],
  },
  approachHeader: "We didn't just build a store. We built trust across three categories at once.",
  approachIntro:
    "We started with discovery, mapping how a supplement buyer actually shops across health, skin, and pet care. A SYNC Method audit shaped the plan, then we built it out, piece by piece.",
  approach: [
    {
      title: "Trust Surfaced Everywhere",
      body: "Certifications and manufacturing credibility showed up right where a skeptical first-time visitor would look for them, not buried on a separate page.",
      solves: 0,
      image: "PLACEHOLDER: Clenvia trust and certification section",
    },
    {
      title: "Category Architecture That Matches How People Shop",
      body: "Health, skincare, and pet care each got their own clear path through the store, so a visitor never had to wade through products meant for someone else.",
      solves: 1,
      image: "PLACEHOLDER: Clenvia category navigation",
    },
    {
      title: "Conversion-Focused Product Pages",
      body: "Every product page answered the obvious doubts before they came up, built and tested specifically to lift add-to-cart.",
      solves: 2,
      image: "PLACEHOLDER: Clenvia product page layout",
    },
    {
      title: "Frictionless Checkout",
      body: "Checkout matched the brand and removed every extra step, so nothing felt like a generic template bolted on at the end.",
      solves: 2,
      image: "PLACEHOLDER: Clenvia checkout flow",
    },
    {
      title: "Launch Offer Mechanics",
      body: "The first-purchase offer was built to convert new visitors immediately while still encouraging the repeat and cross-category purchases the catalog was built for.",
      solves: 2,
      image: "PLACEHOLDER: Clenvia launch offer",
    },
  ],
  turningPoint: {
    header: "We didn't build a store. We built three stores that felt like one brand.",
    problemLabel: "The Risk",
    insightLabel: "What We Built",
    body: [
      "A wide catalog across three categories with no existing store could easily read as unfocused, or force a visitor to dig through products meant for someone else.",
      "So we built dedicated category architecture instead of one flat catalog, with trust and certifications surfaced everywhere a skeptical first-time visitor would look. That's what let a brand-new store convert at 3.8% from launch day.",
    ],
  },
  results: {
    chartImage: "PLACEHOLDER: Clenvia results chart",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Starting from zero doesn't mean starting without a plan.",
    subline:
      "30 minutes. No pitch. Just a clear look at what a new supplement brand needs to convert from day one.",
  },
};

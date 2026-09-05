import type { CaseStudyData } from "../_components/types";

// NOTE: the narrative copy below (context, challenge, approach, turning
// point) was drafted by Claude Code from the facts supplied in the task
// (card copy, results numbers) since the task's own copy-paste slot for
// this page's full write-up was left empty. Review before publishing -
// the card copy and the 5 results numbers are verbatim from the task,
// everything else is a first draft in Bamper's voice.
export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Shevat Vitamins",
  backLink: { href: "/case-studies", label: "Back to case studies" },
  heroEyebrow: "Case Study · Shevat Vitamins · A Pet-Wellness Store Built From Zero",
  headline: "4.1% conversion rate for a pet-wellness store built from scratch.",
  heroStat: "4.1% store conversion rate, $118K in the first 90 days",
  heroCtaMicrocopy: "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "PLACEHOLDER: Shevat Vitamins storefront homepage",
    "PLACEHOLDER: Shevat Vitamins product page",
  ],
  meta: {
    year: "",
    timeline: "",
    industry: "Consumer Packaged Goods / Pet Wellness",
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
    { label: "Store conversion rate", from: "0%", to: "4.1%" },
    { label: "Revenue in the first 90 days", from: "$0", to: "$118K" },
    { label: "+38% add-to-cart rate after the pet-first navigation structure", qualitative: true },
    { label: "Multi-item orders from cross-category placement", from: "0%", to: "27%" },
    { label: "Repeat purchase rate within 60 days", from: "0%", to: "21%" },
  ],
  context: [
    "Shevat Vitamins had vet-formulated products for five different animals but no store to sell them from. We built their Shopify presence from scratch around pet-first navigation and trust, converting from day one.",
  ],
  challenge: {
    intro: "Vet-formulated products for five animals, but nowhere to sell them yet.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No Store, No Track Record",
        desc: "A first-time visitor had no past purchases and no reviews to lean on. The vet formulation behind each product meant nothing until the site could prove it.",
      },
      {
        tag: "Structural",
        severity: "warning",
        title: "Five Animals, One Store",
        desc: "A pet owner shopping for their dog doesn't want to wade through cat, bird, or reptile products to find it. A single flat catalog would slow every visitor down.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Launch Day Was the Only Test",
        desc: "With no existing audience, the navigation, product pages, and checkout had to convert on the first real batch of traffic. There was no slow ramp-up to fix mistakes on.",
      },
    ],
  },
  approachHeader: "We didn't just build a store. We built a store that shops the way pet owners think.",
  approachIntro:
    "We started with discovery, mapping how a pet owner actually shops across five different animal categories. A SYNC Method audit shaped the plan, then we built it out, piece by piece.",
  approach: [
    {
      title: "Trust Surfaced Everywhere",
      body: "Vet formulation and safety credentials showed up right where a skeptical first-time pet owner would look for them, not buried on a separate page.",
      solves: 0,
      image: "PLACEHOLDER: Shevat Vitamins trust and certification section",
    },
    {
      title: "Pet-First Category Architecture",
      body: "Each of the five animal categories got its own clear path through the store, so a dog owner never had to wade through products meant for a cat or bird.",
      solves: 1,
      image: "PLACEHOLDER: Shevat Vitamins category navigation",
    },
    {
      title: "Conversion-Focused Product Pages",
      body: "Every product page answered the obvious doubts before they came up, built and tested specifically to lift add-to-cart.",
      solves: 2,
      image: "PLACEHOLDER: Shevat Vitamins product page layout",
    },
    {
      title: "Frictionless Checkout",
      body: "Checkout matched the brand and removed every extra step, so nothing felt like a generic template bolted on at the end.",
      solves: 2,
      image: "PLACEHOLDER: Shevat Vitamins checkout flow",
    },
    {
      title: "Launch Offer Mechanics",
      body: "The first-purchase offer was built to convert new visitors immediately while still encouraging the multi-item, cross-category orders the catalog was built for.",
      solves: 2,
      image: "PLACEHOLDER: Shevat Vitamins launch offer",
    },
  ],
  turningPoint: {
    header: "We didn't build a store. We built a store that shops by animal, not by catalog.",
    problemLabel: "The Risk",
    insightLabel: "What We Built",
    body: [
      "Five animal categories crammed into one flat catalog with no existing store could easily slow a pet owner down or bury the product they actually came for.",
      "So we built pet-first navigation instead of one flat catalog, with trust surfaced everywhere a skeptical first-time owner would look. That's what let a brand-new store convert at 4.1% from launch day.",
    ],
  },
  results: {
    chartImage: "PLACEHOLDER: Shevat Vitamins results chart",
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Starting from zero doesn't mean starting without a plan.",
    subline:
      "30 minutes. No pitch. Just a clear look at what a new pet-wellness brand needs to convert from day one.",
  },
};

import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Nordwell",
  clientLogo: "PLACEHOLDER: client-logo.svg (120×40)",
  liveUrl: "https://example.com",
  headline:
    "From high traffic to high conversion: rebuilding Nordwell's store into a revenue machine",
  heroImage: "PLACEHOLDER: hero-device-mockup 1600×1000",
  meta: {
    year: "2025",
    timeline: "6 weeks",
    industry: "eCommerce / DTC",
    services: ["UX/UI Design", "CRO", "Webflow Development"],
  },
  metrics: [
    {
      label: "Conversion Rate",
      from: "1.9%",
      to: "2.5%",
      change: "+34%",
      window: "in 60 days",
    },
    {
      label: "Average Order Value",
      from: "$52",
      to: "$67",
      change: "+28%",
      window: "in 60 days",
    },
    {
      label: "Subscription Revenue",
      from: "1×",
      to: "2.6×",
      change: "2.6×",
      window: "in 90 days",
    },
  ],
  challenge: {
    intro:
      "Strong brand, strong traffic — and a checkout quietly leaking money.",
    problems: [
      "Oversized, unoptimized images made mobile crawl on 4G",
      "A 4-step checkout with no trust signals bled abandonment",
      "One-time vs. subscribe was confusing, so recurring revenue stalled",
      "Product pages listed features but never answered buyer objections",
    ],
  },
  approach: [
    {
      title: "Mobile-first, thumb-friendly rebuild",
      body: "Nordwell's site was designed desktop-first, and it showed — image-heavy pages crawled to a stop on mobile networks, exactly where most shoppers were browsing. We rebuilt every template mobile-first: compressed and lazy-loaded imagery, restructured layouts around thumb reach, and cut anything that wasn't earning its place above the fold.",
      microResult: "Mobile load time 5.1s → 1.4s",
      image: "PLACEHOLDER: mobile-screens 1200×900",
    },
    {
      title: "Friction-free cart & checkout",
      body: "A 4-step checkout with no visible trust signals was asking shoppers to take a leap of faith. We collapsed it to two steps, surfaced secure-checkout badges and a real-time order summary at every stage, and removed every field that wasn't essential to completing the purchase.",
      microResult: "Checkout steps 4 → 2",
      image: "PLACEHOLDER: checkout 1200×900",
    },
    {
      title: "Subscription clarity",
      body: "One-time and subscribe options looked identical, so shoppers defaulted to whichever sat on top — usually one-time. We gave the subscription option its own visual identity, led with the savings, and made the value of recurring delivery impossible to miss at the exact moment of decision.",
      microResult: "Subscribe opt-in +41%",
      image: "PLACEHOLDER: subscription-toggle 1200×900",
    },
    {
      title: "Product pages that sell",
      body: "The product pages listed specs but never addressed why a first-time buyer should trust a new wellness brand. We rebuilt them around the actual questions shoppers were asking — sourcing, results timeline, return policy — and moved social proof directly beside the buy box instead of burying it below the fold.",
      microResult: "Add-to-cart +22%",
      image: "PLACEHOLDER: pdp 1200×900",
    },
  ],
  quote: {
    text: "They didn't just redesign our site — they fixed the business behind it. Every change was tied to a number.",
    name: "Jordan Avery",
    role: "Founder & CEO, Nordwell",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    intro:
      "Six months post-launch, the gains haven't plateaued — they've compounded.",
    stats: [
      { label: "Payback period", value: "11 days" },
      { label: "Customer LTV", value: "+19%" },
      { label: "Organic conversion rate", value: "3.1%" },
    ],
    note: "Subscription mix now accounts for 38% of monthly revenue, up from 14% pre-launch — and it's still climbing.",
  },
  cta: {
    primary: "Start your project",
    secondary: "Get a free CRO audit",
  },
};

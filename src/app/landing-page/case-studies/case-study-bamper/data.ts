import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Bamper",
  clientLogo: "PLACEHOLDER: client-logo.svg (120×40)",
  liveUrl: "https://example.com",
  headline: "How a bamboo toilet paper brand sold out its first run in 60 days",
  heroImage: "PLACEHOLDER: hero-device-mockup 1600×1000",
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
  challenge: {
    intro:
      "A clever, sustainable product with zero brand recognition and a hard launch deadline.",
    problems: [
      "No existing audience or social proof before launch day",
      "A generic Shopify theme made a bamboo brand look like every other DTC store",
      "Subscribe & save wasn't presented anywhere, leaving recurring revenue on the table",
      "The product page never explained why bamboo justified a premium price",
    ],
  },
  approach: [
    {
      title: "Brand-first product photography and storytelling",
      body: "PLACEHOLDER: expand on how the store's visual identity was rebuilt around sustainability and premium positioning instead of a generic Shopify theme.",
      microResult: "Add-to-cart +38%",
      image: "PLACEHOLDER: brand-photography 1200×900",
    },
    {
      title: "A launch-day landing page built for urgency",
      body: "PLACEHOLDER: expand on the limited-run messaging, countdown, and pre-launch waitlist mechanics used to build demand before stock even shipped.",
      microResult: "Pre-launch signups: 1,200",
      image: "PLACEHOLDER: launch-page 1200×900",
    },
    {
      title: "Subscribe & save built into the buy box",
      body: "PLACEHOLDER: expand on how the subscription option was surfaced at the moment of decision instead of being buried in a separate page.",
      microResult: "Subscribe opt-in 24%",
      image: "PLACEHOLDER: subscribe-buybox 1200×900",
    },
    {
      title: "Checkout trust signals for a brand-new store",
      body: "PLACEHOLDER: expand on the reviews, guarantees, and secure-checkout badges added to reassure first-time buyers with no purchase history to lean on.",
      microResult: "Checkout abandonment -19%",
      image: "PLACEHOLDER: checkout-trust 1200×900",
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

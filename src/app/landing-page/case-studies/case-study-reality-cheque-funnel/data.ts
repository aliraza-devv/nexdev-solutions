import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque DFY",
  liveUrl: "https://example.com",
  heroEyebrow:
    "Case Study · Reality Cheque DFY · Done-For-You Systems for Agency Owners",
  headline:
    "How a brand-new website turned $1K in ad spend into 26X ROAS and doing $1M.",
  heroStat: "26X ROAS from $1,000 in ad spend and doing $1M",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup, desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup, mobile 1600×1000",
  ],
  meta: {
    year: "",
    timeline: "3 Weeks",
    industry: "Agency Growth / Done-For-You Services",
    services: ["SYNC Audit", "UX/UI", "Development", "CRO", "Tracking Setup"],
  },
  resultsAtLaunchEyebrow: "FIRST 2 WEEKS",
  resultsSustainedEyebrow: "AND IT SCALED",
  metrics: [
    {
      label: "qualified leads in 2 weeks",
      from: "0",
      to: "70+",
    },
    {
      label: "ROAS from $1,000 in ad spend",
      from: "0X",
      to: "26X",
    },
    {
      label: "A site that finally matched the offer",
      qualitative: true,
    },
  ],
  context: [
    "Reality Cheque DFY helps agency owners past $10K a month build systems and lead generation to scale. It's from the team behind Pakistan's biggest agency-owner community, credibility was there, but the website wasn't.",
  ],
  challenge: {
    intro: "A first website that couldn't afford to be a first draft.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "No Funnel to Build On",
        desc: "No site, no funnel, nothing to test against. Every qualified lead had to be engineered from zero.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "A High-Ticket Offer Needs Proof",
        desc: "A premium service needs a site that backs it up. Anything cheap or generic would lose buyers before the first call.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: "Quality Leads, Not Just Bookings",
        desc: "Booking calls is easy. Booking calls with people worth the team's time is the hard part, and it had to be built into the flow.",
      },
    ],
  },
  approachHeader:
    "We didn't build a website. We built a funnel that qualifies.",
  approachIntro:
    "We started with discovery to understand their offer, their buyers, and their competitors. A SYNC Method audit mapped how a stranger should move from first click to booked call. Then we built it, one step at a time.",
  approach: [
    {
      title: "SYNC Landing Page with a High-Converting VSL",
      body: "The landing page was built on the SYNC Method. A VSL does the heavy selling, the copy makes the service clear, and real case studies and testimonials carry the trust. CTAs were placed around how people actually read the page.",
      solves: 1,
      image: "PLACEHOLDER: sync-landing-vsl 1200×900",
    },
    {
      title: "A Distraction-Free Qualifying Funnel",
      body: "After the landing page, the flow does the filtering. A stripped-back form page qualifies each lead, then sends them to book a call. A confirmation page follows, stacked with more proof to protect the show-up rate.",
      solves: 2,
      image: "PLACEHOLDER: qualifying-form-page 1200×900",
    },
    {
      title: "Tracking Wired In From Day One",
      body: "We set up Microsoft Clarity and the Meta pixel across the site and connected every page to GoHighLevel. No guessing. They could see where leads came from and where to tighten the funnel.",
      solves: 0,
      image: "PLACEHOLDER: tracking-setup 1200×900",
    },
  ],
  turningPoint: {
    header: "The website was never the point.",
    body: [
      "Anyone can build a good-looking page. What made this one work was treating it as one connected path, where every step had a single job: the VSL sold, the form filtered, the confirmation page protected the show-up rate.",
      "Tracking was built in from day one, so the funnel never went quiet after launch, they could watch it and keep sharpening it. That's the difference between a website that exists and a funnel that pays for itself.",
    ],
  },
  quote: {
    text: "We started using Ali and NeXDev Solutions for our website, and the results were good enough that we now use them as a white-label partner for our own clients. We got 26X ROAS from $1,000 in ad spend. I had never seen results like that before.",
    name: "Saddam Hasan",
    role: "Founder, Reality Cheque",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "PLACEHOLDER: results-chart, ROAS over first 2 weeks 1400×600",
    stats: [
      {
        label: "Scaled to $1M in revenue",
      },
    ],
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "If you're building it once, build it to convert.",
    subline:
      "30 minutes. No pitch. Just a clear look at what your site or funnel needs to turn traffic into booked calls.",
  },
};

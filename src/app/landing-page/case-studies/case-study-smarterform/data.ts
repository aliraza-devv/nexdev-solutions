import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Smarterform",
  liveUrl: "https://example.com",
  heroEyebrow:
    "Case Study · Smarterform · Secure Form-Building SaaS for High-Stakes Firms",
  headline: "How a from-scratch SaaS product went from idea to funded in two weeks.",
  heroStat: "Investor secured in 2 weeks",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's slowing your product down. No pitch.",
  heroImages: [
    "/assets/case-studies/Smarterform-hero-left.png",
    "/assets/case-studies/Smarterform-hero-right.png",
  ],
  meta: {
    year: "",
    timeline: "30-Day MVP, 90-Day Full Build",
    industry: "SaaS / Legal Tech / Secure Data",
    services: [
      "Full-Stack Web App Development",
      "MVP Build",
      "Security Engineering",
    ],
  },
  resultsAtLaunchEyebrow: "MVP PHASE",
  resultsSustainedEyebrow: "FULL BUILD",
  metrics: [
    {
      label: "Investor secured in 2 weeks",
      qualitative: true,
    },
    {
      label: "MVP shipped in 30 days",
      qualitative: true,
    },
  ],
  context: [
    "Smarterform is a drag-and-drop tool for building complex, multi-step fonpmrms for law firms and compliance teams handling sensitive data. It started with no product, no recognition, just an idea and a serious problem to solve.",
  ],
  challenge: {
    intro:
      "A complex, security-critical product that had to ship fast and still feel simple.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Investor-Ready, Fast",
        desc: "Before anything else, the client needed an MVP strong enough to raise money on. That meant proving the vision to investors in weeks, not after months of building.",
      },
      {
        tag: "UX",
        severity: "warning",
        title: "Complex Product, Non-Technical Users",
        desc: "The tool had to handle multi-step forms with complicated logic. But the people using it aren't developers, so all that complexity had to feel effortless to someone who never thinks about how it works.",
      },
      {
        tag: "Security",
        severity: "info",
        title: "Sensitive Data, Zero Room for Leaks",
        desc: "The users handle confidential, high-stakes information. A single leak wouldn't be a bug. It would end the product's credibility before it ever got going.",
      },
    ],
  },
  approachHeader:
    "We built it in two stages: fast enough to raise on, then solid enough to launch.",
  approachIntro:
    "We started with discovery and real research into competitors and how the actual users behave. A SYNC Method audit set the direction. Then we built in two stages, MVP first, full product second.",
  approach: [
    {
      title: "An MVP Built to Raise On (30 Days)",
      body: "In 30 days we shipped an MVP that made the value impossible to miss: the problem it solves, who it's for, and how big it could get. Clear enough to walk an investor through, and it worked.",
      solves: 0,
      image: "/assets/case-studies/Smarterform-approach-1.png",
    },
    {
      title: "Complex Form-Building, Made Effortless",
      body: "The core is a drag-and-drop builder where an admin creates multi-step forms with complicated logic, no code required. We set up roles for admin reviewers, reviewers, and submitters so each person only sees what they need, plus a dashboard for stats and settings. Hard on the inside, simple on the surface.",
      solves: 1,
      image: "/assets/case-studies/Smarterform-approach-2.png",
    },
    {
      title: "Security Built Into the Foundation",
      body: "We built secure authentication and an encryption layer so sensitive data stays protected from end to end. Then it was put through penetration testing, and it held.",
      solves: 2,
      image: "/assets/case-studies/Smarterform-approach-3.png",
    },
  ],
  turningPoint: {
    header: "The hard part wasn't the features.",
    body: [
      "Building a form tool is easy. Building one a non-technical person at a law firm will trust with confidential data, and actually enjoy using, is a different problem entirely.",
      "So we treated the experience and the security as the real product: drag-and-drop simple on the surface, hard-tested underneath. Get both right and the features sell themselves. That's how an idea became funded in two weeks, and secure enough to pass testing.",
    ],
  },
  quote: {
    text: "I've been working with Ali and NeXDev for a while now, and they genuinely go beyond what the client needs. Always responsive, always on it. I'd recommend NeXDev Solutions for design and development without hesitation.",
    name: "",
    role: "",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "/assets/case-studies/Smarterform-results-chart.png",
    stats: [
      { label: "Full web app launched in 90 days" },
      { label: "Passed penetration testing" },
    ],
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Got a product to build and a clock that's already running?",
    subline:
      "30 minutes. No pitch. Just a clear look at how to build fast without cutting the corners that matter.",
  },
};

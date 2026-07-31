import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Smarterform",
  liveUrl: "https://example.com",
  heroEyebrow:
    "Case Study — Smarterform · Secure Form-Building SaaS for High-Stakes Firms",
  headline: "How a from-scratch SaaS product went from idea to funded in two weeks.",
  heroStat: "Investor secured in 2 weeks",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's slowing your product down. No pitch.",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
  ],
  meta: {
    year: "",
    timeline: "30-Day MVP, 90-Day Full Build",
    industry: "SaaS / Legal Tech / Secure Data",
    services: [
      "SYNC Audit",
      "Product & UX Design",
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
    "Smarterform is a drag-and-drop tool for building complex, multi-step forms, made for organizations that handle highly sensitive data, like law firms and corporate compliance teams.",
    "It started with no product and no recognition. Just an idea, a serious problem to solve, and a market that takes data security very seriously.",
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
      images: [
        "PLACEHOLDER: mvp-overview 1200×900",
        "PLACEHOLDER: investor-pitch-view 1200×900",
      ],
    },
    {
      title: "Complex Form-Building, Made Effortless",
      body: "The core is a drag-and-drop builder where an admin creates multi-step forms with complicated logic, no code required. We set up roles for admin reviewers, reviewers, and submitters so each person only sees what they need, plus a dashboard for stats and settings. Hard on the inside, simple on the surface.",
      solves: 1,
      images: [
        "PLACEHOLDER: form-builder 1200×900",
        "PLACEHOLDER: roles-dashboard 1200×900",
      ],
    },
    {
      title: "Security Built Into the Foundation",
      body: "We built secure authentication and an encryption layer so sensitive data stays protected from end to end. Then it was put through penetration testing, and it held.",
      solves: 2,
      images: [
        "PLACEHOLDER: auth-security 1200×900",
        "PLACEHOLDER: encryption-layer-diagram 1200×900",
      ],
    },
  ],
  turningPoint: {
    header:
      "The hard part was never the features. It was making complexity feel effortless, and provably safe.",
    body: [
      "Plenty of teams can build a form tool. Building one a non-technical person at a law firm will trust with confidential data, and actually likes using, is a different problem entirely.",
      "So we treated two things as the real product: the experience and the security. The drag-and-drop had to hide enormous complexity behind something anyone could pick up in minutes. The data protection had to be strong enough to survive real attempts to break it.",
      "Get those two right and the features sell themselves. That's what turned an idea into a funded product in two weeks, and a funded product into one that passed security testing.",
    ],
  },
  quote: {
    text: "I've been working with Ali and NeXDev for a while now, and they genuinely go beyond what the client needs. Always responsive, always on it. I'd recommend NeXDev Solutions for design and development without hesitation.",
    name: "",
    role: "",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "PLACEHOLDER: results-chart — build timeline MVP to full launch 1400×600",
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

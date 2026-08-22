import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque",
  liveUrl: "https://example.com",
  heroEyebrow: "Case Study · Reality Cheque · The Community for Agency Owners",
  headline:
    "How a website they'd almost given up on drove 407 paid signups in 24 hours.",
  heroStat: "407 paid signups in the first 24 hours",
  heroCtaMicrocopy:
    "30 minutes. We'll show you what's costing you conversions. No pitch.",
  heroImages: [
    "/assets/case-studies/Reality-cheque-hero-left.png",
    "/assets/case-studies/Reality-cheque-hero-right.png",
  ],
  meta: {
    year: "",
    timeline: "4 Weeks",
    industry: "Online Education & Community",
    services: ["SYNC Audit", "UX/UI", "Development", "CRO"],
  },
  resultsAtLaunchEyebrow: "FIRST 24 HOURS",
  resultsSustainedEyebrow: "AND IT KEPT GROWING",
  metrics: [
    {
      label: "paid signups in 24 hours",
      from: "0",
      to: "407",
    },
    {
      label: "increase in conversion rate",
      from: "0%",
      to: "54%",
    },
    {
      label: "A brand that finally matched Saddam's authority",
      qualitative: true,
    },
  ],
  context: [
    "Reality Cheque is Pakistan's biggest paid community for agency owners, run by Saddam Hasan, who's scaled three businesses past $1M. With the whole brand built on authority, the outdated website undercut it at every turn.",
  ],
  challenge: {
    intro: "A website that undersold everything the community was worth.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Outdated Design",
        desc: "The brand ran on credibility. The site looked dated, and quietly chipped away at the authority Saddam had spent years building.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: 'No Path to "Yes"',
        desc: "Visitors couldn't tell what they'd actually get. The page described the community instead of selling it, so nobody moved from curious to convinced.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Confusing Checkout",
        desc: "At the one moment that mattered most, paying, the flow got murky. Friction at checkout is just revenue walking out the door.",
      },
    ],
  },
  approachHeader: "We didn't redesign the site. We rebuilt the path to a sale.",
  approachIntro:
    "First came discovery: a close look at their business, their competitors, and their goals. Then a SYNC Method audit to find exactly where visitors were dropping off. After that, three fixes, one for each problem above.",
  approachPlusLine:
    "Plus a dedicated RSVP page for the quarterly meetups, giving the in-person side of the community a proper home.",
  approach: [
    {
      title: "SYNC Landing Page Redesign",
      body: "We rebuilt the landing page around trust and authority. Clean, credible, clearly premium. Then we backed it with proof: real video and screenshot testimonials from members. The first design got approved on the spot, and we kept going.",
      solves: 0,
      image: "/assets/case-studies/Reality-cheque-approach-1.png",
    },
    {
      title: "Dedicated Course Page + VSL",
      body: "This was the centerpiece. A page that actually sells the courses and what they change for you, anchored by a VSL that lets Saddam pitch the community at scale, the way he would one on one.",
      solves: 1,
      image: "/assets/case-studies/Reality-cheque-approach-2.png",
    },
    {
      title: "Clean Checkout Flow",
      body: "We rebuilt checkout so picking a plan and paying takes seconds instead of second-guessing.",
      solves: 2,
      image: "/assets/case-studies/Reality-cheque-approach-3.png",
    },
  ],
  turningPoint: {
    header: "The real problem was never the design.",
    body: [
      "The old site described the community. It didn't sell it. No stranger could go from curious to paying in one visit, and for a paid community, that journey is the whole business.",
      "So we built a path to purchase instead: the VSL pitches at scale, the course page sells the outcome, and checkout gets out of the way. The design was only the surface, the real fix was the path to a sale.",
    ],
  },
  quote: {
    text: "We started using Ali and NeXDev Solutions for our website, and the results were good enough that we now use them as a white-label partner for our own clients. What stood out most was the speed they work at and the results they get. We're still working with them, and it's going well for us and for our clients.",
    name: "Saddam Hasan",
    role: "Founder, Reality Cheque",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "/assets/case-studies/Reality-cheque-results-chart.png",
    stats: [
      {
        value: "7.1K+",
        label: "members and growing",
      },
      {
        label: "Now the biggest agency-owner community in Pakistan",
      },
      {
        label: "Scaled past $1M in revenue",
      },
    ],
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline:
      "Your website should sell as hard as you do. Let's build it that way.",
    subline:
      "30 minutes. No pitch. Just a clear look at what's holding your site back, and what to do about it.",
  },
};

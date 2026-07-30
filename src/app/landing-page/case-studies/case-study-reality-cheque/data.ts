import type { CaseStudyData } from "../_components/types";

export const CASE_STUDY: CaseStudyData = {
  agencyName: "NeXDev Solutions",
  client: "Reality Cheque",
  liveUrl: "https://example.com",
  heroEyebrow: "Case Study — Reality Cheque · The Community for Agency Owners",
  headline:
    "How a website they'd almost given up on drove 407 paid signups in 24 hours.",
  heroStat: "407 paid signups — first 24 hours",
  heroImages: [
    "PLACEHOLDER: hero-device-mockup — desktop 1600×1000",
    "PLACEHOLDER: hero-device-mockup — mobile 1600×1000",
  ],
  meta: {
    // Both left empty on purpose - Timeline was marked [FILL IN] in the
    // source copy, so this renders as a visible "add this later" placeholder
    // instead of a guessed value.
    year: "",
    timeline: "",
    industry: "Online Education & Community",
    services: ["SYNC Audit", "UX/UI Design", "Web Development", "CRO", "VSL"],
  },
  resultsAtLaunchEyebrow: "AT LAUNCH · FIRST 24 HOURS",
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
    "Reality Cheque is the biggest paid community for agency owners who want to scale — courses, private WhatsApp and Skool groups, live coaching calls, and quarterly in-person meetups, all in one ecosystem. It's run by Saddam Hasan, an agency owner who's scaled three businesses past $1M in revenue.",
    "When your entire brand is built on authority, your website can't look like an afterthought. Theirs did.",
  ],
  challenge: {
    intro: "A website that undersold everything the community was worth.",
    problems: [
      {
        tag: "Critical",
        severity: "critical",
        title: "Outdated Design",
        desc: "For a brand built on credibility, the site looked dated. It quietly undercut the exact authority Saddam had spent years earning.",
      },
      {
        tag: "Functional",
        severity: "warning",
        title: 'No Path to "Yes"',
        desc: "Visitors couldn't grasp what they'd actually get. There was no journey from curious stranger to convinced member — just a page that described the community instead of selling it.",
      },
      {
        tag: "Conversion",
        severity: "info",
        title: "Confusing Checkout",
        desc: "At the one moment that mattered most — payment — the flow got murky. Friction at checkout is revenue walking out the door.",
      },
    ],
  },
  approachHeader: "We didn't redesign the site. We rebuilt the path to a sale.",
  approachIntro:
    "It started with discovery — a deep dive into their business, competitors, and goals — followed by a full SYNC Method™ audit to pinpoint exactly where visitors dropped off. Then three fixes, each solving one problem above.",
  approachPlusLine:
    "Plus a dedicated RSVP page for the quarterly meetups, giving the in-person side of the community a proper home.",
  approach: [
    {
      title: "SYNC Landing Page Redesign",
      body: "We rebuilt the landing page around trust and authority: clean, credible, unmistakably premium. Then we backed it with proof — real video and screenshot testimonials from members. The first design variation got approved on the spot. We didn't stop there.",
      solves: 0,
      images: [
        "PLACEHOLDER: sync-landing-redesign 1200×900",
        "PLACEHOLDER: testimonial proof section 1200×900",
      ],
    },
    {
      title: 'Dedicated Course Page + High-Converting VSL',
      body: "The centerpiece. We built a page that actually sells the courses — what they are, what they change for you — and anchored it with a VSL that lets Saddam pitch the community at scale, the way he would one-on-one.",
      solves: 1,
      images: [
        "PLACEHOLDER: course-page 1200×900",
        "PLACEHOLDER: VSL player section 1200×900",
      ],
    },
    {
      title: "Clean Subscription & Checkout Flow",
      body: "We rebuilt checkout so choosing a plan and paying takes seconds, not second-guessing.",
      solves: 2,
      images: [
        "PLACEHOLDER: subscription-plans 1200×900",
        "PLACEHOLDER: checkout-flow 1200×900",
      ],
    },
  ],
  turningPoint: {
    header: "The real problem was never the design.",
    body: [
      "The site described the community. It didn't sell it. No stranger could go from \"who are these guys?\" to \"take my money\" in a single visit — and for a paid community, that journey is the entire business.",
      "So we stopped thinking \"redesign\" and started building a conversion path: a VSL to pitch at scale, a course page that sells the transformation, and a checkout that gets out of the way. The design was the surface. The path to a sale was the fix.",
    ],
  },
  quote: {
    text: "We started using Ali and NeXDev Solutions for our website, and the results were so good we now use them as a white-label partner for our own clients. What impressed us most is the speed they work at and the results they deliver. We're still working with them — and it's going really well, for us and for our clients.",
    name: "Saddam Hasan",
    role: "Founder, Reality Cheque",
    photo: "PLACEHOLDER: client-headshot 160×160 (real face, not avatar)",
  },
  results: {
    chartImage: "PLACEHOLDER: results-chart — signups over first 24 hours 1400×600",
    stats: [
      {
        label: "members and counting, a thriving, sustainable community",
        value: "7.1K+",
      },
    ],
  },
  cta: {
    primary: "Book Your Free Strategy Call",
    secondary: "Get a free CRO audit",
  },
  finalCta: {
    headline: "Your website should sell as hard as you do. Let's make it.",
    subline:
      "30 minutes. No pitch. Just a clear look at what's holding your site back — and exactly what to do about it.",
  },
};

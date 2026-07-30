// Shared shape for every individual case study page. Each case-study-[brand]
// folder has its own data.ts implementing this interface - edit that one
// object to update a page's content, everything renders from it.

export interface ApproachModule {
  title: string;
  body: string;
  microResult: string;
  images: [string, string];
  // Index into challenge.problems - which challenge card this fix solves.
  solves: number;
}

export interface ChallengeCard {
  tag: string;
  severity: "critical" | "warning" | "info";
  title: string;
  desc: string;
}

export interface CaseStudyData {
  agencyName: string;
  client: string;
  liveUrl: string;
  headline: string;
  // Single standout stat shown directly under the H1, e.g. "+210% subscription
  // revenue in 8 weeks" - separate from the metrics/stats blocks further down.
  heroStat: string;
  heroImages: [string, string];
  meta: {
    year: string;
    timeline: string;
    industry: string;
    services: string[];
  };
  // "At Launch" results tier - animated from/to counters.
  metrics: {
    label: string;
    from: string;
    to: string;
    change: string;
    window: string;
  }[];
  // Short intro to the client/project, shown between the meta bar and
  // the Challenge section.
  context: string;
  challenge: {
    intro: string;
    problems: ChallengeCard[];
  };
  approach: ApproachModule[];
  quote: {
    text: string;
    name: string;
    role: string;
    photo: string;
  };
  // "6 Months" results tier - plain stat strip.
  results: {
    intro: string;
    chartImage: string;
    stats: { label: string; value: string }[];
    note: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
}

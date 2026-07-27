// Shared shape for every individual case study page. Each case-study-[brand]
// folder has its own data.ts implementing this interface - edit that one
// object to update a page's content, everything renders from it.

export interface ApproachModule {
  title: string;
  body: string;
  microResult: string;
  image: string;
}

export interface CaseStudyData {
  agencyName: string;
  client: string;
  clientLogo: string;
  liveUrl: string;
  headline: string;
  heroImage: string;
  meta: {
    year: string;
    timeline: string;
    industry: string;
    services: string[];
  };
  metrics: {
    label: string;
    from: string;
    to: string;
    change: string;
    window: string;
  }[];
  challenge: {
    intro: string;
    problems: string[];
  };
  approach: ApproachModule[];
  quote: {
    text: string;
    name: string;
    role: string;
    photo: string;
  };
  results: {
    intro: string;
    stats: { label: string; value: string }[];
    note: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
}

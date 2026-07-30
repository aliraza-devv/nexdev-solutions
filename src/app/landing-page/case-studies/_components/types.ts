// Shared shape for every individual case study page. Each case-study-[brand]
// folder has its own data.ts implementing this interface - edit that one
// object to update a page's content, everything renders from it.

export interface ApproachModule {
  title: string;
  body: string;
  // Small result pill shown above the title (e.g. "Add-to-cart +38%").
  // Optional - omit it and the pill just doesn't render.
  microResult?: string;
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

// A metrics-tier stat is either the existing animated from->to counter, or a
// plain qualitative line (e.g. "A brand that finally matched Saddam's
// authority") that has no number to animate and just displays as-is.
export type MetricItem =
  | {
      label: string;
      from: string;
      to: string;
      change?: string;
      window?: string;
    }
  | {
      label: string;
      qualitative: true;
    };

export interface CaseStudyData {
  agencyName: string;
  client: string;
  liveUrl: string;
  // Text shown in the hero's pill eyebrow above the H1. Optional - falls
  // back to plain `client` when omitted, which is how the earlier case
  // studies (no eyebrow field set) keep rendering unchanged.
  heroEyebrow?: string;
  headline: string;
  // Single standout stat shown directly under the H1, e.g. "+210% subscription
  // revenue in 8 weeks" - separate from the metrics/stats blocks further down.
  heroStat: string;
  // Optional override for the small line under the hero CTA button. Omit to
  // keep the default ("Free 30-min call. No pitch, just clarity.").
  heroCtaMicrocopy?: string;
  heroImages: [string, string];
  meta: {
    // Leave timeline (or year) as "" to render an obvious "add this later"
    // placeholder in the meta bar instead of a blank/missing value.
    year: string;
    timeline: string;
    industry: string;
    services: string[];
  };
  // "At Launch" results tier - animated from/to counters (or a qualitative
  // stat - see MetricItem).
  metrics: MetricItem[];
  resultsAtLaunchEyebrow: string;
  resultsSustainedEyebrow: string;
  // Short intro to the client/project, one paragraph per array item, shown
  // between the meta bar and the Challenge section.
  context: string[];
  challenge: {
    intro: string;
    problems: ChallengeCard[];
  };
  approachHeader: string;
  // Optional supporting paragraph shown under the Approach section header,
  // before the fix cards.
  approachIntro?: string;
  // Optional trailing line shown after the last Approach fix card.
  approachPlusLine?: string;
  approach: ApproachModule[];
  // Optional section between Approach and Results - the "why the real fix
  // wasn't the surface-level thing" narrative beat. Omit entirely and the
  // section just doesn't render.
  turningPoint?: {
    header: string;
    body: string[];
  };
  quote: {
    text: string;
    name: string;
    role: string;
    photo: string;
  };
  // "Sustained" results tier - plain stat strip.
  results: {
    // Optional supporting line next to the "Impact by the Numbers" heading -
    // omit if the copy doesn't have one.
    intro?: string;
    chartImage: string;
    // `value` is optional so a stat can be a qualitative statement with no
    // number (e.g. "Now the biggest agency-owner community in Pakistan") -
    // renders as a bold statement in place of the number when omitted.
    stats: { label: string; value?: string }[];
    // Optional heading sentence above the stat strip - omit if the copy
    // doesn't have one for this tier.
    note?: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  // Optional override for the shared FinalCTA's headline/subline. Omit to
  // keep that component's default site-wide copy (used everywhere else,
  // including the homepage).
  finalCta?: {
    headline: string;
    subline: string;
  };
}

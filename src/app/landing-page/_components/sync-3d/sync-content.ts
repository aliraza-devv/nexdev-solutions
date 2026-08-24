// Content for the 3D SYNC Method section. Minimal on purpose, the
// animation and the letters carry the explanation, not paragraphs.

export interface SyncLayer {
  letter: "S" | "Y" | "N" | "C";
  name: string;
  job: string;
}

export const LAYERS: SyncLayer[] = [
  { letter: "S", name: "Sales Architecture", job: "the offer, and the order you argue in" },
  { letter: "Y", name: "Narrative Design", job: "the story that hooks in the first 3 seconds" },
  { letter: "N", name: "Neuro Persuasion", job: "built around how your buyer actually decides" },
  { letter: "C", name: "Conversion Engineering", job: "every reason to leave, removed" },
];

export const EYEBROW = "THE SYNC METHOD";
export const HEADLINE = "Four layers. One page that converts.";
export const SUBHEAD =
  "Most sites are built one layer deep. We build all four, in order, until they line up.";

export const PIPELINE_LOW_LABEL = "Scattered, most sites";
export const PIPELINE_HIGH_LABEL = "In sync";
export const PIPELINE_LOW_VALUE = 2000;
export const PIPELINE_HIGH_VALUE = 38000;

export const CTA = "Get your SYNC Audit";

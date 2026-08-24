import type { QualifyOption } from "./types";

export type QuestionKey = "type" | "problem" | "budget" | "timeline";

interface OptionQuestion {
  key: QuestionKey;
  heading: string;
  hint: string;
  options: QualifyOption[];
}

// Exact copy and options from reference/qualification-form.html. Only
// the budget question's "Under $500" option carries a machine value -
// it is the sole disqualifier the API route checks for.
export const OPTION_QUESTIONS: OptionQuestion[] = [
  {
    key: "type",
    heading: "What kind of business is this for?",
    hint: "We work with all three, plus B2B partnerships.",
    options: [
      { label: "Service or consulting" },
      { label: "E-commerce or physical products" },
      { label: "SaaS or digital product" },
      { label: "B2B partnership or agency collab" },
    ],
  },
  {
    key: "problem",
    heading: "What's the main thing costing you right now?",
    hint: "Pick the closest one.",
    options: [
      { label: "Traffic comes but leaves without buying" },
      { label: "Leads come in but they're the wrong fit" },
      { label: "My site looks dated next to competitors" },
      { label: "It's slow, broken, or hard to update" },
    ],
  },
  {
    key: "budget",
    heading: "What's your budget for this project?",
    hint: "Ballpark is fine. It helps us point you to the right option.",
    options: [
      { label: "Under $500", value: "low" },
      { label: "$500 to $2,000" },
      { label: "$2,000 to $5,000" },
      { label: "$5,000+" },
    ],
  },
  {
    key: "timeline",
    heading: "How soon do you want to start?",
    hint: "No wrong answer, it just sets expectations.",
    options: [
      { label: "Ready now" },
      { label: "Within 30 days" },
      { label: "Within 90 days" },
      { label: "Just researching" },
    ],
  },
];

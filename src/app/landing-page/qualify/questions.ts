import type { QualifyOption } from "./types";

export type QuestionKey = "situation" | "pain" | "desired_outcome" | "readiness";

interface OptionQuestion {
  key: QuestionKey;
  heading: string;
  hint: string;
  options: QualifyOption[];
}

// The readiness question doubles as the budget signal - "Fix it" and
// "see the plan first" are the $500+ leads (serious or evaluating).
// "Tight budget" and "just exploring" are the under-$500 segment. No
// dollar amount is ever asked directly - this reads intent instead of
// a number, so it feels like the start of a conversation, not a gate.
export const OPTION_QUESTIONS: OptionQuestion[] = [
  {
    key: "situation",
    heading: "Where are you right now?",
    hint: "Pick the one that fits best. No wrong answer.",
    options: [
      { label: "I have a site but it's not bringing in leads or sales" },
      { label: "I'm starting from scratch, no site yet" },
      { label: "My site looks fine but doesn't convert the way it should" },
      { label: "I'm rebuilding after a bad experience with another agency" },
    ],
  },
  {
    key: "pain",
    heading: "What's the most frustrating part?",
    hint: "Be honest. This is exactly where we start.",
    options: [
      { label: "I'm getting traffic but nobody's buying or booking" },
      { label: "I'm embarrassed to send prospects to my current site" },
      { label: "I'm losing deals to competitors with better websites" },
      { label: "I don't know what's wrong, I just know it's not working" },
    ],
  },
  {
    key: "desired_outcome",
    heading: "What would a win look like for you?",
    hint: 'What does "working" actually mean for your business?',
    options: [
      { label: "More booked calls from people who can actually afford me" },
      { label: "More sales and fewer abandoned carts" },
      { label: "A site that matches the reputation I've built offline" },
      { label: "All of the above, honestly" },
    ],
  },
  {
    key: "readiness",
    heading: "If we showed you exactly where your site is losing money, what would you do?",
    hint: "This one matters. Answer it honestly.",
    options: [
      { label: "Fix it. I'm ready to invest and get this sorted.", value: "high" },
      { label: "I'd want to see the plan and costs first, then decide.", value: "mid" },
      { label: "I'm interested but working with a tight budget right now.", value: "low" },
      { label: "Just exploring for now.", value: "browsing" },
    ],
  },
];

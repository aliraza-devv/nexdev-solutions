export interface QualifyOption {
  label: string;
  value?: string;
}

export interface QualifySelections {
  type: QualifyOption | null;
  problem: QualifyOption | null;
  budget: QualifyOption | null;
  timeline: QualifyOption | null;
}

export interface QualifyPayload extends QualifySelections {
  name: string;
  email: string;
  honeypot: string;
}

export interface QualifyResponse {
  qualified: boolean;
}

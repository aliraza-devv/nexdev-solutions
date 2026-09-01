export interface QualifyOption {
  label: string;
  value?: string;
}

export interface QualifySelections {
  situation: QualifyOption | null;
  pain: QualifyOption | null;
  desired_outcome: QualifyOption | null;
  readiness: QualifyOption | null;
}

export interface QualifyPayload extends QualifySelections {
  honeypot: string;
  // Only present on the disqualified downsell screen's own submit - the
  // main form never asks for contact info at all.
  email?: string;
}

export interface QualifyResponse {
  qualified: boolean;
}

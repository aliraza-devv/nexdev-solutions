import type { CursorVariant, CursorVariantConfig } from "./types";

const DEFAULT_LERP = 0.22;

export const CURSOR_VARIANTS: Record<CursorVariant, CursorVariantConfig> = {
  default: { lerp: DEFAULT_LERP, size: 10 },
  button: { lerp: DEFAULT_LERP, size: 20, magneticPull: 0.2 },
  // The brand's primary purple CTA pills only - a bit bigger than a
  // regular button, white instead of purple, with a smiley face (see
  // cursor-mark.module.css/.face in Cursor.tsx).
  cta: { lerp: DEFAULT_LERP, size: 30, magneticPull: 0.25 },
  card: { lerp: DEFAULT_LERP, size: 92, label: "View case study" },
  text: { lerp: DEFAULT_LERP, size: 7 },
  video: { lerp: DEFAULT_LERP, size: 92, label: "Play" },
  drag: { lerp: DEFAULT_LERP, size: 16 },
  input: { lerp: DEFAULT_LERP, size: 10 },
  none: { lerp: DEFAULT_LERP, size: 10 },
};

export const CLICK_SQUASH_SCALE = 0.7;
// Element-side mask radii, in px, written onto the hovered element as
// --r-target so its own CSS transition can grow --r toward it.
export const ELEMENT_MASK_RADIUS: Partial<Record<CursorVariant, number>> = {
  text: 90,
};

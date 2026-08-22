import type { CursorVariant, CursorVariantConfig } from "./types";

const DEFAULT_RING_LERP = 0.16;

export const CURSOR_VARIANTS: Record<CursorVariant, CursorVariantConfig> = {
  default: { ringLerp: DEFAULT_RING_LERP },
  button: { ringLerp: DEFAULT_RING_LERP, magneticPull: 0.2 },
  card: { ringLerp: DEFAULT_RING_LERP },
  text: { ringLerp: DEFAULT_RING_LERP },
  // Heavier over visual content, per spec.
  image: { ringLerp: 0.09 },
  video: { ringLerp: DEFAULT_RING_LERP },
  drag: { ringLerp: DEFAULT_RING_LERP },
  input: { ringLerp: DEFAULT_RING_LERP },
  none: { ringLerp: DEFAULT_RING_LERP },
};

export const CLICK_SQUASH_SCALE = 0.85;
// Element-side mask radii, in px, written onto the hovered element as
// --r-target so its own CSS transition can grow --r toward it.
export const ELEMENT_MASK_RADIUS: Partial<Record<CursorVariant, number>> = {
  text: 90,
  image: 110,
  card: 220,
};

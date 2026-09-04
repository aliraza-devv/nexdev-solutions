import type { CursorVariant, CursorVariantConfig } from "./types";

// Was 0.22 - noticeably laggy relative to the real pointer, which made
// the dot feel more like a trailing effect than something you're
// actually pointing with. Tighter tracking reads as more precise/
// controllable without losing the smoothing that keeps it from
// jittering on fast mouse moves.
const DEFAULT_LERP = 0.32;

export const CURSOR_VARIANTS: Record<CursorVariant, CursorVariantConfig> = {
  // Bumped from 10px - the size at rest, i.e. what's on screen almost
  // all the time, and a flat 10px fill was easy to lose against busy
  // or similarly-toned backgrounds (see the ring added in
  // cursor-mark.module.css for the other half of that fix).
  default: { lerp: DEFAULT_LERP, size: 14 },
  button: { lerp: DEFAULT_LERP, size: 20, magneticPull: 0.2 },
  // The brand's primary purple CTA pills only - a bit bigger than a
  // regular button, white instead of purple, with a smiley face (see
  // cursor-mark.module.css/.face in Cursor.tsx). No magnetic pull, by
  // request - the smiley dot just tracks the pointer normally.
  cta: { lerp: DEFAULT_LERP, size: 30 },
  card: { lerp: DEFAULT_LERP, size: 92, label: "View case study" },
  text: { lerp: DEFAULT_LERP, size: 7 },
  video: { lerp: DEFAULT_LERP, size: 92, label: "Play" },
  drag: { lerp: DEFAULT_LERP, size: 16 },
  input: { lerp: DEFAULT_LERP, size: 14 },
  none: { lerp: DEFAULT_LERP, size: 14 },
};

export const CLICK_SQUASH_SCALE = 0.7;
// Element-side mask radii, in px, written onto the hovered element as
// --r-target so its own CSS transition can grow --r toward it.
export const ELEMENT_MASK_RADIUS: Partial<Record<CursorVariant, number>> = {
  text: 90,
};

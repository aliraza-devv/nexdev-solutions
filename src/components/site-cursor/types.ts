// Cursor v2: a registration mark (dot + circle + four crosshair arms)
// that only ever translates, scales, and rotates. It never contains
// text and never morphs into a rectangle. Hover treatment lives on the
// hovered element itself, driven by --mx/--my custom properties this
// system writes onto it (see useCursor.ts and element-mask.css).

export type CursorVariant =
  | "default"
  | "button"
  | "card"
  | "text"
  | "image"
  | "video"
  | "drag"
  | "input"
  | "none";

export interface CursorVariantConfig {
  // Ring (circle + arms) lerp factor toward its target each frame.
  // Lower = more lag/weight. Only "image" overrides the default.
  ringLerp: number;
  // Fraction of the pointer-to-element-center distance the ring's
  // target is pulled toward, "button" only.
  magneticPull?: number;
}

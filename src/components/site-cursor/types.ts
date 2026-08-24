// Cursor v3: a single dot. It only ever translates and resizes, and
// any label (card/video) lives INSIDE that same dot as real text, sized
// in pixels so words wrap cleanly instead of getting magnified by a
// transform scale.

export type CursorVariant =
  | "default"
  | "button"
  | "cta"
  | "card"
  | "text"
  | "video"
  | "drag"
  | "input"
  | "none";

export interface CursorVariantConfig {
  // Dot lerp factor toward its target position each frame. Lower =
  // more lag/weight.
  lerp: number;
  // The dot's diameter in px for this variant.
  size: number;
  // Label text shown inside the dot for this variant, if any.
  label?: string;
  // Fraction of the pointer-to-element-center distance the dot's
  // target is pulled toward, "button" only.
  magneticPull?: number;
}

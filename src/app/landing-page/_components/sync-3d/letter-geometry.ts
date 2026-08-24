import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Each letter is built from extruded box segments on a simple grid, real
// 3D geometry, not a flat texture or a loaded font. Chunky and blocky on
// purpose, it reads as an engineered mark rather than typography.
const THICK = 0.16;
const BAR = 0.16;

function seg(x: number, y: number, w: number, h: number): THREE.BoxGeometry {
  const geo = new THREE.BoxGeometry(w, h, THICK);
  geo.translate(x, y, 0);
  return geo;
}

function buildLetter(segments: THREE.BoxGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(segments, false);
  segments.forEach((g) => g.dispose());
  if (!merged) throw new Error("failed to merge letter geometry");
  merged.center();
  return merged;
}

// S: top bar, upper-left riser, middle bar, lower-right riser, bottom bar
function buildS(): THREE.BufferGeometry {
  return buildLetter([
    seg(0, 0.8, 1.0, BAR),
    seg(-0.42, 0.4, BAR, 0.7),
    seg(0, 0, 1.0, BAR),
    seg(0.42, -0.4, BAR, 0.7),
    seg(0, -0.8, 1.0, BAR),
  ]);
}

// Y: two short risers converging into one stem
function buildY(): THREE.BufferGeometry {
  const left = seg(-0.28, 0.55, BAR, 0.7);
  left.rotateZ(Math.PI / 5);
  const right = seg(0.28, 0.55, BAR, 0.7);
  right.rotateZ(-Math.PI / 5);
  return buildLetter([left, right, seg(0, -0.1, BAR, 0.9)]);
}

// N: two verticals and one diagonal
function buildN(): THREE.BufferGeometry {
  const diagonal = seg(0, 0, BAR, 1.5);
  diagonal.rotateZ(Math.PI / 2.6);
  return buildLetter([seg(-0.45, 0, BAR, 1.6), seg(0.45, 0, BAR, 1.6), diagonal]);
}

// C: top bar, left stem, bottom bar, open on the right
function buildC(): THREE.BufferGeometry {
  return buildLetter([seg(0, 0.72, 1.0, BAR), seg(-0.42, 0, BAR, 1.6), seg(0, -0.72, 1.0, BAR)]);
}

export const LETTER_GEOMETRY_BUILDERS: Record<"S" | "Y" | "N" | "C", () => THREE.BufferGeometry> = {
  S: buildS,
  Y: buildY,
  N: buildN,
  C: buildC,
};

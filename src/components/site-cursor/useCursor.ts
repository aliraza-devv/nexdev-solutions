"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CURSOR_VARIANTS, CLICK_SQUASH_SCALE, ELEMENT_MASK_RADIUS } from "./variants";
import type { CursorVariant } from "./types";

const READY_CLASS = "cursor-ready";

// Magnetic button pull: only applied to compact elements (real
// buttons/pills), never full-width rows like nav links or FAQ
// triggers, where the whole row shifting would just look broken.
const MAGNETIC_MAX_WIDTH = 420;
const MAGNETIC_MAX_HEIGHT = 120;
const MAGNETIC_PULL = 0.35;
const MAGNETIC_MAX_OFFSET = 14;
const MAGNETIC_RELEASE_TRANSITION = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";

// Clears everything this system ever writes onto a hovered element:
// the mask position/radius vars, the card tilt transform, and the
// magnetic button offset. A plain top-level function (not defined
// inside the effect) so both the route-change reset and the live
// pointer-tracking effect can call the exact same cleanup. The
// release transition is set right before clearing so the snap-back
// eases out instead of cutting instantly - the live-tracking writes
// in tick() never set a transition, only this release does.
function clearElementVars(el: HTMLElement) {
  delete el.dataset.cursorHovered;
  el.style.removeProperty("--mx");
  el.style.removeProperty("--my");
  el.style.removeProperty("--r-target");
  if (el.style.transform) {
    el.style.transition = MAGNETIC_RELEASE_TRANSITION;
    el.style.transform = "";
  }
}

// Cursor position, variant, hovered element, click state: all refs,
// all written straight to the DOM. The only React state is `enabled`,
// which only flips on a touch/reduced-motion media query change,
// never on pointer movement, so it can't cause a re-render on
// pointermove no matter how the rest of the app renders.
export function useCursor() {
  const dotLayerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  const pointer = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const dotSize = useRef(10);
  const squashFactor = useRef(1);
  const variant = useRef<CursorVariant>("default");
  const hoveredEl = useRef<HTMLElement | null>(null);
  const hoveredRect = useRef<DOMRect | null>(null);
  const hasMoved = useRef(false);
  const isKeyboardNav = useRef(false);
  const isVisible = useRef(false);
  const isDown = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!coarse.matches && !reduced.matches);
    update();
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Route change: a stale variant or --mx/--my on some element from
  // the previous page must not persist onto the next one.
  useEffect(() => {
    variant.current = "default";
    if (hoveredEl.current) clearElementVars(hoveredEl.current);
    hoveredEl.current = null;
    hoveredRect.current = null;
    if (dotRef.current) dotRef.current.dataset.variant = "default";
    if (labelRef.current) labelRef.current.textContent = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(READY_CLASS);
      return;
    }

    const dotLayer = dotLayerRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dotLayer || !dot || !label) return;

    function setCustomCursorVisible(visible: boolean) {
      isVisible.current = visible;
      dotLayer!.style.opacity = visible ? "" : "0";
      document.documentElement.classList.toggle(READY_CLASS, visible);
    }

    function recomputeHoveredRect() {
      if (!hoveredEl.current) return;
      hoveredRect.current = hoveredEl.current.getBoundingClientRect();
    }

    function writeElementVars(el: HTMLElement, nextVariant: CursorVariant) {
      const radius = ELEMENT_MASK_RADIUS[nextVariant];
      if (radius !== undefined) {
        el.style.setProperty("--r-target", `${radius}px`);
      }
      el.dataset.cursorHovered = "true";
    }

    function applyVariant(next: CursorVariant, el: HTMLElement | null) {
      if (hoveredEl.current && hoveredEl.current !== el) {
        clearElementVars(hoveredEl.current);
      }

      variant.current = next;
      hoveredEl.current = el;
      hoveredRect.current = el ? el.getBoundingClientRect() : null;

      // A fresh hover tracks the pointer directly, no easing - only
      // the release (clearElementVars) gets a transition.
      if (next === "button" && el) {
        el.style.transition = "";
      }

      dot!.dataset.variant = next;
      label!.textContent = CURSOR_VARIANTS[next].label ?? "";

      if (el && next === "text") {
        writeElementVars(el, next);
      }
    }

    function updateMaskPosition() {
      const el = hoveredEl.current;
      const rect = hoveredRect.current;
      if (!el || !rect || rect.width === 0 || rect.height === 0) return;
      const mx = ((pointer.current.x - rect.left) / rect.width) * 100;
      const my = ((pointer.current.y - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    }

    function handleMouseMove(e: MouseEvent) {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      if (!hasMoved.current) {
        hasMoved.current = true;
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
      }
      if (isKeyboardNav.current) {
        isKeyboardNav.current = false;
        setCustomCursorVisible(true);
      }
      updateMaskPosition();
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target instanceof HTMLElement ? e.target.closest<HTMLElement>("[data-cursor]") : null;
      if (!target) {
        if (variant.current !== "default") applyVariant("default", null);
        return;
      }
      if (target === hoveredEl.current) return;
      const next = (target.dataset.cursor as CursorVariant | undefined) ?? "default";
      applyVariant(next, target);
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target instanceof HTMLElement ? e.target.closest<HTMLElement>("[data-cursor]") : null;
      if (!target || target !== hoveredEl.current) return;
      const related = e.relatedTarget instanceof Node ? e.relatedTarget : null;
      if (related && target.contains(related)) return;
      applyVariant("default", null);
    }

    function handleMouseDown() {
      isDown.current = true;
      squashFactor.current = CLICK_SQUASH_SCALE;
    }
    function handleMouseUp() {
      isDown.current = false;
      squashFactor.current = 1;
    }

    function handleScrollOrResize() {
      recomputeHoveredRect();
    }

    function handleWindowBlur() {
      setCustomCursorVisible(false);
    }
    function handleWindowFocus() {
      if (!isKeyboardNav.current) setCustomCursorVisible(true);
    }
    function handleDocumentMouseLeave() {
      setCustomCursorVisible(false);
    }
    function handleDocumentMouseEnter() {
      if (!isKeyboardNav.current) setCustomCursorVisible(true);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        isKeyboardNav.current = true;
        setCustomCursorVisible(false);
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseLeave);
    document.addEventListener("mouseenter", handleDocumentMouseEnter);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    function tick() {
      const currentVariant = variant.current;
      const config = CURSOR_VARIANTS[currentVariant];

      if (hasMoved.current && !isVisible.current && !isKeyboardNav.current) {
        setCustomCursorVisible(true);
      }

      let targetX = pointer.current.x;
      let targetY = pointer.current.y;
      if ((currentVariant === "button" || currentVariant === "cta") && hoveredEl.current && config.magneticPull) {
        const rect = hoveredEl.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = pointer.current.x + (cx - pointer.current.x) * config.magneticPull;
        targetY = pointer.current.y + (cy - pointer.current.y) * config.magneticPull;
      }
      dotPos.current.x += (targetX - dotPos.current.x) * config.lerp;
      dotPos.current.y += (targetY - dotPos.current.y) * config.lerp;

      const wantSize = config.size * (isDown.current ? squashFactor.current : 1);
      dotSize.current += (wantSize - dotSize.current) * 0.3;

      dotLayer!.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      dot!.style.setProperty("--dot-size", `${dotSize.current.toFixed(1)}px`);

      // Card tilt: applied to the hovered element itself (never the
      // cursor), capped at 4deg per axis. This element isn't Framer
      // Motion controlled, so writing its transform directly can't
      // fight an animated scale/opacity owned elsewhere. Clearing on
      // leave happens in applyVariant/clearElementVars, not here.
      if (currentVariant === "card" && hoveredEl.current && hoveredRect.current) {
        const rect = hoveredRect.current;
        const relX = (pointer.current.x - rect.left) / rect.width - 0.5;
        const relY = (pointer.current.y - rect.top) / rect.height - 0.5;
        const maxTiltDeg = 4;
        hoveredEl.current.style.transform = `perspective(700px) rotateX(${(-relY * maxTiltDeg).toFixed(2)}deg) rotateY(${(relX * maxTiltDeg).toFixed(2)}deg)`;
      }

      // Magnetic button: the button itself drifts toward the pointer,
      // not just the cursor dot toward the button - that's what makes
      // it read as an actual magnetic pull instead of a cursor trick.
      // Skipped on full-width rows (nav links, FAQ triggers) where the
      // whole row shifting would look broken, not magnetic.
      if ((currentVariant === "button" || currentVariant === "cta") && hoveredEl.current && hoveredRect.current) {
        const rect = hoveredRect.current;
        if (rect.width <= MAGNETIC_MAX_WIDTH && rect.height <= MAGNETIC_MAX_HEIGHT) {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = pointer.current.x - cx;
          const dy = pointer.current.y - cy;
          const ox = Math.max(-MAGNETIC_MAX_OFFSET, Math.min(MAGNETIC_MAX_OFFSET, dx * MAGNETIC_PULL));
          const oy = Math.max(-MAGNETIC_MAX_OFFSET, Math.min(MAGNETIC_MAX_OFFSET, dy * MAGNETIC_PULL));
          hoveredEl.current.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseLeave);
      document.removeEventListener("mouseenter", handleDocumentMouseEnter);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      if (hoveredEl.current) clearElementVars(hoveredEl.current);
      document.documentElement.classList.remove(READY_CLASS);
    };
  }, [enabled]);

  return { dotLayerRef, dotRef, labelRef, enabled };
}

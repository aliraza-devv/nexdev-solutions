"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CURSOR_VARIANTS, CLICK_SQUASH_SCALE, ELEMENT_MASK_RADIUS } from "./variants";
import type { CursorVariant } from "./types";

const READY_CLASS = "cursor-ready";

// Clears everything this system ever writes onto a hovered element:
// the mask position/radius vars and the card tilt transform. A plain
// top-level function (not defined inside the effect) so both the
// route-change reset and the live pointer-tracking effect can call the
// exact same cleanup.
function clearElementVars(el: HTMLElement) {
  delete el.dataset.cursorHovered;
  el.style.removeProperty("--mx");
  el.style.removeProperty("--my");
  el.style.removeProperty("--r-target");
  if (el.style.transform) el.style.transform = "";
}

// Cursor position, ring easing, variant, hovered element, click state:
// all refs, all written straight to the DOM. The only React state is
// `enabled`, which only flips on a touch/reduced-motion media query
// change, never on pointer movement, so it can't cause a re-render on
// pointermove no matter how the rest of the app renders.
export function useCursor() {
  const dotLayerRef = useRef<HTMLDivElement>(null);
  const ringLayerRef = useRef<HTMLDivElement>(null);
  const dotRotateRef = useRef<HTMLDivElement>(null);
  const ringRotateRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  const pointer = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const ringScale = useRef(1);
  const targetScale = useRef(1);
  const variant = useRef<CursorVariant>("default");
  const rotation = useRef(0);
  const hoveredEl = useRef<HTMLElement | null>(null);
  const hoveredRect = useRef<DOMRect | null>(null);
  const hasMoved = useRef(false);
  const isKeyboardNav = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);
  const activeVideo = useRef<HTMLVideoElement | null>(null);

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

  // Route change: a stale variant, rotation, tilt, or --mx/--my on some
  // element from the previous page must not persist onto the next one.
  useEffect(() => {
    variant.current = "default";
    if (hoveredEl.current) clearElementVars(hoveredEl.current);
    hoveredEl.current = null;
    hoveredRect.current = null;
    if (dotRotateRef.current) dotRotateRef.current.dataset.variant = "default";
    if (ringRotateRef.current) ringRotateRef.current.dataset.variant = "default";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(READY_CLASS);
      return;
    }

    const dotLayer = dotLayerRef.current;
    const ringLayer = ringLayerRef.current;
    const dotRotate = dotRotateRef.current;
    const ringRotate = ringRotateRef.current;
    if (!dotLayer || !ringLayer || !dotRotate || !ringRotate) return;

    function setCustomCursorVisible(visible: boolean) {
      isVisible.current = visible;
      dotLayer!.style.opacity = visible ? "" : "0";
      ringLayer!.style.opacity = visible ? "" : "0";
      document.documentElement.classList.toggle(READY_CLASS, visible);
    }

    function handleVideoStateChange() {
      if (!ringRotate) return;
      ringRotate.dataset.playing = activeVideo.current && !activeVideo.current.paused ? "true" : "false";
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
      if (activeVideo.current) {
        activeVideo.current.removeEventListener("play", handleVideoStateChange);
        activeVideo.current.removeEventListener("pause", handleVideoStateChange);
        activeVideo.current = null;
      }

      if (next !== variant.current) {
        rotation.current += 45;
        dotRotate!.style.setProperty("--rot", `${rotation.current}deg`);
        ringRotate!.style.setProperty("--rot", `${rotation.current}deg`);
      }

      variant.current = next;
      hoveredEl.current = el;
      hoveredRect.current = el ? el.getBoundingClientRect() : null;

      dotRotate!.dataset.variant = next;
      ringRotate!.dataset.variant = next;

      if (el && (next === "card" || next === "text" || next === "image")) {
        writeElementVars(el, next);
      }

      if (next === "video" && el) {
        const video = el instanceof HTMLVideoElement ? el : el.querySelector("video");
        if (video) {
          activeVideo.current = video;
          video.addEventListener("play", handleVideoStateChange);
          video.addEventListener("pause", handleVideoStateChange);
          handleVideoStateChange();
        }
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
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
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
      targetScale.current = CLICK_SQUASH_SCALE;
    }
    function handleMouseUp() {
      targetScale.current = 1;
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

      dotLayer!.style.transform = `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0)`;

      let targetX = pointer.current.x;
      let targetY = pointer.current.y;
      if (currentVariant === "button" && hoveredEl.current && config.magneticPull) {
        const rect = hoveredEl.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = pointer.current.x + (cx - pointer.current.x) * config.magneticPull;
        targetY = pointer.current.y + (cy - pointer.current.y) * config.magneticPull;
      }
      ringPos.current.x += (targetX - ringPos.current.x) * config.ringLerp;
      ringPos.current.y += (targetY - ringPos.current.y) * config.ringLerp;
      ringScale.current += (targetScale.current - ringScale.current) * 0.25;

      ringLayer!.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${ringScale.current})`;

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
      if (activeVideo.current) {
        activeVideo.current.removeEventListener("play", handleVideoStateChange);
        activeVideo.current.removeEventListener("pause", handleVideoStateChange);
      }
      if (hoveredEl.current) clearElementVars(hoveredEl.current);
      document.documentElement.classList.remove(READY_CLASS);
    };
  }, [enabled]);

  return { dotLayerRef, ringLayerRef, dotRotateRef, ringRotateRef, enabled };
}

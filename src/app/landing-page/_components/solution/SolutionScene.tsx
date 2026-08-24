"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface PointerState {
  x: number;
  y: number;
}

export interface SceneBuilder {
  // Existing builders (PlaneStack, Pipe) only declare the first two
  // params and JS/TS both allow that: a function is assignable wherever
  // fewer of its trailing parameters are used, so adding pointer here
  // does not require touching either of them.
  update: (elapsed: number, delta: number, pointer: PointerState) => void;
  dispose: () => void;
}

export type BuildScene = (args: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}) => SceneBuilder;

interface SolutionSceneProps {
  buildScene: BuildScene;
  className?: string;
  // Degrees the camera eases toward the pointer on each axis. Solution
  // A/B both rely on the default of 3, this section asks for 4.
  maxParallaxDeg?: number;
}

function isWebglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// The one reusable Three.js scene both variants render into. Owns the
// renderer, camera, lighting, resize, pointer parallax, visibility
// gating, and the single requestAnimationFrame loop for the whole
// section. Each variant supplies its own geometry through `buildScene`
// and only has to implement `update` and `dispose`.
export default function SolutionScene({
  buildScene,
  className = "",
  maxParallaxDeg = 3,
}: SolutionSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebglAvailable());
  }, []);

  useEffect(() => {
    if (!webglAvailable) return;
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    const baseRotation = { x: camera.rotation.x, y: camera.rotation.y };

    // Light reads from the upper left, matching the rest of the site.
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(-5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa89bff, 0.35);
    fillLight.position.set(5, -3, 4);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    const builder = buildScene({ scene, camera, renderer });

    function resize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    function handlePointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove);

    let sectionVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    let tabVisible = !document.hidden;
    function handleVisibilityChange() {
      tabVisible = !document.hidden;
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let rafId = 0;
    let lastTime = performance.now();
    const maxParallaxRad = THREE.MathUtils.degToRad(maxParallaxDeg);

    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (!sectionVisible || !tabVisible) return;

      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.05;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.05;
      camera.rotation.y = baseRotation.y + pointerCurrent.x * maxParallaxRad;
      camera.rotation.x = baseRotation.x - pointerCurrent.y * maxParallaxRad;

      builder.update(now / 1000, delta, pointerCurrent);
      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      builder.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [buildScene, webglAvailable]);

  if (!webglAvailable) return null;

  return <div ref={containerRef} className={className} />;
}

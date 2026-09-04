"use client";

import React, { useEffect, useMemo } from "react";
import SolutionScene from "../solution/SolutionScene";
import { createSyncPanelsScene, type SyncPanelsApi } from "./SyncPanels";

interface SyncPanelsSceneProps {
  className?: string;
  onReady?: (api: SyncPanelsApi) => void;
  onHoverChange?: (index: number | null) => void;
}

// Client-only wrapper so the panel/particle/glass Three.js code only ever
// loads through a dynamic import, never in the server bundle.
export default function SyncPanelsScene({
  className,
  onReady,
  onHoverChange,
}: SyncPanelsSceneProps) {
  const { buildScene, api } = useMemo(
    () => createSyncPanelsScene(onHoverChange),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    onReady?.(api);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return <SolutionScene buildScene={buildScene} className={className} maxParallaxDeg={4} />;
}

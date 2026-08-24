"use client";

import Navbar from "../_components/Navbar";
import SyncMethod3D from "../_components/sync-3d/SyncMethod3D";
import FinalCTA from "../_components/FinalCTA";

export default function SyncMethod3DPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <SyncMethod3D />
      </div>
      <FinalCTA />
    </main>
  );
}

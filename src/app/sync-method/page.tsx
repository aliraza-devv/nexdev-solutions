'use client';

import Navbar from '../_components/Navbar';
import SyncMethod from '../_components/SyncMethod';
import FinalCTA from '../_components/FinalCTA';

export default function SyncMethodPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <SyncMethod />
      </div>
      <FinalCTA />
    </main>
  );
}

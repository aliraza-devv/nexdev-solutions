'use client';

import Navbar from '@/components/new-design/Common/Navbar';
import SyncMethod from '@/components/new-design/SyncMethod/SyncMethod';
import FinalCTA from '@/components/new-design/Common/FinalCTA';

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

'use client';

import Navbar from '../_components/Navbar';
import FinalCTA from '../_components/FinalCTA';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-[10px] font-bold tracking-[0.4em] text-[#5C45FD] uppercase mb-4">
            GET IN TOUCH
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0A0A0E] mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-zinc-500 font-medium italic">
            COMING SOON
          </p>
        </motion.div>
      </div>

      <FinalCTA />
    </main>
  );
}

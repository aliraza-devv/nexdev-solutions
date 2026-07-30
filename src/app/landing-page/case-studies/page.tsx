'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../_components/Navbar';
import FinalCTA from '../_components/FinalCTA';

const industries = ['All', 'E-commerce', 'Service Business', 'SaaS'];

interface CaseStudy {
  client: string;
  industry: 'E-commerce' | 'Service Business' | 'SaaS';
  title: string;
  desc: string;
  results: { value: string; label: string }[];
  href: string;
}

// Same clients/numbers already established in the homepage Results section
// - kept in sync rather than reinvented here.
const caseStudies: CaseStudy[] = [
  {
    client: 'Bamper',
    industry: 'E-commerce',
    title: 'Shopify store built for a bamboo toilet paper brand',
    desc: 'An e-commerce brand focused on conversion rate and authority, built to sell products fast.',
    results: [
      { value: '60 Days', label: 'Sold-Out Stock' },
      { value: '4.2%', label: 'Conversion Rate' },
    ],
    href: '/landing-page/case-studies/case-study-bamper',
  },
  {
    client: 'Reality Cheque',
    industry: 'Service Business',
    title: "Built Pakistan's biggest coaching platform",
    desc: 'Rebuilt the coaching site focused on increasing conversion rate and brand authority.',
    results: [
      { value: '51.12%', label: 'Conversion Lift' },
      { value: '407', label: 'Members in 24 Hrs' },
    ],
    href: '/landing-page/case-studies/case-study-reality-cheque-coaching',
  },
  {
    client: 'Reality Cheque',
    industry: 'Service Business',
    title: 'Built a lead-gen funnel for their service business',
    desc: 'A funnel engineered specifically to book high-qualified leads on autopilot.',
    results: [
      { value: '70+', label: 'Leads in 2 Weeks' },
      { value: '26×', label: 'ROAS' },
    ],
    href: '/landing-page/case-studies/case-study-reality-cheque-funnel',
  },
  {
    client: 'Vantage Metrics',
    industry: 'SaaS',
    title: 'Turned a confusing trial flow into a paid-conversion engine',
    desc: 'Simplified onboarding and pricing clarity for a B2B analytics platform.',
    results: [
      { value: '+47%', label: 'Trial-to-Paid' },
      { value: '+80%', label: 'Demo Bookings' },
    ],
    href: '#',
  },
  {
    client: 'Loopwise',
    industry: 'SaaS',
    title: 'Cut churn with a homepage that sets the right expectations',
    desc: 'Repositioned messaging and onboarding flow for a workflow automation tool.',
    results: [
      { value: '+36%', label: 'Free-to-Paid' },
      { value: '-22%', label: 'Churn Rate' },
    ],
    href: '#',
  },
];

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={cs.href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-[#14141A]/90 shadow-xl transition-all hover:border-[#5C45FD]/30 hover:shadow-[0_20px_50px_-15px_rgba(92,69,253,0.25)]"
    >
      {/* Mockup placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative aspect-video w-full rounded-xl border border-white/5 bg-[#222235]">
            <div className="absolute left-3 top-3 h-2 w-10 rounded-full bg-white/5" />
            <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full border border-white/10" />
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {cs.industry}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-block self-start rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0A0A0E]">
          {cs.client}
        </span>
        <h3
          className="mb-2 text-lg font-bold leading-snug text-white"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {cs.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-white/50">{cs.desc}</p>

        <div className="mt-auto flex items-center gap-6 border-t border-white/10 pt-5">
          {cs.results.map((r) => (
            <div key={r.label}>
              <div
                className="text-xl font-bold text-[#5C45FD]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {r.value}
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                {r.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#5C45FD] transition-all group-hover:gap-3">
          Read the Story <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const filtered =
    filter === 'All' ? caseStudies : caseStudies.filter((cs) => cs.industry === filter);

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[1280px] text-center"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5C45FD]">
            Portfolio
          </div>
          <h1
            className="text-[#0A0A0E] tracking-tighter"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(32px, 6vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Real results, real clients.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-500">
            Every project, filtered by industry — see exactly what we did and what it moved.
          </p>
        </motion.div>
      </section>

      {/* Industry Filter Pills */}
      <section className="px-6 md:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                filter === ind
                  ? 'bg-[#5C45FD] text-white shadow-lg shadow-[#5C45FD]/25'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-8 text-sm font-medium text-zinc-400">
            Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
          {/* Plain conditional rendering (no AnimatePresence/exit) so a
              filtered-out card disappears immediately via React's normal
              reconciliation instead of waiting on an exit animation to
              finish before unmounting - `layout` alone still smoothly
              reflows the cards that remain. */}
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cs) => (
              <motion.div
                key={`${cs.client}-${cs.title}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaseStudyCard cs={cs} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

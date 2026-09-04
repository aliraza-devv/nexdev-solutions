'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  // Only set for clients with a real screenshot - the same asset the
  // homepage Results section already uses. Cards without one keep the
  // decorative placeholder rather than showing a fabricated photo.
  image?: string;
  // Temporary: copy on these case studies is being revised. The card
  // renders disabled with a "Coming Soon" badge instead of a link, and
  // the detail page itself redirects back here - see that page's own
  // comment for how to re-enable once the copy is ready.
  comingSoon?: boolean;
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
    href: '/case-studies/case-study-bamper',
    image: '/assets/case-studies/Bamper-case-study.webp',
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
    href: '/case-studies/case-study-reality-cheque',
    image: '/assets/case-studies/Reality-cheque-case-study.webp',
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
    href: '/case-studies/case-study-reality-cheque-funnel',
    image: '/assets/case-studies/RealityChequeDFY-case-study.webp',
  },
  {
    client: 'Smarterform',
    industry: 'SaaS',
    title: 'Built a secure form-building SaaS platform',
    desc: 'A drag-and-drop, multi-step form builder for law firms and compliance teams. MVP fast enough to raise on, then a full secure build.',
    results: [
      { value: '2 Weeks', label: 'To Secure Investor' },
      { value: '30 Days', label: 'MVP Shipped' },
    ],
    href: '/case-studies/case-study-smarterform',
    image: '/assets/case-studies/Smarterform-case-study.webp',
  },
  {
    client: 'The HDDs',
    industry: 'E-commerce',
    title: 'A brand-new store that got orders before it even launched',
    desc: 'A refurbished storage e-commerce brand built from zero, competing with household names on trust, not just price.',
    results: [
      { value: 'Pre-Launch', label: 'Organic Orders' },
      { value: '5 Weeks', label: 'Store Built' },
    ],
    href: '/case-studies/case-study-thehdds',
    image: '/assets/case-studies/TheHDDs-case-study.webp',
  },
  {
    client: 'The We One',
    industry: 'Service Business',
    title: '42% of Meta ad leads qualified before they touched the calendar',
    desc: 'A four-page funnel that filters cold Meta traffic before it ever reaches the sales calendar.',
    results: [
      { value: '42%', label: 'Qualified Lead Rate' },
      { value: '74%', label: 'Show Rate' },
    ],
    href: '/case-studies/case-study-the-we-one',
    image: '/assets/case-studies/TheWeOne-approach-1.webp',
    comingSoon: true,
  },
  {
    client: 'Innvente',
    industry: 'Service Business',
    title: '$127 per qualified founder lead for a Y Combinator-trusted dev agency',
    desc: 'A qualification funnel that turned cold ad traffic into discovery calls with funded founders.',
    results: [
      { value: '$127', label: 'Cost Per Qualified Lead' },
      { value: '71%', label: 'Show Rate' },
    ],
    href: '/case-studies/case-study-innvente',
    image: '/assets/case-studies/Innvente-approach-1.webp',
    comingSoon: true,
  },
  {
    client: 'The Scaleup Lab',
    industry: 'Service Business',
    title: '47% of Meta ad leads qualified as launch-ready product founders',
    desc: 'A crowdfunding launch agency needed a funnel that separated real product founders from idea-stage browsers. We built a landing page and qualifier that cut their cost per qualified lead by more than half.',
    results: [
      { value: '47%', label: 'Qualified Lead Rate' },
      { value: '$89', label: 'Cost Per Qualified Lead' },
    ],
    href: '/case-studies/case-study-the-scaleup-lab',
    image: '/assets/case-studies/TheScaleupLab-approach-1.webp',
    comingSoon: true,
  },
];

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const comingSoon = cs.comingSoon ?? false;
  // Same markup either way - only the wrapping element and a few classes
  // differ - so a card doesn't visually jump around when comingSoon flips
  // back off later. Plain <div>, not <Link>, while disabled: no href
  // anywhere means there's nothing to click or navigate through, on top
  // of the detail page's own redirect guard (see that page.tsx).
  const Wrapper = comingSoon ? 'div' : Link;
  const wrapperProps = comingSoon
    ? { 'aria-disabled': true }
    : { href: cs.href, 'data-cursor': 'card' };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0A0A0E] shadow-xl transition-all ${
        comingSoon
          ? 'cursor-not-allowed opacity-60'
          : 'hover:border-[#5C45FD]/30 hover:shadow-[0_20px_50px_-15px_rgba(92,69,253,0.25)]'
      }`}
    >
      {/* Real screenshot when we have one, otherwise the decorative
          placeholder - never a fabricated photo. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
        {cs.image ? (
          <Image
            src={cs.image}
            alt={cs.client}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className={`object-cover ${comingSoon ? 'grayscale' : ''}`}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative aspect-video w-full rounded-xl border border-white/5 bg-[#222235]">
                <div className="absolute left-3 top-3 h-2 w-10 rounded-full bg-white/5" />
                <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full border border-white/10" />
              </div>
            </div>
          </>
        )}
        {comingSoon ? (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A0A0E]">
            Coming Soon
          </span>
        ) : (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A0A0E]">
            {cs.industry}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="mb-5 text-lg font-bold leading-snug text-white"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {cs.title}
        </h3>

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

        {comingSoon ? (
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
            Coming Soon
          </div>
        ) : (
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all group-hover:gap-3">
            Read the Story <ArrowRight className="h-3.5 w-3.5 text-[#5C45FD]" />
          </div>
        )}
      </div>
    </Wrapper>
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
            Every project, filtered by industry. See exactly what we did and what it moved.
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

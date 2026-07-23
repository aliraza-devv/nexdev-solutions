import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import LogosStrip from './_components/Logos';
import Problem from './_components/Problem';
import Solution from './_components/Solution';
import OurProcess from './_components/OurProcess';
import Results from './_components/Results';
import Testimonials from './_components/Testimonials';
import Deliverables from './_components/Deliverables';
import WhyUs from './_components/WhyUs';
import FAQ from './_components/FAQ';
import FinalCTA from './_components/FinalCTA';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <LogosStrip />
      <Problem />
      <Solution />
      <OurProcess 
        chipText="HOW WE WORK"
        headingLines={[
          "From first call to a website",
          <span key="converts">that actually <span className="text-[#5C45FD] italic">converts.</span></span>
        ]}
        layers={[
          {
            letter: '1',
            title: 'DISCOVERY & RESEARCH',
            desc: "A deep-dive strategy session mapping your audience, competitors, and conversion gaps before we build. This is where others skip ahead. We don't."
          },
          {
            letter: '2',
            title: 'SYNC METHOD AUDIT',
            desc: "We analyze sales architecture, narrative positioning, cognitive layouts, and conversion flows — mapping every decision in advance to give design a clear job."
          },
          {
            letter: '3',
            title: 'DESIGN & DEVELOPMENT',
            desc: "Psychology-informed layouts, high-conversion copy, lightning-fast development, and CTA engineering built together as a single unified system."
          },
          {
            letter: '4',
            title: 'LAUNCH & SUPPORT',
            desc: "Full SEO foundation, conversion tracking setup, and speed optimizations combined with 60 days of monitoring to guarantee top performance."
          }
        ]}
      />
      <Results />
      <Testimonials />
      <Deliverables />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

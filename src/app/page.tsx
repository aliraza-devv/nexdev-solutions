import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import LogosStrip from "./_components/Logos";
import Problem from "./_components/Problem";
import ConversionCalculator from "./_components/ConversionCalculator";
import Solution from "./_components/Solution";
import SolutionFlowMap from "./_components/SolutionFlowMap";
import OurProcess from "./_components/OurProcess";
import Results from "./_components/Results";
import Testimonials from "./_components/Testimonials";
import ReviewsMarquee from "./_components/ReviewsMarquee";
import Deliverables from "./_components/Deliverables";
import WhyUs from "./_components/WhyUs";
import FAQ from "./_components/FAQ";
import FinalCTA from "./_components/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="min-1281:flex min-1281:h-[100dvh] min-1281:flex-col">
        <Hero />
        <LogosStrip />
      </div>
      <Problem />
      {/* Solution temporarily hidden while SolutionFlowMap is reviewed
          in its place, per request. Swap back by uncommenting this and
          removing SolutionFlowMap below. */}
      {/* <Solution /> */}
      <SolutionFlowMap />
      <OurProcess
        chipText="HOW WE WORK"
        headingLines={[
          "From first call to a website",
          <span key="converts">
            that actually{" "}
            <span className="text-[#5C45FD] italic">converts.</span>
          </span>,
        ]}
        layers={[
          {
            letter: "1",
            title: "DISCOVERY & RESEARCH",
            desc: "We map your audience, your competitors, and every reason people leave. Most agencies skip this. That's why their sites don't sell.",
          },
          {
            letter: "2",
            title: "SYNC METHOD AUDIT",
            desc: "We figure out what your page needs to do before we decide how it looks. Design gets a job, not a guess.",
          },
          {
            letter: "3",
            title: "DESIGN & DEVELOPMENT",
            desc: "Psychology-informed layouts, high-conversion copy, lightning-fast development, and CTA engineering built together as a single unified system.",
          },
          {
            letter: "4",
            title: "LAUNCH & SUPPORT",
            desc: "Full SEO foundation, conversion tracking setup, and speed optimizations combined with 30 days monitoring to guarantee top performance.",
          },
        ]}
      />
      <Results />
      <ConversionCalculator />
      <Testimonials />
      <ReviewsMarquee />
      <Deliverables />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

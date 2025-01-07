"use client";
import { useEffect, useState } from "react";
import Faq from "@/sections/Faq";
import Hero from "@/sections/Hero";
import Pricing from "@/sections/Pricing";
import { Process } from "@/sections/Process";
import Services from "@/sections/Services";
import { Reviews } from "@/sections/Reviews";
import { Projects } from "@/sections/Projects";
import Comparison from "@/sections/Comparison";
import Navbar from "@/components/Navbar/Navbar";
import Loader from "@/components/Loader/Loader";
import Footer from "@/components/Footer/Footer";
import Technologies from "@/sections/Technologies";
import { CallToAction } from "@/sections/CallToAction";
import Logo from "@/components/HorizontalLogoSlider/Logo";
import CustomCursor from "@/components/Cursor/CustomCursor";
import PainPoint from "@/sections/PainPoint";
import { AboutFounder } from "@/sections/AboutFounder";
import ReviewsImageSlider from "@/components/HorizontalLogoSlider/Reviews";
import Solution from "@/sections/Solution";
import Success from "@/sections/Success";
import CallToActions from "@/components/CallToActions/CallToActions";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center mt-10 items-center overflow-hidden w-full h-[90vh]">
          <Loader />
        </div>
      ) : (
        <main className="w-[100vw]">
          {/* <Cursor /> */}
          {width > 425 && (<CustomCursor />)}
          <div className="w-full flex items-center justify-center">
            <Navbar />
          </div>
          <Hero />
          <PainPoint />
          <Solution />
          <Success />
          <Projects />
          <Reviews />
          <Services />
          <Process />
          <Technologies />
          {/* <ReviewsImageSlider /> */}
          <Pricing />
          <Comparison />
          <CallToAction />
          <AboutFounder />
          <div className="pt-[90px]">
            <h1 className="text-[#f5f5f5] heading-primary sm-20:text-3xl sm-420:text-2xl min-sm:text-xl lg-5:bricolage-font-family flex justify-center items-center font-bold">
              Trusted by 200+ Businesses
            </h1>
          </div>
          <div className="overflow-hidden">
            <Logo />
          </div>
          <Faq />
          <CallToActions />
          <Footer />
        </main>
      )}
    </>
  );
}

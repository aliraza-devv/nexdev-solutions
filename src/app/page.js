"use client";
import { useEffect, useState } from "react";
import Faq from "@/sections/Faq";
import Hero from "@/sections/Hero";
import Pricing from "@/sections/Pricing";
import Process from "@/sections/Process";
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
import Help from "@/sections/Help";
import { AboutFounder } from "@/sections/AboutFounder";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center mt-10 items-center overflow-hidden w-full h-[90vh]">
          <Loader />
        </div>
      ) : (
        <main className="w-[100%] ">
          {/* <Cursor /> */}
          <CustomCursor />
          <div className="w-full flex items-center justify-center">
            <Navbar />
          </div>
          <Hero />
          <Help />
          <Services />
          <Reviews />
          <Projects />
          <Process />
          <Technologies />
          <Pricing />
          <Comparison />
          <CallToAction />
          <AboutFounder />
          <h1 className="text-[#f5f5f5] heading-primary flex justify-center items-center font-bold mt-60 md:mt-5">
            Trusted by 200+ Businesses
          </h1>
          <div className="overflow-hidden">
            <Logo />
          </div>
          <Faq />
          <Footer />
        </main>
      )}
    </>
  );
}

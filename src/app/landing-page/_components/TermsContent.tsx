"use client";

import React from "react";
import Navbar from "./Navbar";
import FinalCTA from "./FinalCTA";

const primaryFont = "Arial, sans-serif";
const secondaryFont = '"Inter", sans-serif';

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[#0A0A0E] font-bold tracking-tight mt-12 mb-4 text-xl md:text-2xl"
      style={{ fontFamily: primaryFont }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#0A0A0E] font-bold mt-6 mb-2"
      style={{ fontFamily: secondaryFont }}
    >
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-zinc-600 leading-relaxed mb-4"
      style={{ fontFamily: secondaryFont }}
    >
      {children}
    </p>
  );
}

export default function TermsContent() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />

      <section className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[760px]">
          <h1
            className="text-[#0A0A0E] tracking-tighter"
            style={{
              fontFamily: primaryFont,
              fontSize: "clamp(28px, 5vw, 46px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            Terms and Conditions
          </h1>
          <p
            className="mt-4 font-bold text-[#0A0A0E]"
            style={{ fontFamily: secondaryFont }}
          >
            NeXDev Solutions
          </p>
          <p className="text-zinc-500" style={{ fontFamily: secondaryFont }}>
            Effective Date: August 2, 2026
          </p>

          <div className="mt-8">
            <H2>General Terms</H2>
            <P>
              This website (the &quot;Site&quot;) is owned and operated by{" "}
              <strong className="text-[#0A0A0E]">NeXDev Solutions</strong> (&quot;Company,&quot;
              &quot;we,&quot; or &quot;us&quot;). By using the Site, you agree to be bound by these Terms
              and Conditions and our Privacy Policy.
            </P>
            <P>
              We may update these Terms from time to time. The latest version will always be available on
              this website with its effective date. Continued use of the Site after changes are posted
              means you accept the updated Terms.
            </P>

            <H2>Intellectual Property Rights</H2>

            <H3>Our Content</H3>
            <P>
              This Site and all materials on it, including designs, copy, graphics, and code, are the
              property of NeXDev Solutions and are protected by copyright, trademark, and other
              intellectual property laws. The Site is provided for your personal, non-commercial use.
            </P>
            <P>
              You may not copy, reproduce, republish, modify, distribute, or create derivative works from
              any material on this Site without our explicit written permission. You may view and print
              individual pages for your own reference, provided you keep all copyright notices intact.
            </P>

            <H3>Case Studies, Testimonials &amp; Project Materials</H3>
            <P>
              If you are a client and provide us with testimonials, reviews, project results, or materials
              related to work we&apos;ve completed for you, you grant NeXDev Solutions permission to use,
              edit, and publish this content, including on our website, in case studies, and in marketing
              materials, unless we agree otherwise in writing. We will always aim to represent your
              feedback and results accurately.
            </P>

            <H2>How We Work With Clients</H2>
            <P>
              We do not process payments through this website. Project fees and payment arrangements are
              agreed directly with you by email, WhatsApp, or during a meeting, and payments are made via
              Wise or Meezan Bank. Specific terms for individual projects (scope, pricing, timelines,
              deliverables) are agreed separately between NeXDev Solutions and the client, and take
              precedence over these general Terms for that engagement.
            </P>

            <H2>Disclaimers</H2>
            <P>
              This Site may contain links to third-party websites. Linking to a third-party site does not
              imply our endorsement of that site or its content.
            </P>
            <P>
              The information on this Site is provided &quot;as is,&quot; without warranties of any kind,
              either express or implied, to the fullest extent permitted by law.
            </P>
            <P>
              You agree to indemnify and hold harmless NeXDev Solutions, its owners, and representatives
              from any claims, damages, or expenses arising from your breach of these Terms.
            </P>

            <H2>Termination</H2>
            <P>
              We reserve the right to restrict or terminate your access to the Site if we determine you
              have violated these Terms or engaged in unlawful or inappropriate conduct.
            </P>

            <H2>Governing Law</H2>
            <P>
              These Terms are governed by the laws of Pakistan, where NeXDev Solutions is registered. Any
              dispute arising under these Terms will be resolved under the jurisdiction of the courts of
              Pakistan, regardless of the client&apos;s location, unless otherwise agreed in a separate
              written project agreement.
            </P>

            <H2>Changes to These Terms</H2>
            <P>
              We may update these Terms periodically. The latest version will always be available on this
              website with its effective date.
            </P>

            <H2>Contact Us</H2>
            <P>For questions about these Terms, contact us at:</P>
            <P>
              <strong className="text-[#0A0A0E]">NeXDev Solutions</strong>
              <br />
              Email:{" "}
              <a href="mailto:info@nexdevsolutions.net" className="text-[#5C45FD] hover:underline">
                info@nexdevsolutions.net
              </a>
              <br />
              Phone:{" "}
              <a
                href="https://wa.me/923081992088"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C45FD] hover:underline"
              >
                +92 308 199 2088
              </a>
              <br />
              Website:{" "}
              <a
                href="https://www.nexdevsolutions.net"
                className="text-[#5C45FD] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.nexdevsolutions.net
              </a>
            </P>

            <P>By using our website and services, you agree to these Terms and Conditions.</P>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

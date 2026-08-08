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

function Label({ children }: { children: React.ReactNode }) {
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

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="list-disc pl-5 space-y-2 text-zinc-600 leading-relaxed mb-4"
      style={{ fontFamily: secondaryFont }}
    >
      {children}
    </ul>
  );
}

export default function PrivacyPolicyContent() {
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
            Privacy Policy
          </h1>
          <p
            className="mt-4 font-bold text-[#0A0A0E]"
            style={{ fontFamily: secondaryFont }}
          >
            NeXDev Solutions
          </p>
          <p
            className="text-zinc-500"
            style={{ fontFamily: secondaryFont }}
          >
            Effective Date: August 2, 2026
          </p>

          <div className="mt-8">
            <H2>1. Information We Collect</H2>

            <Label>Personal Information:</Label>
            <UL>
              <li>Name, email address, phone number, and business/company name</li>
              <li>Project and inquiry details you share with us (by email, WhatsApp, or during a call)</li>
              <li>Meeting and scheduling details when you book a call with us via Cal.com</li>
              <li>Payment-related details you provide to us directly (by email, WhatsApp, or in a meeting) to arrange payment via Wise or Meezan Bank. We do not collect or process payment information through our website.</li>
            </UL>

            <Label>Non-Personal Information:</Label>
            <UL>
              <li>IP address, browser type, device information</li>
              <li>Website usage patterns, collected through Google Analytics and Microsoft Clarity</li>
              <li>Cookies and similar technologies</li>
            </UL>

            <Label>Client Communication:</Label>
            <UL>
              <li>Records of inquiries, consultations, and service requests</li>
              <li>Project scope, feedback, and service history</li>
              <li>Testimonials, reviews, and project materials you provide for use in our marketing and case studies</li>
            </UL>

            <H2>2. How We Use Your Information</H2>
            <P>We use the information we collect to:</P>
            <UL>
              <li>Provide and deliver our design and development services</li>
              <li>Communicate with you about inquiries, projects, and scheduled calls</li>
              <li>Improve our website&apos;s functionality and user experience</li>
              <li>Understand how visitors use our website (via analytics tools)</li>
              <li>Maintain records of your communication and consent preferences</li>
              <li>Showcase completed work, with your permission, through case studies and testimonials</li>
            </UL>

            <H2>3. How We Contact You</H2>
            <P>
              We may contact you by <strong className="text-[#0A0A0E]">email or WhatsApp</strong>, using the
              contact details you&apos;ve given us directly (for example, when you submit an inquiry, book a
              call, or are working with us on a project).
            </P>
            <UL>
              <li>We only contact you using information you&apos;ve provided to us.</li>
              <li>We do not run automated SMS marketing campaigns.</li>
              <li>Message frequency depends on your interactions with us (for example, project updates or call reminders).</li>
              <li>
                You can ask us to stop contacting you at any time by replying to any email or WhatsApp
                message, or by emailing us directly at the address in Section 10.
              </li>
            </UL>

            <H2>4. Information Sharing &amp; Disclosure</H2>
            <P>
              We do not sell, rent, or trade your personal information. We may share information with:
            </P>

            <Label>Service Providers, solely to help us operate:</Label>
            <UL>
              <li>Cal.com, for scheduling and managing calls</li>
              <li>Wise and Meezan Bank, solely to process payments arranged directly with you</li>
              <li>Google Analytics and Microsoft Clarity, for understanding website usage and improving user experience</li>
            </UL>

            <P>
              We may add additional analytics or advertising tools in the future (for example, Meta Pixel).
              If we do, we will update this policy to reflect it.
            </P>

            <Label>Legal Compliance:</Label>
            <UL>
              <li>If required by law, legal process, or to protect our rights</li>
            </UL>

            <Label>Business Transfers:</Label>
            <UL>
              <li>
                In the event of a merger, acquisition, or sale of business assets, your data remains
                protected under the terms of this policy (or its successor)
              </li>
            </UL>

            <H2>5. Data Security</H2>
            <P>We take reasonable steps to protect your personal information, including:</P>
            <UL>
              <li>Secure access controls for our tools and accounts</li>
              <li>Careful handling of any information shared with us directly</li>
              <li>Working only with reputable third-party service providers</li>
            </UL>
            <P>
              No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
              security. We use commercially reasonable efforts to protect your information.
            </P>

            <H2>6. Cookies &amp; Tracking Technologies</H2>
            <P>We use cookies and tools like Google Analytics and Microsoft Clarity to:</P>
            <UL>
              <li>Understand how visitors use our website</li>
              <li>
                See how visitors interact with pages (Microsoft Clarity may record session behavior such as
                clicks and scrolling, to help us improve the site)
              </li>
              <li>Measure and improve our website&apos;s performance</li>
            </UL>
            <P>
              You can control cookies through your browser settings. Disabling cookies may limit some
              website features.
            </P>

            <H2>7. Your Rights &amp; Choices</H2>
            <P>You have the right to:</P>
            <UL>
              <li>Ask what personal information we hold about you</li>
              <li>Request corrections or deletion of your personal information</li>
              <li>Withdraw consent for future communication at any time</li>
              <li>Ask us how your information is used</li>
            </UL>
            <P>To exercise any of these rights, contact us using the details in Section 10.</P>

            <H2>8. International Clients</H2>
            <P>
              We work with clients internationally, including in the United States, United Kingdom,
              Australia, and UAE. If you&apos;re contacting us from outside Pakistan, your information may
              be processed in Pakistan, where NeXDev Solutions is registered. If your local law grants you
              additional data rights, contact us and we&apos;ll do our best to accommodate your request.
            </P>

            <H2>9. Third-Party Links</H2>
            <P>
              Our website may contain links to third-party websites. We are not responsible for their
              privacy practices. This policy applies only to information collected by NeXDev Solutions.
            </P>

            <H2>10. Changes to This Privacy Policy</H2>
            <P>
              We may update this policy from time to time. The latest version will always be available on
              our website with its effective date.
            </P>

            <H2>11. Contact Us</H2>
            <P>
              If you have questions about this Privacy Policy or how we handle your information, contact us
              at:
            </P>
            <P>
              <strong className="text-[#0A0A0E]">NeXDev Solutions</strong>
              <br />
              Email:{" "}
              <a href="mailto:info@nexdevsolutions.net" className="text-[#5C45FD] hover:underline">
                info@nexdevsolutions.net
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+923081992088" className="text-[#5C45FD] hover:underline">
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

            <P>By using our website and services, you agree to this Privacy Policy.</P>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

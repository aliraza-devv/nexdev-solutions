import type { Metadata } from "next";
import { CASE_STUDY } from "./data";
import CaseStudyClient from "./CaseStudyClient";

// Kept as a Server Component (no "use client") specifically so it can export
// Next.js's Metadata API — the interactive page body lives in
// CaseStudyClient.tsx instead. Everything below is derived from CASE_STUDY,
// so editing that one object keeps the SEO tags in sync automatically.

const title = `${CASE_STUDY.client} Case Study — ${CASE_STUDY.agencyName}`;
const metricsLead = CASE_STUDY.metrics
  .map((m) => `${m.label} ${m.change}`)
  .join(", ");
const description = `${metricsLead} — how we rebuilt ${CASE_STUDY.client}'s site into a conversion engine in ${CASE_STUDY.meta.timeline}.`;
const path = "/case-study-nordwell";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    type: "article",
    url: path,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: CASE_STUDY.headline,
    headline: title,
    about: CASE_STUDY.client,
    description,
    author: {
      "@type": "Organization",
      name: CASE_STUDY.agencyName,
    },
    datePublished: CASE_STUDY.meta.year,
    keywords: CASE_STUDY.meta.services.join(", "),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyClient />
    </>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CASE_STUDY } from "./data";
import CaseStudyTemplate from "../_components/CaseStudyTemplate";

const title = `${CASE_STUDY.client} Case Study | ${CASE_STUDY.agencyName}`;
const metricsLead = CASE_STUDY.metrics
  .map((m) => ("change" in m && m.change ? `${m.label} ${m.change}` : m.label))
  .join(", ");
const description = `${metricsLead}. How we rebuilt ${CASE_STUDY.client}'s site into a conversion engine in ${CASE_STUDY.meta.timeline}.`;
const path = "/case-studies/case-study-the-we-one";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "article", url: path },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  // Temporary: copy on this page is being revised - marked "Coming Soon"
  // on the case studies index (see that page's comingSoon flag), and
  // this stops the page itself from being reachable by a direct URL
  // visit too. Remove this one line to bring the real page back once
  // the copy is ready; nothing else here changed.
  redirect("/case-studies");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: CASE_STUDY.headline,
    headline: title,
    about: CASE_STUDY.client,
    description,
    author: { "@type": "Organization", name: CASE_STUDY.agencyName },
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
      <CaseStudyTemplate data={CASE_STUDY} />
    </>
  );
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://nexdevsolutions.net";

// /landing-page is the real site going forward; root ("/") is the legacy
// page being retired once this is fully live, so it's deliberately left out
// of this list rather than listed and then removed later. book-call/confirmed
// is a thank-you page with no standalone SEO value, so it's excluded too.
const LANDING_PAGE_ROUTES = [
  "/landing-page",
  "/landing-page/qualify",
  "/landing-page/book-call",
  "/landing-page/case-studies",
  "/landing-page/case-studies/case-study-bamper",
  "/landing-page/case-studies/case-study-reality-cheque",
  "/landing-page/case-studies/case-study-reality-cheque-funnel",
  "/landing-page/case-studies/case-study-smarterform",
  "/landing-page/case-studies/case-study-thehdds",
  "/landing-page/case-studies/case-study-the-we-one",
  "/landing-page/case-studies/case-study-innvente",
  "/landing-page/case-studies/case-study-the-scaleup-lab",
  "/landing-page/contact",
  "/landing-page/sync-method",
  "/landing-page/sync-method-3d",
  "/landing-page/privacy-policy",
  "/landing-page/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LANDING_PAGE_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/landing-page" ? "weekly" : "monthly",
    priority: path === "/landing-page" ? 1 : 0.7,
  }));
}

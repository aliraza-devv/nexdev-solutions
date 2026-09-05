import type { MetadataRoute } from "next";

const BASE_URL = "https://nexdevsolutions.net";

// The old root ("/") was retired once this site (formerly at /landing-page)
// took over as the real homepage - see src/app/page.legacy.js for that
// disabled page. book-call/confirmed is a thank-you page with no
// standalone SEO value, so it's excluded here.
const SITE_ROUTES = [
  "/",
  "/qualify",
  "/book-call",
  "/case-studies",
  "/case-studies/case-study-bamper",
  "/case-studies/case-study-reality-cheque",
  "/case-studies/case-study-reality-cheque-funnel",
  "/case-studies/case-study-smarterform",
  "/case-studies/case-study-thehdds",
  "/case-studies/case-study-clenvia",
  "/case-studies/case-study-shevat-vitamins",
  "/case-studies/case-study-the-we-one",
  "/case-studies/case-study-innvente",
  "/case-studies/case-study-the-scaleup-lab",
  "/contact",
  "/sync-method",
  "/sync-method-3d",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITE_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

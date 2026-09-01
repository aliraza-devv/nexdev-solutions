import type { MetadataRoute } from "next";

// Deliberately permissive rather than trying to block the legacy root page
// here: root's page.js is a client component, so it can't export its own
// noindex metadata without restructuring its routing into a route group,
// which would mean touching root's file layout. Blocking "/" in this file
// would also disallow every /landing-page path, since robots.txt disallow
// rules match by prefix. The sitemap below already omits root entirely,
// which is the safe lever available without changing root's code.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nexdevsolutions.net/sitemap.xml",
  };
}

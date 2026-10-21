import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cursor from "@/components/site-cursor/Cursor";
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import "@/components/site-cursor/element-mask.css";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Public container ID (visible in page source by design), not a secret.
const GTM_ID = "GTM-KS6ZXGGR";
// Always loads in production builds (Vercel previews included). In development it
// loads only with NEXT_PUBLIC_ENABLE_GTM=true, so local browsing never reaches
// GA4 or Clarity unless you opt in.
const LOAD_GTM = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_GTM === "true";

// Consent Mode v2 defaults. beforeInteractive runs ahead of GTM's
// afterInteractive loader, so every consent type is denied before any tag
// can read it. A saved Accept is restored synchronously right after, still
// before GTM loads, so a returning visitor who accepted is never treated as
// denied. Ad signals are never granted.
const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{var c=JSON.parse(window.localStorage.getItem('${CONSENT_STORAGE_KEY}')||'null');if(c&&c.analytics===true){gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}}catch(e){}`;

export const metadata = {
  // Required so every page's canonical/OG/Twitter URLs resolve as absolute
  // links instead of relative paths - this is inherited site-wide, it's
  // the only place it can be set. Doesn't change this page's own title or
  // description below.
  metadataBase: new URL("https://nexdevsolutions.net"),
  title: "NeXDev Solutions | Conversion-Focused Web Design and Development",
  description:
    "We build conversion-focused websites in WordPress, Shopify, and custom code. Our SYNC Method turns traffic into leads and sales. Book a free strategy call.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* beforeInteractive renders a real <script> element, so it has to sit
          inside <head>. Directly under <html> the browser moves it into
          <head> while parsing, React's tree then no longer matches the DOM,
          and the whole page falls back to client rendering. */}
      <head>
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
        />
      </head>
      {LOAD_GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      <Script src="/tracking.js" strategy="afterInteractive" />
      {/* font-sans/bg-white/text/min-h-screen/antialiased carried over from
          the old landing-page/layout.tsx now that its page lives here as
          the real root - inter.className already applies the actual Inter
          font, so no second font instantiation is needed. */}
      <body
        className={`${inter.className} font-sans bg-white text-[#0A0A0E] min-h-screen w-full antialiased`}
      >
        {LOAD_GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

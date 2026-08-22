import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cursor from "@/components/site-cursor/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import "@/components/site-cursor/element-mask.css";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeXDev Solutions | Conversion-Focused Web Design and Development",
  description:
    "We build conversion-focused websites in WordPress, Shopify, and custom code. Our SYNC Method turns traffic into leads and sales. Book a free strategy call.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

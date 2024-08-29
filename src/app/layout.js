import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "NeXDev Solutions - Website Development Agency - Best Web Developement Agency",
  description:
    "NeXDev solutions is a website development agency. NeXDev Solutions is expert in WordPress, Shopify, Custom, 3D website, and no-code development and design. We help businesses create powerful, engaging and high-cenversion websites which drive more sales, leads, and busiess growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import { Fraunces } from "next/font/google";

// Scoped to this route only — the rest of the site uses Arial/Inter, but a
// case study built to look like award-winning work earns its own editorial
// display face. Exposed as a CSS variable so CaseStudyClient can reference it
// without next/font's generated className leaking outside this route.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fraunces.variable} antialiased`}>{children}</div>
  );
}

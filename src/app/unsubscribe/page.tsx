import type { Metadata } from "next";
import UnsubscribeForm from "./UnsubscribeForm";

// The link in every follow-up email lands here. Not for search engines, and the
// referrer is withheld so the signed link is not passed on to other sites.
export const metadata: Metadata = {
  title: "Unsubscribe | NeXDev Solutions",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function Page({ searchParams }: { searchParams: { t?: string | string[] } }) {
  const token = typeof searchParams.t === "string" ? searchParams.t : "";
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-semibold text-[#5C45FD]">NeXDev Solutions</p>
        <h1
          className="mt-3 text-[#0A0A0E]"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(26px, 5vw, 36px)", lineHeight: 1.15 }}
        >
          Unsubscribe
        </h1>
        <UnsubscribeForm token={token} />
      </div>
    </main>
  );
}

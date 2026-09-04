import type { Metadata } from "next";
import TermsContent from "../_components/TermsContent";

const title = "Terms and Conditions | NeXDev Solutions";
const description =
  "The terms and conditions governing use of the NeXDev Solutions website and services.";
const path = "/terms-and-conditions";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "article", url: path },
  twitter: { card: "summary", title, description },
};

export default function Page() {
  return <TermsContent />;
}

import type { Metadata } from "next";
import PrivacyPolicyContent from "../_components/PrivacyPolicyContent";

const title = "Privacy Policy | NeXDev Solutions";
const description =
  "How NeXDev Solutions collects, uses, and protects your personal information.";
const path = "/privacy-policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "article", url: path },
  twitter: { card: "summary", title, description },
};

export default function Page() {
  return <PrivacyPolicyContent />;
}

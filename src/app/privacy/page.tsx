import type { Metadata } from "next";
import { LegalPlaceholder } from "@/features/auth/legal-placeholder";
import "../account.css";
export const metadata: Metadata = {
  title: "Privacy notice placeholder — Kenny AI Business Studio",
};
export default function Page() {
  return <LegalPlaceholder kind="Privacy notice" />;
}

import type { Metadata } from "next";
import { LegalPlaceholder } from "@/features/auth/legal-placeholder";
import "../account.css";
export const metadata: Metadata = {
  title: "Terms placeholder — Kenny AI Business Studio",
};
export default function Page() {
  return <LegalPlaceholder kind="Terms" />;
}

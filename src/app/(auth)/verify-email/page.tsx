import type { Metadata } from "next";
import { VerificationPreview } from "@/features/auth/verification-preview";
export const metadata: Metadata = {
  title: "Email verification — Kenny AI Business Studio · Demo",
};
export default function Page() {
  return <VerificationPreview />;
}

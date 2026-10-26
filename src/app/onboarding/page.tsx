import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand/brand";
import { ThemeToggle } from "@/components/providers/theme-provider";
import { OnboardingWizard } from "@/features/onboarding/onboarding-wizard";
import "../account.css";
export const metadata: Metadata = {
  title: "Organization setup — Kenny AI Business Studio · Demo",
};
export default function Onboarding() {
  return (
    <div className="account-page onboarding-page">
      <header className="account-header">
        <Brand />
        <div className="account-header-actions">
          <Link href="/">Exit preview</Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" className="onboarding-container">
        <OnboardingWizard />
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { AppShell } from "@/features/app-shell/app-shell";
import "./studio.css";
export const metadata: Metadata = {
  title: "AI Command Center — Kenny AI Business Studio · Demo",
  description:
    "An illustrative frontend command center. No live AI, business data, accounts or payments.",
};
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

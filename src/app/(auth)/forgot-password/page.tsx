import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
export const metadata: Metadata = {
  title: "Reset password — Kenny AI Business Studio · Demo",
};
export default function Page() {
  return <AuthForm mode="forgot-password" />;
}

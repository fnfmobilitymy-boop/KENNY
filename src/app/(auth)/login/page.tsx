import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
export const metadata: Metadata = {
  title: "Login — Kenny AI Business Studio · Demo",
};
export default function Page() {
  return <AuthForm mode="login" />;
}

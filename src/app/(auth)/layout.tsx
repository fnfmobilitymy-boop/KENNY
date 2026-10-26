import { AuthShell } from "@/features/auth/auth-shell";
import "../account.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthShell>{children}</AuthShell>;
}

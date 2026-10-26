import type { ReactNode } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand/brand";
import { ThemeToggle } from "@/components/providers/theme-provider";
import { Orbit } from "@/components/brand/orbit";
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="account-page">
      <header className="account-header">
        <Brand />
        <div className="account-header-actions">
          <Link href="/">Back to website</Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" className="auth-layout">
        <aside
          className="auth-brand-panel"
          aria-label="Kenny studio introduction"
        >
          <p className="eyebrow">ONE CORE. YOUR NEXT CHAPTER.</p>
          <div className="auth-art">
            <Orbit />
            <span className="auth-art-ring" />
          </div>
          <div>
            <h2>
              A little clarity.
              <br />
              <span>More possibility.</span>
            </h2>
            <p className="muted">
              One thoughtful space for your ideas, your team and the work ahead.
            </p>
            <div className="auth-brand-pills">
              <span>Think clearly</span>
              <span>Create intentionally</span>
              <span>Grow together</span>
            </div>
          </div>
          <p className="auth-panel-caption">
            Kenny AI Business Studio · Phase 1
          </p>
        </aside>
        <div className="auth-form-panel">
          <div className="auth-form-content">{children}</div>
          <footer className="account-footnote">
            Frontend preview · Authentication and organization services are not
            connected.
          </footer>
        </div>
      </main>
    </div>
  );
}

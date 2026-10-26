import { Brand } from "@/components/brand/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { ThemeToggle } from "@/components/providers/theme-provider";
import { Orbit } from "@/components/brand/orbit";
import { Card } from "@/components/ui/card";
import { InteractiveShowcase } from "@/features/design-system/showcase";
import { swatches, principles } from "@/demo/design-system";
export default function DesignSystem() {
  return (
    <div className="container">
      <header className="header">
        <Brand />
        <nav aria-label="Design system navigation">
          <a href="#foundation">Foundation</a>
          <a href="#components">Components</a>
          <ButtonLink variant="ghost" href="/">
            View website ↗
          </ButtonLink>
          <ThemeToggle />
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div>
            <p className="eyebrow">Kenny AI Business Studio / Design system</p>
            <h1>
              Intelligence,
              <br />
              <span>with intention.</span>
            </h1>
            <p className="muted">
              A distinct foundation for your AI workspace. Quiet confidence,
              luminous details, and clarity at the core.
            </p>
            <div className="meta">
              <span>M2 / REFINED FOUNDATION</span>
              <span>VIOLET + BLUE / SHARED TOKENS</span>
            </div>
          </div>
          <Orbit />
        </section>
        <section className="section" id="foundation">
          <div className="section-head">
            <h2>A universe of possibilities.</h2>
            <span className="eyebrow">01 / Direction</span>
          </div>
          <div className="grid">
            {principles.map((p) => (
              <Card key={p.title}>
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
              </Card>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="section-head">
            <h2>Color with purpose.</h2>
            <span className="eyebrow">02 / Semantic tokens</span>
          </div>
          <div className="swatches">
            {swatches.map((s) => (
              <div className="swatch" key={s.token}>
                <div
                  className="swatch-color"
                  style={{ background: `var(${s.token})` }}
                />
                <p>{s.name}</p>
                <small>{s.token}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="section" id="components">
          <div className="section-head">
            <h2>Small details. One language.</h2>
            <span className="eyebrow">03 / Interactive primitives</span>
          </div>
          <InteractiveShowcase />
        </section>
        <section className="section">
          <div className="section-head">
            <h2>Made to move with you.</h2>
            <span className="eyebrow">04 / Rhythm & motion</span>
          </div>
          <div className="grid">
            <Card>
              <p className="eyebrow">Typography</p>
              <h3>Clarity comes first.</h3>
              <p className="muted">
                Inter body · Space Grotesk headings · self-hosted Latin fonts ·
                system fallbacks
              </p>
              <code className="token-code">
                Display / Heading / Body / Mono
              </code>
            </Card>
            <Card>
              <p className="eyebrow">Spacing</p>
              <h3>Room for your next idea.</h3>
              <p className="muted">
                A consistent 4px foundation with spacious 16, 24, 32, 48 and
                64px steps.
              </p>
            </Card>
            <Card>
              <p className="eyebrow">Motion</p>
              <h3>Responsive. Never restless.</h3>
              <p className="muted">
                150–300ms transitions. Reduced motion and slow update devices
                use static effects.
              </p>
            </Card>
          </div>
        </section>
        <aside className="notice">
          Phase 1 foundation preview. AI, authentication, organization
          permissions and billing require future backend integrations. This page
          does not provide those services.
        </aside>
      </main>
      <footer className="footer">
        Kenny AI Business Studio © {new Date().getFullYear()} · Design
        foundation · Built for the next chapter.
      </footer>
    </div>
  );
}

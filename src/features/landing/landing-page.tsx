import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Brand } from "@/components/brand/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { AiOrb } from "./ai-orb";
import { DashboardPreview } from "./dashboard-preview";
import { modules, plans, faqs } from "@/demo/landing";
export function LandingPage() {
  return (
    <div className="landing">
      <SiteHeader />
      <main id="main">
        <section
          className="landing-hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <div className="release-tag">
              <span className="tiny-dot" /> YOUR NEXT CHAPTER, REIMAGINED{" "}
              <span>Phase 1 preview</span>
            </div>
            <h1 id="hero-title">
              Big ideas.
              <br />
              <span>One intelligent</span>
              <br />
              business studio.
            </h1>
            <p className="hero-description">
              A new space to think, create and move your business forward. Bring
              your ideas, your team and your next possibility into one orbit.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/signup">
                Get Started <Icon name="diagonal" />
              </ButtonLink>
              <ButtonLink href="#product-preview">
                Explore the studio <Icon name="diagonal" />
              </ButtonLink>
              <ButtonLink href="#modules" variant="ghost">
                Discover the modules <Icon name="down" />
              </ButtonLink>
            </div>
            <p className="hero-note">
              An early look at what we’re building. No sign-up required to
              explore.
            </p>
          </div>
          <AiOrb />
        </section>
        <div className="capability-strip container" aria-label="Product focus">
          <span>ONE CONNECTED VISION</span>
          <p>Create with intention.</p>
          <Icon name="sparkle" />
          <p>Work with context.</p>
          <Icon name="sparkle" />
          <p>Build what’s next.</p>
        </div>
        <section
          id="product-preview"
          className="landing-section container"
          aria-labelledby="preview-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">01 / A CLEARER PERSPECTIVE</p>
              <h2 id="preview-title">
                Your business.
                <br />
                <span className="muted">A whole new point of view.</span>
              </h2>
            </div>
            <p className="section-description">
              A planned command center for the work that matters. Less switching
              contexts. More space to see what comes next.
            </p>
          </div>
          <DashboardPreview />
        </section>
        <section
          id="modules"
          className="landing-section container"
          aria-labelledby="modules-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">02 / YOUR EXPANDING UNIVERSE</p>
              <h2 id="modules-title">
                Many possibilities.
                <br />
                <span className="muted">One connected studio.</span>
              </h2>
            </div>
            <p className="section-description">
              From the first idea to the next business move. Explore our planned
              modules, built around the way you want to work.
            </p>
          </div>
          <p className="roadmap-note">
            <span className="badge">◇ Product roadmap</span> All modules below
            are planned. Live capabilities are not available in this preview.
          </p>
          <div className="module-grid">
            {modules.map((module, i) => (
              <Card
                key={module.name}
                className={`module-card ${i < 2 ? "module-featured" : ""}`}
              >
                <div className="module-card-top">
                  <span className="module-icon" aria-hidden="true">
                    <Icon name={module.icon} />
                  </span>
                  <span className="module-number">
                    {String(i + 1).padStart(2, "0")} / PLANNED
                  </span>
                </div>
                <p className="eyebrow">{module.category}</p>
                <h3>{module.name}</h3>
                <p className="muted">{module.description}</p>
              </Card>
            ))}
          </div>
        </section>
        <section
          id="how-it-works"
          className="landing-section container"
          aria-labelledby="how-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">03 / FROM INTENT TO POSSIBILITY</p>
              <h2 id="how-title">A simpler way forward.</h2>
            </div>
            <p className="section-description">
              The experience we’re designing puts your direction first, and your
              judgment at the center.
            </p>
          </div>
          <ol className="steps-grid">
            {[
              {
                title: "Bring your context.",
                text: "Start with your business, a goal and the knowledge that makes your work yours.",
              },
              {
                title: "Find your direction.",
                text: "Explore ideas across your planned AI workspace and specialist creative modules.",
              },
              {
                title: "Make it your own.",
                text: "Review, refine and decide what moves forward. You stay in control of the final result.",
              },
            ].map((step, i) => (
              <li key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p className="muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="use-cases"
          className="landing-section container"
          aria-labelledby="uses-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">04 / BUILT AROUND YOUR AMBITION</p>
              <h2 id="uses-title">
                Different businesses.
                <br />
                <span className="muted">A shared drive to create.</span>
              </h2>
            </div>
          </div>
          <div className="grid use-case-grid">
            {[
              {
                tag: "FOR FOUNDERS",
                title: "Give the next idea a place to grow.",
                text: "Explore a brand direction, outline a website and organize your launch thinking.",
                icon: "diagonal" as const,
              },
              {
                tag: "FOR CREATIVE TEAMS",
                title: "Keep the whole story in view.",
                text: "Bring campaign concepts, image directions and video plans into a shared creative process.",
                icon: "sparkle" as const,
              },
              {
                tag: "FOR GROWING BUSINESSES",
                title: "Connect the dots that matter.",
                text: "Plan customer follow-ups, document knowledge and sketch out repeatable operations.",
                icon: "workflow" as const,
              },
            ].map((use) => (
              <Card key={use.tag} className="use-case-card">
                <span className="use-case-icon" aria-hidden="true">
                  <Icon name={use.icon} />
                </span>
                <p className="eyebrow">{use.tag}</p>
                <h3>{use.title}</h3>
                <p className="muted">{use.text}</p>
              </Card>
            ))}
          </div>
          <p className="section-footnote">
            Illustrative use cases for the planned product. No productivity or
            revenue outcomes are promised.
          </p>
        </section>
        <section
          id="pricing"
          className="landing-section container"
          aria-labelledby="pricing-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">05 / SPACE TO GROW</p>
              <h2 id="pricing-title">A studio for your next stage.</h2>
            </div>
            <p className="section-description">
              Thoughtful plans are in the making. Prices, limits and
              availability will be shared when they’re finalized.
            </p>
          </div>
          <div className="grid pricing-grid">
            {plans.map((plan, i) => (
              <Card
                key={plan.name}
                className={
                  i === 1 ? "pricing-card pricing-featured" : "pricing-card"
                }
              >
                <span className="eyebrow">PLAN CONCEPT / 0{i + 1}</span>
                <h3>{plan.name}</h3>
                <p className="plan-tagline">{plan.for}</p>
                <p className="muted">{plan.description}</p>
                <p className="plan-price">Pricing to be announced</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="#faq"
                  variant={i === 1 ? "primary" : "secondary"}
                >
                  Read the preview FAQ <Icon name="diagonal" />
                </ButtonLink>
              </Card>
            ))}
          </div>
          <p className="section-footnote">
            No checkout. No charges. Plan names and inclusions are preliminary,
            not a purchase offer.
          </p>
        </section>
        <section
          id="faq"
          className="landing-section container faq-section"
          aria-labelledby="faq-title"
        >
          <div>
            <p className="eyebrow">06 / A LITTLE MORE CLARITY</p>
            <h2 id="faq-title">
              Good questions.
              <br />
              <span className="muted">Honest answers.</span>
            </h2>
            <p className="section-description">
              An early product vision, with clear boundaries about what’s here
              today.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true" className="faq-plus">
                    +
                  </span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className="container closing-section"
          aria-labelledby="closing-title"
        >
          <div className="closing-glass">
            <p className="eyebrow">THE NEXT CHAPTER STARTS WITH AN IDEA</p>
            <h2 id="closing-title">
              Make space for
              <br />
              <span>what comes next.</span>
            </h2>
            <p className="muted">
              Take a closer look at the foundation of Kenny AI Business Studio.
            </p>
            <ButtonLink href="/design-system">
              Explore the design system <Icon name="diagonal" />
            </ButtonLink>
            <div className="closing-orbit" aria-hidden="true">
              <span className="brand-mark">K</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <div className="footer-top">
          <div>
            <Brand />
            <p className="muted">One core. A world of possibilities.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#modules">Planned modules</a>
            <a href="#pricing">Pricing preview</a>
            <a href="#faq">FAQ</a>
            <Link href="/design-system">Design system</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kenny AI Business Studio</span>
          <span>
            Phase 1 concept · AI, accounts and billing are not connected.
          </span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

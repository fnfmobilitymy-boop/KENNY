import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import type { PlannedModule } from "@/types/dashboard";
export function ComingSoon({ module }: { module: PlannedModule }) {
  return (
    <div className="module-coming-soon">
      <p className="eyebrow">{module.group} / PLANNED MODULE</p>
      <span className="coming-soon-symbol">
        <Icon name={module.icon} />
      </span>
      <span className="studio-badge">Coming soon · Frontend shell</span>
      <h1>{module.name}</h1>
      <p className="coming-soon-description">{module.description}</p>
      <div className="coming-soon-actions">
        <ButtonLink href="/app">
          Back to Command Center
          <Icon name="arrow" />
        </ButtonLink>
        <ButtonLink href="/onboarding" variant="ghost">
          Review organization setup
        </ButtonLink>
      </div>
      <Card className="capabilities-card">
        <h2>A look at the direction.</h2>
        <p>
          Planned capabilities for a later milestone. Nothing below is active.
        </p>
        <ul>
          {module.capabilities.map((capability) => (
            <li key={capability}>
              <Icon name="sparkle" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </Card>
      <div className="module-honesty">
        <Icon name="knowledge" />
        <p>
          This M5 route is a navigation and design preview. No AI execution,
          data connection, account change or payment is performed. Future
          service adapters must be implemented and verified separately.
        </p>
      </div>
      <Link href="/app/workspace" className="studio-text-link">
        Explore the AI Workspace direction
        <Icon name="diagonal" />
      </Link>
    </div>
  );
}

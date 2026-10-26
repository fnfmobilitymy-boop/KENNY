import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import type {
  DemoAgent,
  DemoTask,
  DemoActivity,
  DemoWorkspace,
} from "@/types/dashboard";
import { demoUsage } from "@/demo/dashboard";
export function ResponsiveDashboardGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`dashboard-grid ${className}`}>{children}</div>;
}
export function DemoBadge({ children = "Demo" }: { children?: ReactNode }) {
  return <span className="studio-badge">{children}</span>;
}
export function DashboardHeader({ workspace }: { workspace: DemoWorkspace }) {
  return (
    <div className="dashboard-header">
      <div>
        <p className="eyebrow">YOUR BUSINESS. A CLEARER PERSPECTIVE.</p>
        <h1>
          A little clarity.
          <br />
          <span>A world of possibilities.</span>
        </h1>
        <p className="dashboard-intro">
          Welcome to <strong>{workspace.name}</strong>. One space to see what
          matters and explore what’s next.
        </p>
      </div>
      <div className="dashboard-identity">
        <span className="app-workspace-avatar">{workspace.initials}</span>
        <div>
          <strong>{workspace.name}</strong>
          <small>{workspace.description} · Demo</small>
        </div>
      </div>
    </div>
  );
}
export function QuickActionCard({
  href,
  title,
  description,
  icon,
  primary = false,
}: {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  primary?: boolean;
}) {
  return (
    <Link
      className={`quick-action-card ${primary ? "quick-action-primary" : ""}`}
      href={href}
    >
      <span className="quick-action-icon">
        <Icon name={icon} />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <Icon name="diagonal" />
    </Link>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconName;
}) {
  return (
    <Card className="metric-card">
      <div>
        <span>{label}</span>
        <Icon name={icon} />
      </div>
      <strong>{value}</strong>
      <p>
        <DemoBadge />
        {detail}
      </p>
    </Card>
  );
}
export function ToolLauncherCard({
  href,
  name,
  description,
  icon,
}: {
  href: string;
  name: string;
  description: string;
  icon: IconName;
}) {
  return (
    <Link className="tool-launcher-card" href={href}>
      <span className="tool-icon">
        <Icon name={icon} />
      </span>
      <span>
        <strong>{name}</strong>
        <small>{description}</small>
      </span>
      <Icon name="diagonal" />
    </Link>
  );
}
export function AgentStatusCard({ agent }: { agent: DemoAgent }) {
  return (
    <div className="agent-status-card">
      <span className="agent-avatar">
        <Icon name="sparkle" />
      </span>
      <div>
        <strong>{agent.name}</strong>
        <span>{agent.role}</span>
        <small>{agent.description}</small>
      </div>
      <span className="agent-disconnected">Not connected</span>
    </div>
  );
}
export function TaskList({ tasks }: { tasks: readonly DemoTask[] }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <span className="task-symbol" aria-hidden="true">
            <Icon name="knowledge" />
          </span>
          <Link href={`/app/${task.module}`}>
            <strong>{task.title}</strong>
            <small>Sample task · Planned module</small>
          </Link>
          <span
            className={`task-status ${task.status === "Needs review" ? "needs-review" : ""}`}
          >
            {task.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
export function ActivityFeed({ items }: { items: readonly DemoActivity[] }) {
  return (
    <ol className="activity-feed">
      {items.map((item) => (
        <li key={item.id}>
          <span className="activity-symbol">
            <Icon name={item.icon} />
          </span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            <small>{item.label} · Demo, not a live event</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function UsageCard({ empty = false }: { empty?: boolean }) {
  const used = empty ? 0 : demoUsage.used;
  return (
    <Card className="usage-card">
      <div className="panel-heading">
        <h2>AI credits</h2>
        <DemoBadge>Usage preview</DemoBadge>
      </div>
      <div className="usage-number">
        <strong>{used.toLocaleString()}</strong>
        <span>/ {demoUsage.total.toLocaleString()} sample credits</span>
      </div>
      <div
        className="usage-track"
        role="progressbar"
        aria-label="Illustrative credit usage"
        aria-valuemin={0}
        aria-valuemax={demoUsage.total}
        aria-valuenow={used}
        aria-valuetext={`${used} of ${demoUsage.total} sample credits, not an actual balance`}
      >
        <span style={{ width: `${(used / demoUsage.total) * 100}%` }} />
      </div>
      <p>
        No credits are billed or consumed. These values are illustrative, not a
        subscription allowance.
      </p>
      <Link className="studio-text-link" href="/app/billing">
        Explore billing concept <Icon name="diagonal" />
      </Link>
    </Card>
  );
}
export function EmptyState({
  title,
  description,
  href,
  action,
  icon = "workspace",
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
  icon?: IconName;
}) {
  return (
    <div className="studio-empty">
      <span>
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && action && (
        <Link className="studio-text-link" href={href}>
          {action}
          <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}
export function SkeletonLoader() {
  return (
    <div
      className="dashboard-skeleton"
      role="status"
      aria-label="Loading layout preview. No network request is running."
      aria-live="polite"
    >
      <span className="sr-only">
        Loading layout preview · No network request is running.
      </span>
      {[0, 1, 2, 3].map((i) => (
        <Card key={i}>
          <div className="studio-skeleton-line" />
          <div className="studio-skeleton-line short" />
          <div className="studio-skeleton-line" />
        </Card>
      ))}
    </div>
  );
}
export function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <Card
      className="dashboard-error"
      role="alert"
      aria-label="Dashboard error preview"
    >
      <Icon name="workflow" />
      <h2>A clearer view is on its way.</h2>
      <p>
        This is an error-state preview. No service request failed because no
        backend is connected.
      </p>
      <Button onClick={onRetry}>Return to demo data</Button>
    </Card>
  );
}

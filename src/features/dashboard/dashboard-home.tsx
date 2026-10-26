"use client";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { useAppPreview } from "@/features/app-shell/app-context";
import {
  plannedModules,
  demoTasks,
  demoAgents,
  demoApprovals,
  demoProjects,
  demoActivity,
} from "@/demo/dashboard";
import type { DashboardPreviewState } from "@/types/dashboard";
import {
  ResponsiveDashboardGrid,
  DemoBadge,
  DashboardHeader,
  QuickActionCard,
  MetricCard,
  ToolLauncherCard,
  AgentStatusCard,
  TaskList,
  ActivityFeed,
  UsageCard,
  EmptyState,
  SkeletonLoader,
  DashboardError,
} from "./components";
import { ApprovalCard } from "./approval-card";
import { GettingStartedChecklist } from "./getting-started-checklist";
const launchers = [
  "workspace",
  "website-builder",
  "image-studio",
  "video-studio",
  "marketing",
  "automations",
] as const;
export function DashboardHome() {
  const { workspace } = useAppPreview();
  const [preview, setPreview] = useState<DashboardPreviewState>("ready");
  const empty = workspace.empty;
  return (
    <div className="dashboard-home">
      <DashboardHeader workspace={workspace} />
      <div className="dashboard-demo-bar">
        <div>
          <DemoBadge>Demo workspace</DemoBadge>
          <span>
            Sample work, not live business activity. No AI agents are running.
          </span>
        </div>
        <label>
          Preview state
          <select
            id="dashboard-preview-state"
            aria-label="Preview state"
            value={preview}
            onChange={(e) =>
              setPreview(e.target.value as DashboardPreviewState)
            }
          >
            <option value="ready">Demo data</option>
            <option value="loading">Loading preview</option>
            <option value="error">Error preview</option>
          </select>
        </label>
      </div>
      <section
        aria-labelledby="quick-actions-title"
        className="quick-actions-section"
      >
        <div className="section-mini-heading">
          <h2 id="quick-actions-title">Where would you like to begin?</h2>
          <span>Explore a direction</span>
        </div>
        <div className="quick-action-grid">
          <QuickActionCard
            href="/app/workspace"
            title="Think with context"
            description="AI Workspace · Local demo"
            icon="workspace"
            primary
          />
          <QuickActionCard
            href="/app/website-builder"
            title="Build a new presence"
            description="Website Builder · Coming soon"
            icon="website"
          />
          <QuickActionCard
            href="/onboarding"
            title="Shape your workspace"
            description="Organization setup · UI demo"
            icon="settings"
          />
        </div>
      </section>
      {preview === "loading" ? (
        <SkeletonLoader />
      ) : preview === "error" ? (
        <DashboardError onRetry={() => setPreview("ready")} />
      ) : (
        <>
          <section
            aria-label="Illustrative workspace metrics"
            className="metric-grid"
          >
            <MetricCard
              label="Sample tasks"
              value={empty ? "00" : String(demoTasks.length).padStart(2, "0")}
              detail="Illustrative work items"
              icon="knowledge"
            />
            <MetricCard
              label="Example projects"
              value={
                empty ? "00" : String(demoProjects.length).padStart(2, "0")
              }
              detail="Concepts, not live work"
              icon="website"
            />
            <MetricCard
              label="Review items"
              value={
                empty ? "00" : String(demoApprovals.length).padStart(2, "0")
              }
              detail="Sample review queue"
              icon="check"
            />
            <MetricCard
              label="AI tools"
              value={String(
                plannedModules.filter((m) => m.group !== "ACCOUNT").length,
              )}
              detail="1 prototype · 12 planned"
              icon="sparkle"
            />
          </section>
          <ResponsiveDashboardGrid>
            <div className="dashboard-primary-column">
              <Card className="tools-overview">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">YOUR CREATIVE & BUSINESS TOOLKIT</p>
                    <h2>One studio. Many possibilities.</h2>
                  </div>
                  <DemoBadge>Preview & planned</DemoBadge>
                </div>
                <p className="panel-description">
                  Choose a module to see its direction. No AI generation is
                  connected yet.
                </p>
                <div className="tool-launcher-grid">
                  {launchers.map((slug) => {
                    const tool = plannedModules.find((m) => m.slug === slug)!;
                    return (
                      <ToolLauncherCard
                        key={slug}
                        href={`/app/${tool.slug}`}
                        name={tool.name}
                        description={
                          tool.group === "CREATE"
                            ? "Create with intention"
                            : "Work with context"
                        }
                        icon={tool.icon}
                      />
                    );
                  })}
                </div>
              </Card>
              <Card className="recent-tasks-card">
                <div className="panel-heading">
                  <h2>Work in your orbit</h2>
                  <DemoBadge>Sample tasks</DemoBadge>
                </div>
                {empty ? (
                  <EmptyState
                    title="A little room for your next idea."
                    description="This empty demo workspace has no sample tasks. Explore the planned workspace or switch back to Kenny Studio."
                    href="/app/workspace"
                    action="Explore AI Workspace"
                  />
                ) : (
                  <TaskList tasks={demoTasks} />
                )}
                <p className="panel-footnote">
                  Task links open planned module pages. No task execution or
                  synchronization occurs.
                </p>
              </Card>
              <Card className="projects-card">
                <div className="panel-heading">
                  <h2>Recent projects</h2>
                  <DemoBadge>Illustrative</DemoBadge>
                </div>
                {empty ? (
                  <EmptyState
                    title="Your projects will belong here."
                    description="No projects have been loaded in this empty-state preview."
                  />
                ) : (
                  <div className="project-grid">
                    {demoProjects.map((project, i) => (
                      <Link
                        href={`/app/${project.module}`}
                        className="project-card"
                        key={project.id}
                      >
                        <div
                          className={`project-art project-art-${i}`}
                          aria-hidden="true"
                        >
                          <Icon
                            name={
                              i === 0
                                ? "image"
                                : i === 1
                                  ? "website"
                                  : "marketing"
                            }
                          />
                        </div>
                        <strong>{project.name}</strong>
                        <small>{project.type} · Demo</small>
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
              <GettingStartedChecklist key={workspace.id} />
            </div>
            <div className="dashboard-secondary-column">
              <Card className="agent-panel">
                <div className="panel-heading">
                  <h2>Your future AI team</h2>
                  <DemoBadge>Not connected</DemoBadge>
                </div>
                <p className="panel-description">
                  Illustrative agent profiles. No models, jobs or agents are
                  operating.
                </p>
                {empty ? (
                  <EmptyState
                    title="No agent profiles here yet."
                    description="This is an empty preview, not a connected organization."
                    icon="sparkle"
                  />
                ) : (
                  demoAgents.map((agent) => (
                    <AgentStatusCard agent={agent} key={agent.id} />
                  ))
                )}
                <Link className="studio-text-link" href="/app/workspace">
                  Explore the planned workspace <Icon name="diagonal" />
                </Link>
              </Card>
              <Card className="approval-panel">
                <div className="panel-heading">
                  <h2>A moment for review</h2>
                  <DemoBadge>Demo</DemoBadge>
                </div>
                {empty ? (
                  <EmptyState
                    title="Nothing waiting for review."
                    description="No real approval queue is connected."
                    icon="check"
                  />
                ) : (
                  demoApprovals.map((approval) => (
                    <ApprovalCard
                      key={`${workspace.id}-${approval.id}`}
                      approval={approval}
                    />
                  ))
                )}
                <p className="panel-footnote">
                  Preview-only review controls. No decisions are persisted.
                </p>
              </Card>
              <UsageCard empty={empty} />
              <Card className="activity-panel">
                <div className="panel-heading">
                  <h2>Studio notes</h2>
                  <DemoBadge>Sample timeline</DemoBadge>
                </div>
                {empty ? (
                  <EmptyState
                    title="A quiet beginning."
                    description="Activity will appear when future services are connected. No activity is being recorded now."
                  />
                ) : (
                  <ActivityFeed items={demoActivity} />
                )}
              </Card>
            </div>
          </ResponsiveDashboardGrid>
        </>
      )}
      <p className="dashboard-safety-note">
        Kenny Studio is an illustrative pilot workspace. Workspace switching
        changes demo fixtures only; authentication, authorization and tenant
        isolation require future backend implementation.
      </p>
    </div>
  );
}

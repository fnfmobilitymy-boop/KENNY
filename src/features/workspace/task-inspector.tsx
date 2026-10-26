"use client";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/features/dashboard/components";
import { workspaceScenarios, previewStepVariants } from "@/demo/workspace";
import type { ConversationThread } from "@/types/workspace";
import { SampleContent } from "./sample-content";
export type InspectorTab = "OVERVIEW" | "STEPS" | "RESULTS" | "APPROVALS";
const tabs: readonly InspectorTab[] = [
  "OVERVIEW",
  "STEPS",
  "RESULTS",
  "APPROVALS",
];
export function TaskInspector({
  thread,
  tab,
  onTab,
  onApprove,
}: {
  thread: ConversationThread | null;
  tab: InspectorTab;
  onTab: (tab: InspectorTab) => void;
  onApprove: (decision: "approved-preview" | "rejected-preview") => void;
}) {
  const id = useId();
  const task = thread?.task;
  const scenario = workspaceScenarios.find(
    (s) => s.id === (task?.scenarioId || thread?.scenarioId),
  );
  const status = task?.status || "pending";
  function decide(decision: "approved-preview" | "rejected-preview") {
    onApprove(decision);
    requestAnimationFrame(() =>
      document.getElementById(`${id}-decision`)?.focus(),
    );
  }
  return (
    <div className="task-inspector">
      <div className="workspace-panel-heading">
        <p className="eyebrow">LOCAL DISPLAY, NOT EXECUTION</p>
        <h2>Task inspector</h2>
      </div>
      <div
        className="inspector-tabs"
        role="tablist"
        aria-label="Task inspector tabs"
      >
        {tabs.map((label, index) => (
          <Button
            variant="ghost"
            key={label}
            role="tab"
            id={`${id}-tab-${label}`}
            aria-selected={tab === label}
            aria-controls={`${id}-panel-${label}`}
            tabIndex={tab === label ? 0 : -1}
            onClick={() => onTab(label)}
            onKeyDown={(e) => {
              let next = index;
              if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
              else if (e.key === "ArrowLeft")
                next = (index + tabs.length - 1) % tabs.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = tabs.length - 1;
              else return;
              e.preventDefault();
              onTab(tabs[next]);
              document.getElementById(`${id}-tab-${tabs[next]}`)?.focus();
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      {tabs.map((label) => (
        <section
          key={label}
          className="inspector-content"
          role="tabpanel"
          id={`${id}-panel-${label}`}
          aria-labelledby={`${id}-tab-${label}`}
          tabIndex={0}
          hidden={tab !== label}
        >
          {label === "OVERVIEW" ? (
            <>
              <span className={`workspace-status status-${status}`}>
                {status}
              </span>
              <dl className="task-facts">
                <div>
                  <dt>Demo task type</dt>
                  <dd>{scenario?.taskType || "No selected task"}</dd>
                </div>
                <div>
                  <dt>Task ID</dt>
                  <dd>{task?.id || "No local task yet"}</dd>
                </div>
                <div>
                  <dt>Planned tool</dt>
                  <dd>{scenario?.plannedTool || "Not selected"}</dd>
                </div>
                <div>
                  <dt>Provider</dt>
                  <dd>Not connected</dd>
                </div>
                <div>
                  <dt>Display behavior</dt>
                  <dd>
                    A local timer changes the visible state, then displays a
                    fixed scenario fixture. It does not reason, execute tools or
                    interpret input.
                  </dd>
                </div>
              </dl>
              <div className="inspector-note">
                <Icon name="knowledge" />
                <p>
                  This is a preview inspector, not a live execution trace. No AI
                  service is available.
                </p>
              </div>
            </>
          ) : label === "STEPS" ? (
            <>
              <h3>Current preview</h3>
              <ol className="local-task-steps">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Select a fixed scenario</strong>
                    <small>{task ? "complete-preview" : "pending"}</small>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Display sample state</strong>
                    <small>{status}</small>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Local review concept</strong>
                    <small>
                      {task?.approval === "pending"
                        ? "pending · simulated approval"
                        : task?.approval === "approved-preview"
                          ? "approved-preview"
                          : task?.approval === "rejected-preview"
                            ? "rejected-preview"
                            : "No active approval"}
                    </small>
                  </div>
                </li>
              </ol>
              <details className="step-variant-guide">
                <summary>All preview state variants</summary>
                <ul>
                  {previewStepVariants.map((variant) => (
                    <li key={variant.status}>
                      <span
                        className={`workspace-status status-${variant.status}`}
                      >
                        {variant.label}
                      </span>
                      <p>{variant.description}</p>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          ) : label === "RESULTS" ? (
            task?.status === "complete-preview" && scenario ? (
              <>
                <span className="studio-badge">SAMPLE / DEMO</span>
                <h3>{scenario.output.title}</h3>
                <SampleContent content={scenario.output.content} />
                <dl className="result-facts">
                  {scenario.output.cards.map((card) => (
                    <div key={card.label}>
                      <dt>{card.label}</dt>
                      <dd>{card.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="artifact-shell">
                  <Icon name="knowledge" />
                  <div>
                    <strong>Future artifact preview</strong>
                    <code>{scenario.output.artifactName}</code>
                    <p>
                      Illustrative filename only. No file was generated or
                      stored.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState
                title="No sample result for this task."
                description="Start a local sample preview. Canceled and failure previews do not create a new result."
              />
            )
          ) : task?.approval === "pending" ? (
            <div className="local-approval">
              <span className="studio-badge">SIMULATED REVIEW</span>
              <h3>A moment for human judgment.</h3>
              <p>
                Review the fixed sample in Results. These controls only update a
                local preview label.
              </p>
              <Button onClick={() => decide("approved-preview")}>
                Approve sample · Local
              </Button>
              <Button
                variant="ghost"
                onClick={() => decide("rejected-preview")}
              >
                Reject sample · Local
              </Button>
              <p className="inspector-small-note">
                No message will be sent, no content published and no real
                approval recorded.
              </p>
            </div>
          ) : task?.approval === "approved-preview" ||
            task?.approval === "rejected-preview" ? (
            <div className="local-approval">
              <span className="workspace-status">{task.approval}</span>
              <h3 id={`${id}-decision`} tabIndex={-1}>
                Decision shown locally.
              </h3>
              <p>
                Nothing was saved or executed. Reset or replay a review scenario
                to explore another decision.
              </p>
            </div>
          ) : (
            <EmptyState
              title="No active approval."
              description="Marketing, website and follow-up samples can show simulated review requests. No external action is possible."
            />
          )}
        </section>
      ))}
    </div>
  );
}

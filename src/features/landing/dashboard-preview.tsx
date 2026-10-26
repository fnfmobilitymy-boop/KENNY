"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { demoTasks, previewTabs } from "@/demo/landing";
export function DashboardPreview() {
  const [tab, setTab] = useState(0);
  return (
    <div className="dashboard-frame">
      <div className="preview-chrome">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Kenny AI Business Studio</span>
        <span className="preview-label">ILLUSTRATIVE DEMO</span>
      </div>
      <div className="preview-layout">
        <aside
          className="preview-sidebar"
          aria-label="Illustrated workspace sidebar"
        >
          <div className="preview-workspace">
            <span className="workspace-avatar">S</span>
            <span>
              Studio workspace<small>Demo organization</small>
            </span>
          </div>
          <p className="eyebrow">YOUR STUDIO</p>
          <div className="preview-side-active">
            ◈ <span>Command Center</span>
          </div>
          <p>
            ✳ <span>AI Workspace</span>
          </p>
          <p>
            ▧ <span>Creative tools</span>
          </p>
          <p>
            ⎇ <span>Workflows</span>
          </p>
          <div className="sidebar-bottom">
            <span className="tiny-dot" /> Concept preview
          </div>
        </aside>
        <div className="preview-content">
          <div className="preview-heading">
            <div>
              <span className="eyebrow">COMMAND CENTER / DEMO</span>
              <h3>
                A little clarity.
                <br />A lot of possibility.
              </h3>
            </div>
            <span
              className="workspace-avatar small-avatar"
              aria-label="Demo profile"
            >
              S
            </span>
          </div>
          <div
            role="tablist"
            aria-label="Product preview views"
            className="preview-tabs"
          >
            {previewTabs.map((t, i) => (
              <Button
                key={t.id}
                id={`preview-tab-${t.id}`}
                role="tab"
                variant="ghost"
                aria-selected={tab === i}
                aria-controls={`preview-panel-${t.id}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  let n = i;
                  if (e.key === "ArrowRight") n = (i + 1) % previewTabs.length;
                  else if (e.key === "ArrowLeft")
                    n = (i + previewTabs.length - 1) % previewTabs.length;
                  else if (e.key === "Home") n = 0;
                  else if (e.key === "End") n = previewTabs.length - 1;
                  else return;
                  e.preventDefault();
                  setTab(n);
                  document
                    .getElementById(`preview-tab-${previewTabs[n].id}`)
                    ?.focus();
                }}
              >
                {t.label}
              </Button>
            ))}
          </div>
          {previewTabs.map((t, i) => (
            <div
              key={t.id}
              role="tabpanel"
              id={`preview-panel-${t.id}`}
              aria-labelledby={`preview-tab-${t.id}`}
              hidden={tab !== i}
              tabIndex={0}
              className="preview-panel"
            >
              {i === 0 ? (
                <>
                  <div className="preview-stats">
                    <div>
                      <span>Projects in focus</span>
                      <strong>
                        03 <small>Demo projects</small>
                      </strong>
                    </div>
                    <div>
                      <span>Your creative space</span>
                      <strong>
                        One studio <small>Many directions</small>
                      </strong>
                    </div>
                    <div>
                      <span>Next step</span>
                      <strong>
                        Review <small>Keep a human in the loop</small>
                      </strong>
                    </div>
                  </div>
                  <div className="preview-bottom">
                    <div className="preview-chart">
                      <span className="eyebrow">ILLUSTRATIVE ACTIVITY</span>
                      <div className="chart-bars" aria-hidden="true">
                        {[35, 62, 46, 83, 59, 74, 95, 65, 85, 100, 82, 118].map(
                          (height, j) => (
                            <span key={j} style={{ height }} />
                          ),
                        )}
                      </div>
                      <p>Explore. Create. Refine.</p>
                      <small className="muted">
                        Decorative chart · no live analytics
                      </small>
                    </div>
                    <div className="preview-tasks">
                      <h4>In your orbit</h4>
                      {demoTasks.map((task) => (
                        <div className="preview-task" key={task.name}>
                          <span className="task-check" aria-hidden="true">
                            ◇
                          </span>
                          <div>
                            <strong>{task.name}</strong>
                            <span>
                              {task.team} ·{" "}
                              <span className={`status-${task.tone}`}>
                                {task.status}
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : i === 1 ? (
                <div className="creative-preview">
                  <div className="creative-art" aria-hidden="true">
                    <div className="creative-art-orb" />
                  </div>
                  <div>
                    <p className="eyebrow">CREATIVE STUDIO / CONCEPT</p>
                    <h4>
                      From a spark
                      <br />
                      to a direction.
                    </h4>
                    <p>
                      Website concepts, brand imagery and video ideas in one
                      planned creative space.
                    </p>
                    <span className="badge">◇ AI generation not connected</span>
                  </div>
                </div>
              ) : (
                <div className="workflow-preview">
                  <p className="eyebrow">WORKFLOW / CONCEPT</p>
                  <h4>Make room for a better process.</h4>
                  <ol>
                    <li>
                      <span>01</span>Define the brief
                    </li>
                    <li>
                      <span>02</span>Explore with your team
                    </li>
                    <li>
                      <span>03</span>Review before sharing
                    </li>
                  </ol>
                  <p className="muted">
                    Illustrated steps only. No agents or automations are
                    running.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="preview-disclosure">
        <span className="tiny-dot" /> Product direction preview. All projects,
        activity and statuses are demo fixtures.
      </div>
    </div>
  );
}

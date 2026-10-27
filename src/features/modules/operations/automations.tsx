"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { workflowSamples, executionSample } from "@/demo/modules/operations";
import { validateWorkflow } from "@/lib/module-state";
import { Icon } from "@/components/ui/icon";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Select,
  Notice,
} from "../shared/module-ui";
export function Automations() {
  const [selected, setSelected] = useState("flow-1");
  const [drafts, setDrafts] = useState<
    Record<string, { trigger: string; action: string; review: boolean }>
  >({
    "flow-1": {
      trigger: "Sample inquiry",
      action: "Create a review draft",
      review: true,
    },
    "flow-2": {
      trigger: "Sample content draft",
      action: "Prepare reminder text",
      review: true,
    },
  });
  const [node, setNode] = useState("trigger");
  const [errors, setErrors] = useState<string[]>([]);
  const [log, setLog] = useState(false);
  const [notice, setNotice] = useState("No workflows are enabled or running.");
  const draft = drafts[selected];
  function update(partial: Partial<typeof draft>) {
    setDrafts((old) => ({
      ...old,
      [selected]: { ...old[selected], ...partial },
    }));
    setLog(false);
    setErrors([]);
    setNotice(
      "Unsaved local node configuration. No workflow changed on a server.",
    );
  }
  function validate(simulate = false) {
    const issues = validateWorkflow(draft);
    setErrors(issues);
    setLog(!issues.length && simulate);
    setNotice(
      issues.length
        ? "Local draft has validation issues."
        : simulate
          ? "Fixed sample log shown. No actual workflow executed."
          : "Local draft structure is valid for this preview only.",
    );
  }
  return (
    <ModuleFrame
      slug="automations"
      tagline="Connect the idea. Review every consequence."
      related={["sales", "booking", "workspace"]}
    >
      <div className="tool-split">
        <Panel title="Workflow drafts">
          <Catalog
            title="Sample workflow list"
            items={workflowSamples}
            selected={selected}
            onSelect={(id) => {
              setSelected(id);
              setLog(false);
              setErrors([]);
              setNotice(
                "Sample workflow selected. No actual workflow is enabled.",
              );
            }}
          />
          <p>
            Each draft stays in memory. There are no live triggers, queues or
            background jobs.
          </p>
        </Panel>
        <Panel title="Workflow canvas" kicker="NODE PROTOTYPE / NOT EXECUTABLE">
          <div
            className="workflow-canvas"
            role="group"
            aria-label="Local workflow nodes"
          >
            {[
              {
                id: "trigger",
                name: "Trigger",
                label: draft.trigger || "Not configured",
                icon: "sparkle" as const,
              },
              {
                id: "review",
                name: "Human review",
                label: draft.review ? "Required preview" : "Missing review",
                icon: "contacts" as const,
              },
              {
                id: "action",
                name: "Action",
                label: draft.action || "Not configured",
                icon: "workflow" as const,
              },
            ].map((n) => (
              <button
                className="workflow-node"
                key={n.id}
                aria-pressed={node === n.id}
                onClick={() => setNode(n.id)}
              >
                <Icon name={n.icon} />
                <strong>{n.name}</strong>
                <small>{n.label}</small>
              </button>
            ))}
          </div>
          <div className="tool-row">
            <Button variant="secondary" onClick={() => validate()}>
              Validate local draft
            </Button>
            <Button onClick={() => validate(true)}>
              Show sample log · Demo only
            </Button>
          </div>
          {errors.length > 0 && (
            <ul className="tool-validation" role="alert">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          <Notice>{notice}</Notice>
        </Panel>
      </div>
      <div className="tool-split">
        <Panel title="Node inspector" kicker="LOCAL CONFIGURATION">
          <h3>
            {node === "trigger"
              ? "Trigger"
              : node === "review"
                ? "Human review"
                : "Action"}{" "}
            node
          </h3>
          {node === "trigger" ? (
            <Select
              label="Trigger selection"
              value={draft.trigger}
              onChange={(trigger) => update({ trigger })}
              options={[
                { value: "", label: "Choose trigger" },
                "Sample inquiry",
                "Sample content draft",
              ]}
            />
          ) : node === "action" ? (
            <Select
              label="Action selection"
              value={draft.action}
              onChange={(action) => update({ action })}
              options={[
                { value: "", label: "Choose action" },
                "Create a review draft",
                "Prepare reminder text",
              ]}
            />
          ) : (
            <label className="tool-checkbox">
              <input
                type="checkbox"
                checked={draft.review}
                onChange={(e) => update({ review: e.target.checked })}
              />
              Include human review preview
            </label>
          )}
          <p>
            Connection lines illustrate order only. They do not transfer data or
            execute tools.
          </p>
        </Panel>
        <Panel
          title="Sample execution log"
          kicker="PREWRITTEN SIMULATION, NOT RUN HISTORY"
        >
          {log ? (
            <ol className="tool-mini-list">
              {executionSample.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ol>
          ) : (
            <div className="tool-empty">
              <h3>No sample log selected.</h3>
              <p>
                Validate the local draft or choose Show sample log. Nothing
                actually runs.
              </p>
            </div>
          )}
        </Panel>
      </div>
    </ModuleFrame>
  );
}

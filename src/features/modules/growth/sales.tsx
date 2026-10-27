"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  salesInbox,
  responseTemplates,
  agentBehaviorSample,
} from "@/demo/modules/growth";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Select,
  Editor,
  Disconnected,
  Notice,
} from "../shared/module-ui";
export function SalesAgent() {
  const [conversation, setConversation] = useState("inbox-1");
  const [template, setTemplate] = useState("overview");
  const [tone, setTone] = useState("Professional");
  const [handoff, setHandoff] = useState("Always ask a human");
  const [instructions, setInstructions] = useState(agentBehaviorSample);
  const [decision, setDecision] = useState("Pending local review");
  const [notice, setNotice] = useState(
    "No AI agent is operating. All conversations and replies are fixed examples.",
  );
  return (
    <ModuleFrame
      slug="sales"
      tagline="Design the conversation. Keep people in control."
      related={["crm", "workspace", "automations"]}
    >
      <div className="tool-split">
        <div className="tool-stack">
          <Panel title="Agent direction" kicker="PROFILE ONLY / NOT RUNNING">
            <Select
              label="Response tone"
              value={tone}
              onChange={setTone}
              options={["Professional", "Warm", "Concise"]}
            />
            <Select
              label="Human handoff rule"
              value={handoff}
              onChange={setHandoff}
              options={[
                "Always ask a human",
                "Ask before commitments",
                "Ask for sensitive topics",
              ]}
            />
            <Editor
              label="Behavior draft"
              value={instructions}
              onChange={setInstructions}
            />
            <p>
              Unsaved behavior configuration; no actual agent or policy is
              updated.
            </p>
          </Panel>
          <Panel title="Channels">
            <div className="channel-cards">
              {["WhatsApp", "Email", "Website chat"].map((c) => (
                <div key={c}>
                  <strong>{c}</strong>
                  <span className="tool-mini-badge">Not connected</span>
                  <Disconnected action={`Connect ${c}`} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <div className="tool-stack">
          <Panel
            title="Sample conversation inbox"
            kicker="FICTIONAL / NO CUSTOMER MESSAGES"
          >
            <Catalog
              title="Sample conversations"
              items={salesInbox}
              selected={conversation}
              onSelect={(id) => {
                setConversation(id);
                setDecision("Pending local review");
              }}
            />
            <div className="sales-conversation">
              <p>
                <strong>Fictional inquiry</strong>
                <br />
                {salesInbox.find((i) => i.id === conversation)?.message}
              </p>
              <Select
                label="Response template"
                value={template}
                onChange={(v) => {
                  setTemplate(v);
                  setDecision("Pending local review");
                }}
                options={responseTemplates.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
              />
              <p className="tool-preview-copy">
                {responseTemplates.find((t) => t.id === template)?.text}
              </p>
            </div>
          </Panel>
          <Panel
            title="Human handoff & approval"
            kicker="SIMULATED REVIEW ONLY"
          >
            <p>{decision}</p>
            {decision === "Pending local review" ? (
              <div className="tool-row">
                <Button
                  onClick={() => {
                    setDecision("Approved-preview · Local only");
                    setNotice("Sample approved locally. No response was sent.");
                  }}
                >
                  Approve sample response · Local
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDecision("Rejected-preview · Local only");
                    setNotice(
                      "Sample rejected locally. Nothing was sent or saved.",
                    );
                  }}
                >
                  Reject sample response · Local
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setDecision("Pending local review")}
              >
                Reset local review
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() =>
                setNotice(
                  "Human handoff label previewed locally. No person was notified.",
                )
              }
            >
              Preview human handoff
            </Button>
            <Notice>{notice}</Notice>
            <Disconnected action="Send response" />
          </Panel>
        </div>
      </div>
    </ModuleFrame>
  );
}

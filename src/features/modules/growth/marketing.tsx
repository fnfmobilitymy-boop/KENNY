"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  campaigns,
  calendarDays,
  marketingDrafts,
} from "@/demo/modules/growth";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Select,
  Editor,
  Checks,
  DemoDialog,
  Input,
  Notice,
  Disconnected,
} from "../shared/module-ui";
export function Marketing() {
  const [campaign, setCampaign] = useState("campaign-1");
  const [post, setPost] = useState("post-1");
  const [channel, setChannel] = useState("LinkedIn");
  const [day, setDay] = useState("Mon 2");
  const [draft, setDraft] = useState(
    "A thoughtful start. A fictional creative practice explores what it means to build with intention.",
  );
  const [date, setDate] = useState("2026-11-02");
  const [time, setTime] = useState("09:00");
  const [notice, setNotice] = useState(
    "Draft only. No account connected and nothing scheduled or published.",
  );
  return (
    <ModuleFrame
      slug="marketing"
      tagline="Bring a little intention to every channel."
      related={["image-studio", "seo-ads", "analytics"]}
    >
      <div className="tool-split">
        <div className="tool-stack">
          <Panel title="Campaigns" kicker="FICTIONAL / DRAFT">
            <Catalog
              title="Sample campaigns"
              items={campaigns}
              selected={campaign}
              onSelect={setCampaign}
            />
            <span className="tool-mini-badge">
              {campaigns.find((c) => c.id === campaign)?.name} · Draft
            </span>
            <p>
              3 fixed content ideas · 0 connected channels · No publishing
              activity.
            </p>
            <Catalog
              title="Sample post drafts"
              items={marketingDrafts}
              selected={post}
              onSelect={(id) => {
                setPost(id);
                setNotice(
                  "Sample draft selected. The local editor remains unsaved and nothing was loaded from a service.",
                );
              }}
            />
          </Panel>
          <Panel title="Campaign checklist">
            <Checks
              items={[
                "Define the intended audience",
                "Review the tone and accessibility",
                "Confirm rights to visual assets",
                "Get human approval before publishing",
              ]}
            />
          </Panel>
        </div>
        <div className="tool-stack">
          <Panel title="Content calendar" kicker="FIXED WEEK / NOVEMBER 2026">
            <div
              className="content-calendar"
              role="group"
              aria-label="Sample content calendar"
            >
              {calendarDays.map((d, i) => (
                <button
                  key={d}
                  aria-pressed={day === d}
                  onClick={() => setDay(d)}
                >
                  <strong>{d}</strong>
                  <span>
                    {[0, 2, 4].includes(i) ? "Sample draft" : "No draft"}
                  </span>
                </button>
              ))}
            </div>
            <p>{day} selected · Calendar is a local planning view.</p>
          </Panel>
          <Panel title="Post draft editor">
            <Select
              label="Content channel"
              value={channel}
              onChange={setChannel}
              options={["LinkedIn", "Instagram", "Email"]}
            />
            <Editor label="Post draft" value={draft} onChange={setDraft} />
            <div className="content-post-preview">
              <span className="tool-mini-badge">
                SAMPLE / {channel} · UNSAVED
              </span>
              <p className="tool-preview-copy">
                {draft || "Your local draft appears here."}
              </p>
            </div>
            <div className="tool-row">
              <DemoDialog
                trigger="Preview local schedule"
                title="Local scheduling preview"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotice(
                      `Local schedule preview: ${date} at ${time} for ${channel}. Not scheduled on any service.`,
                    );
                    e.currentTarget.closest("dialog")?.close();
                  }}
                >
                  <p>
                    This only adds a label to this screen. No post is queued or
                    sent.
                  </p>
                  <Input
                    label="Preview date"
                    value={date}
                    onChange={setDate}
                    type="date"
                  />
                  <Input
                    label="Preview time"
                    value={time}
                    onChange={setTime}
                    type="time"
                  />
                  <Button type="submit" disabled={!date || !time}>
                    Apply local schedule label
                  </Button>
                </form>
              </DemoDialog>
              <Disconnected action="Publish post" />
            </div>
            <Notice>{notice}</Notice>
          </Panel>
        </div>
      </div>
    </ModuleFrame>
  );
}

"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
const tabs = ["Overview", "Activity", "Resources"];
export function InteractiveShowcase() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="grid">
        <Card>
          <p className="eyebrow">01 / Actions</p>
          <h3>Clear intent, every time.</h3>
          <div className="stack">
            <Button
              onClick={() =>
                setStatus("Demo action completed. No data was sent.")
              }
            >
              Try demo action ↗
            </Button>
            <Button
              variant="secondary"
              ref={opener}
              onClick={() => dialog.current?.showModal()}
            >
              Open demo dialog
            </Button>
            <Button variant="ghost" disabled>
              Unavailable
            </Button>
          </div>
          <p role="status" className="muted">
            {status || "Demo only · no connected services"}
          </p>
        </Card>
        <Card>
          <p className="eyebrow">02 / Inputs</p>
          <h3>A thoughtful first step.</h3>
          <form
            className="stack"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("Demo form checked. No account was created.");
            }}
          >
            <Field
              id="demo-email"
              label="Work email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              hint="Component preview. This does not create an account."
            />
            <Button variant="secondary" type="submit">
              Validate demo form
            </Button>
          </form>
        </Card>
        <Card>
          <p className="eyebrow">03 / Feedback</p>
          <h3>Always know where you stand.</h3>
          <p>
            <span className="badge">✓ Available in demo</span>
          </p>
          <p className="muted">
            Status combines words and symbols, so color is never the only
            signal.
          </p>
          <div
            className="stack"
            role="status"
            aria-label="Loading preview, static skeleton example"
          >
            <div className="skeleton" />
            <div className="skeleton" style={{ width: "45%" }} />
          </div>
        </Card>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <div role="tablist" aria-label="Component example" className="tabs">
          {tabs.map((label, i) => (
            <Button
              key={label}
              role="tab"
              id={`tab-${i}`}
              aria-selected={tab === i}
              aria-controls={`panel-${i}`}
              tabIndex={tab === i ? 0 : -1}
              variant="ghost"
              onClick={() => setTab(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
                else if (e.key === "ArrowLeft")
                  next = (i + tabs.length - 1) % tabs.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = tabs.length - 1;
                else return;
                e.preventDefault();
                setTab(next);
                document.getElementById(`tab-${next}`)?.focus();
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        {tabs.map((label, i) => (
          <div
            key={label}
            hidden={tab !== i}
            role="tabpanel"
            id={`panel-${i}`}
            aria-labelledby={`tab-${i}`}
            tabIndex={0}
            className="tab-panel"
          >
            <h3>
              {label === "Overview"
                ? "Space to focus."
                : label === "Activity"
                  ? "Nothing here yet."
                  : "Built for what comes next."}
            </h3>
            <p className="muted">
              {i === 0
                ? "Reusable primitives for the KENNY experience. Use arrow keys to explore these tabs."
                : i === 1
                  ? "Empty state example. Your future workspace activity will appear here once a backend is connected."
                  : "Typed service boundaries are documented. No AI, billing or authentication provider is connected."}
            </p>
          </div>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClose={() => opener.current?.focus()}
      >
        <p className="eyebrow">Component preview</p>
        <h2 id="dialog-title">A moment of clarity.</h2>
        <p id="dialog-description" className="muted">
          This native modal supports Escape, keyboard focus containment and
          return focus. No workspace changes will be made.
        </p>
        <Button autoFocus onClick={() => dialog.current?.close()}>
          Close preview
        </Button>
      </dialog>
    </>
  );
}

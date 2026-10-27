"use client";
import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { plannedModules } from "@/demo/dashboard";
import { useAppPreview } from "@/features/app-shell/app-context";
import { trapDialogFocus } from "@/lib/dialog-focus";
import type { ModuleSlug } from "@/types/dashboard";
import type { SampleItem, ModulePreviewState } from "@/types/modules";
export function ModuleFrame({
  slug,
  tagline,
  children,
  related = [],
}: {
  slug: ModuleSlug;
  tagline: string;
  children: ReactNode;
  related?: ModuleSlug[];
}) {
  const info = plannedModules.find((m) => m.slug === slug)!;
  const { workspace } = useAppPreview();
  const [state, setState] = useState<ModulePreviewState>(
    workspace.empty ? "empty" : "ready",
  );
  return (
    <div className="module-demo" data-module={slug}>
      <header className="module-header">
        <div>
          <p className="eyebrow">KENNY / {info.group} STUDIO</p>
          <h1>{info.name}</h1>
          <p>{tagline}</p>
        </div>
        <span className="studio-badge">DEMO · Frontend prototype</span>
      </header>
      <div className="module-boundary">
        <Icon name="knowledge" />
        <p>
          <strong>Local demo only.</strong> Fictional examples; no AI, external
          service, uploads or server changes. Edits stay in memory and clear
          when this module unmounts. No customer or sensitive information.
        </p>
      </div>
      <div className="module-state-toolbar">
        <span>{workspace.name} · Illustrative workspace</span>
        <Select
          label="Prototype state"
          value={state}
          onChange={(v) => setState(v as ModulePreviewState)}
          options={["ready", "empty", "loading", "error"]}
        />
      </div>
      {state === "ready" ? (
        children
      ) : (
        <section
          className="module-state-example"
          aria-label="Prototype state example"
        >
          <Icon
            name={
              state === "error"
                ? "knowledge"
                : state === "loading"
                  ? "history"
                  : "sparkle"
            }
          />
          <h2>
            {state === "empty"
              ? "A little space for your next idea."
              : state === "loading"
                ? "Loading layout preview"
                : "Sample error state"}
          </h2>
          <p>
            {state === "loading"
              ? "Static skeleton example only. No request is loading."
              : state === "error"
                ? "This error is a selected UI example. No actual backend request failed."
                : "No sample items are shown in this empty-state preview."}
          </p>
          {state === "loading" && (
            <div className="module-skeleton" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          )}
          <Button variant="secondary" onClick={() => setState("ready")}>
            Restore sample view
          </Button>
        </section>
      )}
      <nav className="module-related" aria-label="Related modules">
        <Link href="/app">Command Center</Link>
        {related.map((s) => (
          <Link key={s} href={`/app/${s}`}>
            {plannedModules.find((m) => m.slug === s)?.name}
            <Icon name="diagonal" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
export function Panel({
  title,
  kicker,
  children,
  actions,
  className = "",
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`tool-panel ${className}`} aria-label={title}>
      <header>
        <div>
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2>{title}</h2>
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}
export function Select({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly (string | { value: string; label: string })[];
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="tool-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
export function Input({
  label,
  value,
  onChange,
  type = "text",
  hint,
  error,
  min,
  max,
  step,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const id = useId();
  return (
    <Field
      id={id}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      hint={hint}
      error={error}
      min={min}
      max={max}
      step={step}
      maxLength={type === "text" ? 160 : undefined}
    />
  );
}
export function Editor({
  label,
  value,
  onChange,
  hint = "Unsaved local demo text only.",
  maxLength = 2000,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  maxLength?: number;
}) {
  const id = useId();
  return (
    <div className="tool-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        aria-describedby={`${id}-hint`}
      />
      <small id={`${id}-hint`}>
        {hint} {value.length}/{maxLength}
      </small>
    </div>
  );
}
export function Disconnected({
  action,
  reason = "Requires a future backend integration.",
}: {
  action: string;
  reason?: string;
}) {
  const id = useId();
  return (
    <div className="tool-disconnected">
      <Button variant="secondary" disabled aria-describedby={id}>
        {action} · Not connected
      </Button>
      <small id={id}>{reason}</small>
    </div>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="tool-notice" role="status" aria-live="polite">
      {children}
    </p>
  );
}
export function Catalog({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: readonly SampleItem[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="tool-catalog" role="group" aria-label={title}>
      {items.length ? (
        items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === item.id}
            onClick={() => onSelect(item.id)}
          >
            <span className="catalog-mark" aria-hidden="true">
              <Icon name="knowledge" />
            </span>
            <span>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </span>
            <Icon name="chevron" />
          </button>
        ))
      ) : (
        <p>No samples match this view.</p>
      )}
    </div>
  );
}
export function Checks({
  items,
  label = "Local checklist",
}: {
  items: readonly string[];
  label?: string;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <fieldset className="tool-checks">
      <legend>{label} · Unsaved demo</legend>
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={checked.includes(item)}
            onChange={() =>
              setChecked((old) =>
                old.includes(item)
                  ? old.filter((v) => v !== item)
                  : [...old, item],
              )
            }
          />
          <span>{item}</span>
        </label>
      ))}
    </fieldset>
  );
}
export function Tabs({
  items,
  label,
}: {
  items: readonly { id: string; label: string; content: ReactNode }[];
  label: string;
}) {
  const [active, setActive] = useState(items[0].id);
  const id = useId();
  return (
    <div className="module-tabs">
      <div role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            id={`${id}-${item.id}`}
            aria-controls={`${id}-panel-${item.id}`}
            aria-selected={active === item.id}
            tabIndex={active === item.id ? 0 : -1}
            onClick={() => setActive(item.id)}
            onKeyDown={(e) => {
              let next = index;
              if (e.key === "ArrowRight") next = (index + 1) % items.length;
              else if (e.key === "ArrowLeft")
                next = (index - 1 + items.length) % items.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = items.length - 1;
              else return;
              e.preventDefault();
              setActive(items[next].id);
              document.getElementById(`${id}-${items[next].id}`)?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${id}-panel-${item.id}`}
          aria-labelledby={`${id}-${item.id}`}
          hidden={active !== item.id}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
export function DemoDialog({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  return (
    <>
      <Button
        ref={button}
        variant="secondary"
        onClick={() => dialog.current?.showModal()}
      >
        {trigger}
      </Button>
      <dialog
        className="tool-dialog"
        ref={dialog}
        aria-labelledby={id}
        onKeyDown={trapDialogFocus}
        onClose={() => button.current?.focus()}
      >
        <div className="tool-dialog-top">
          <p className="eyebrow">LOCAL DEMO ONLY</p>
          <Button
            variant="ghost"
            aria-label={`Close ${title}`}
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </Button>
        </div>
        <h2 id={id}>{title}</h2>
        {children}
      </dialog>
    </>
  );
}
export function TableWrap({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="tool-table-scroll"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { trapDialogFocus } from "@/lib/dialog-focus";
import type { DemoApproval } from "@/types/dashboard";
export function ApprovalCard({ approval }: { approval: DemoApproval }) {
  const [reviewed, setReviewed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  return (
    <div className="approval-card">
      <div className="approval-copy">
        <span className="approval-icon">
          <Icon name="knowledge" />
        </span>
        <div>
          <strong>{approval.title}</strong>
          <small>
            {reviewed
              ? "Reviewed in this preview only"
              : "Demo item · Human review concept"}
          </small>
        </div>
      </div>
      <Button
        variant="ghost"
        ref={trigger}
        className="studio-small-button"
        onClick={() => dialog.current?.showModal()}
      >
        {reviewed ? "View preview" : "Inspect preview"}
      </Button>
      <dialog
        ref={dialog}
        className="studio-dialog"
        aria-labelledby={id}
        onKeyDown={trapDialogFocus}
        onClose={() => trigger.current?.focus()}
      >
        <div className="studio-dialog-top">
          <span className="studio-badge">Demo approval</span>
          <Button
            variant="ghost"
            aria-label="Close approval preview"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </Button>
        </div>
        <h2 id={id}>{approval.title}</h2>
        <p>{approval.description}</p>
        <div className="studio-inline-notice">
          This interaction changes local display only. No real approval or task
          is updated.
        </div>
        <div className="studio-dialog-actions">
          <Button
            onClick={() => {
              setReviewed(true);
              dialog.current?.close();
            }}
          >
            Mark reviewed · Demo
          </Button>
          <Link
            className="button button-secondary"
            href={`/app/${approval.module}`}
            onClick={() => dialog.current?.close()}
          >
            Explore module prototype
          </Link>
        </div>
      </dialog>
      <span className="sr-only" role="status">
        {reviewed
          ? `${approval.title} marked reviewed in this preview. Nothing saved.`
          : ""}
      </span>
    </div>
  );
}

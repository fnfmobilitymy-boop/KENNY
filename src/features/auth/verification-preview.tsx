"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
const states = {
  pending: {
    title: "A little patience. A new beginning.",
    label: "Verification pending",
    description:
      "In the connected product, this is where you would wait for an email verification link. No verification email has been sent in this demo.",
  },
  expired: {
    title: "Let’s take another look.",
    label: "Link expired · Preview",
    description:
      "This is a preview of an expired verification link. A connected authentication service would allow you to request a new email.",
  },
  error: {
    title: "Something needs attention.",
    label: "Verification error · Preview",
    description:
      "This is an error-state preview. No verification token has been checked and no account has been verified.",
  },
} as const;
export function VerificationPreview() {
  const [state, setState] = useState<keyof typeof states>("pending");
  const [notice, setNotice] = useState("");
  const content = states[state];
  return (
    <>
      <p className="eyebrow">EMAIL VERIFICATION / DEMO</p>
      <h1>Check your next step.</h1>
      <div className="demo-notice">
        <span className="tiny-dot" />
        <div>
          <strong>Demo · Verification not connected</strong>
          <p>No email address, token or real account is loaded here.</p>
        </div>
      </div>
      <div className="field">
        <label htmlFor="verification-state">Preview verification state</label>
        <select
          id="verification-state"
          value={state}
          onChange={(e) => {
            setState(e.target.value as keyof typeof states);
            setNotice("");
          }}
        >
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
          <option value="error">Error</option>
        </select>
      </div>
      <section
        className={`verification-state verification-${state}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="badge">
          {state === "error" ? "!" : state === "expired" ? "⌛" : "◇"}{" "}
          {content.label}
        </span>
        <h2>{content.title}</h2>
        <p className="muted">{content.description}</p>
      </section>
      <Button
        className="auth-submit"
        onClick={() =>
          setNotice("Resend is not connected. No verification email was sent.")
        }
      >
        Resend verification <span className="button-demo">Demo</span>
      </Button>
      <p className="form-feedback" role="status">
        {notice}
      </p>
      <div className="row">
        <ButtonLink href="/signup" variant="ghost">
          Back to registration
        </ButtonLink>
        <ButtonLink href="/onboarding" variant="secondary">
          View setup preview
        </ButtonLink>
      </div>
    </>
  );
}

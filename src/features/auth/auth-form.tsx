"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";
import { PasswordField } from "@/components/ui/password-field";
import { validateAuth } from "@/lib/auth-validation";
import type { AuthMode, AuthValues, AuthErrors } from "@/types/auth";
const initial: AuthValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acknowledged: false,
  remember: false,
};
const content = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Back to your orbit.",
    description: "A focused space for what comes next.",
    button: "Log in",
  },
  signup: {
    eyebrow: "YOUR NEXT CHAPTER",
    title: "Make room for your ideas.",
    description: "Start exploring your future business studio.",
    button: "Create account",
  },
  "forgot-password": {
    eyebrow: "A FRESH START",
    title: "Find your way back.",
    description:
      "When authentication is connected, a reset link will help you choose a new password. No reset email can be sent in this preview.",
    button: "Request reset link",
  },
} as const;
export function AuthForm({ mode }: { mode: AuthMode }) {
  const [values, setValues] = useState<AuthValues>(initial);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [phase, setPhase] = useState<"idle" | "checking" | "checked">("idle");
  const [status, setStatus] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const checking = useRef(false);
  const copy = content[mode];
  function change(key: keyof AuthValues, value: string | boolean) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus("");
    setPhase("idle");
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (checking.current) return;
    checking.current = true;
    setPhase("checking");
    setStatus(
      "Checking input format locally. No authentication request is being sent.",
    );
    // A short, explicitly local UI preview makes the pending state inspectable. No API call.
    await new Promise((resolve) => setTimeout(resolve, 220));
    const next = validateAuth(mode, values);
    setErrors(next);
    checking.current = false;
    if (Object.keys(next).length) {
      setPhase("idle");
      setStatus("Please correct the highlighted fields.");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setPhase("checked");
    setStatus(
      mode === "login"
        ? "Local validation complete. Authentication is not connected. You are not signed in."
        : mode === "signup"
          ? "Local validation complete. Account creation is not connected. No account was created and no verification email was sent."
          : "Email format checked locally. Password reset is not connected. No reset email was sent.",
    );
    setValues((v) => ({ ...v, password: "", confirmPassword: "" }));
  }
  const entries = Object.entries(errors).filter(([, message]) => message);
  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="muted auth-description">{copy.description}</p>
      <div className="demo-notice">
        <span className="tiny-dot" />
        <div>
          <strong>Demo · Not connected</strong>
          <p>
            These forms check input locally. No sign-in, account creation or
            emails are available.
          </p>
        </div>
      </div>
      <form
        onSubmit={submit}
        noValidate
        aria-busy={phase === "checking"}
        className="auth-form"
      >
        <div
          ref={summary}
          aria-label={entries.length ? "Form validation errors" : undefined}
          tabIndex={-1}
          className={entries.length ? "validation-summary" : "sr-only"}
          role={entries.length ? "alert" : undefined}
        >
          {entries.length > 0 && (
            <>
              <strong>
                Check {entries.length === 1 ? "this field" : "these fields"}{" "}
                before continuing
              </strong>
              <ul>
                {entries.map(([key, message]) => (
                  <li key={key}>
                    <a
                      href={`#auth-${key}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`auth-${key}`)?.focus();
                      }}
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <fieldset disabled={phase === "checking"} className="form-fields">
          {mode === "signup" && (
            <Field
              id="auth-name"
              label="Full name"
              autoComplete="name"
              required
              maxLength={80}
              value={values.name}
              onChange={(e) => change("name", e.target.value)}
              error={errors.name}
            />
          )}
          <Field
            id="auth-email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => change("email", e.target.value)}
            error={errors.email}
          />
          {mode !== "forgot-password" && (
            <PasswordField
              id="auth-password"
              label="Password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
              value={values.password}
              onChange={(e) => change("password", e.target.value)}
              error={errors.password}
              hint={
                mode === "signup"
                  ? "At least 12 characters, with uppercase, lowercase and a number. This is a demo rule, not a security guarantee."
                  : undefined
              }
            />
          )}{" "}
          {mode === "signup" && (
            <PasswordField
              id="auth-confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              required
              value={values.confirmPassword}
              onChange={(e) => change("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
            />
          )}{" "}
          {mode === "login" && (
            <div className="form-options">
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={(e) => change("remember", e.target.checked)}
                />
                Remember me <span className="muted">(UI only)</span>
              </label>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          )}
          {mode === "signup" && (
            <div>
              <label className="check-label legal-check">
                <input
                  id="auth-acknowledged"
                  type="checkbox"
                  checked={values.acknowledged}
                  onChange={(e) => change("acknowledged", e.target.checked)}
                  aria-invalid={errors.acknowledged ? true : undefined}
                  aria-describedby={
                    errors.acknowledged ? "auth-acknowledged-error" : undefined
                  }
                />
                <span>
                  I understand this is a demo. The{" "}
                  <Link href="/terms">Terms (placeholder)</Link> and{" "}
                  <Link href="/privacy">Privacy notice (placeholder)</Link> are
                  not final legal documents.
                </span>
              </label>
              {errors.acknowledged && (
                <p id="auth-acknowledged-error" className="field-error">
                  {errors.acknowledged}
                </p>
              )}
            </div>
          )}
          <Button
            type="submit"
            className="auth-submit"
            disabled={phase === "checking"}
          >
            {phase === "checking" ? (
              <>
                <span className="local-spinner" aria-hidden="true" />
                Checking locally…
              </>
            ) : (
              <>
                {copy.button} <span className="button-demo">Demo</span>
              </>
            )}
          </Button>
        </fieldset>
        <p
          className={`form-feedback ${phase === "checked" ? "feedback-checked" : ""}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </p>
      </form>
      {mode === "login" ? (
        <p className="auth-switch">
          New to the studio? <Link href="/signup">Explore registration</Link>
        </p>
      ) : (
        <p className="auth-switch">
          {mode === "signup"
            ? "Already have an account?"
            : "Remember your password?"}{" "}
          <Link href="/login">Back to login</Link>
        </p>
      )}
      <div className="auth-explore">
        <span className="muted">Prefer to look around first?</span>
        <ButtonLink href="/app" variant="secondary">
          Explore Command Center · Demo
        </ButtonLink>
        <ButtonLink href="/onboarding" variant="ghost">
          Explore organization setup · Demo
        </ButtonLink>
        {mode === "signup" && (
          <ButtonLink href="/verify-email" variant="ghost">
            Preview email verification UI
          </ButtonLink>
        )}
      </div>
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import {
  industries,
  teamSizes,
  businessGoals,
  moduleInterests,
  onboardingSteps,
} from "@/demo/onboarding";
import { validateOnboarding } from "@/lib/onboarding-validation";
import type { OrganizationDraft, OnboardingErrors } from "@/types/onboarding";
const initial: OrganizationDraft = {
  workspaceName: "",
  industry: "",
  otherIndustry: "",
  teamSize: "",
  goals: [],
  modules: [],
};
const options = {
  industries,
  teamSizes,
  goals: businessGoals,
  modules: moduleInterests,
};
const titles = [
  "A space for your next chapter.",
  "What should we call your workspace?",
  "Where does your business belong?",
  "How many minds in your orbit?",
  "What would you like to move forward?",
  "Choose your areas of possibility.",
  "One last look. Your direction.",
  "Your studio vision is taking shape.",
];
const descriptions = [
  "Explore an organization setup, one thoughtful step at a time. No account is required for this preview.",
  "Choose a business or workspace name. You can change it while exploring this wizard.",
  "Choose the closest fit. This only shapes your local setup preview.",
  "Choose the size of the team you have in mind.",
  "Choose at least one goal to shape your workspace concept.",
  "Optional. Choose any modules you are interested in, or skip this step.",
  "Review your local selections. Go back to refine anything before completing the preview.",
  "This is a completion preview. No organization, account or workspace has been created on a server.",
];
export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<OrganizationDraft>(initial);
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const previousStep = useRef(0);
  useEffect(() => {
    if (previousStep.current !== step) {
      heading.current?.focus();
      previousStep.current = step;
    }
  }, [step]);
  function change<K extends keyof OrganizationDraft>(
    key: K,
    value: OrganizationDraft[K],
  ) {
    setDraft((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }
  function toggle(key: "goals" | "modules", value: string) {
    change(
      key,
      draft[key].includes(value)
        ? draft[key].filter((v) => v !== value)
        : [...draft[key], value],
    );
  }
  function go(next: number) {
    setErrors({});
    setStep(next);
  }
  function advance(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validateOnboarding(step, draft, options);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    go(Math.min(step + 1, 7));
  }
  const details = [
    { label: "Workspace", value: draft.workspaceName.trim(), step: 1 },
    {
      label: "Industry",
      value:
        draft.industry +
        (draft.industry === "Other" && draft.otherIndustry.trim()
          ? ` · ${draft.otherIndustry.trim()}`
          : ""),
      step: 2,
    },
    { label: "Team size", value: draft.teamSize, step: 3 },
    { label: "Business goals", value: draft.goals.join(", "), step: 4 },
    {
      label: "AI module interests",
      value: draft.modules.join(", ") || "No preferences selected (optional)",
      step: 5,
    },
  ];
  return (
    <div className="wizard-layout">
      <aside
        className="wizard-sidebar"
        aria-label="Organization setup progress"
      >
        <p className="eyebrow">YOUR STUDIO BLUEPRINT</p>
        <h2>
          Small steps.
          <br />
          <span>New possibilities.</span>
        </h2>
        <ol className="wizard-step-list">
          {onboardingSteps.map((label, index) => (
            <li
              key={label}
              aria-current={index === step ? "step" : undefined}
              className={
                index === step ? "current" : index < step ? "visited" : ""
              }
            >
              <span className="wizard-step-number">
                {index < step ? (
                  <Icon name="check" />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              {index < step ? (
                <button
                  type="button"
                  onClick={() => go(index)}
                  aria-label={`Return to ${label}`}
                >
                  {label}
                </button>
              ) : (
                <span>{label}</span>
              )}
            </li>
          ))}
        </ol>
        <p className="wizard-side-note">
          Built around your direction.
          <br />
          Always a preview at this stage.
        </p>
      </aside>
      <div className="wizard-main">
        <div className="wizard-topline">
          <span className="eyebrow">ORGANIZATION SETUP</span>
          <span className="badge">Demo only</span>
        </div>
        <div
          className="wizard-progress"
          role="progressbar"
          aria-label="Organization setup progress"
          aria-valuemin={1}
          aria-valuemax={8}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of 8: ${onboardingSteps[step]}`}
        >
          <span style={{ width: `${((step + 1) / 8) * 100}%` }} />
        </div>
        <p className="wizard-step-caption">
          Step {step + 1} of 8 · {onboardingSteps[step]}
        </p>
        <div className="wizard-heading">
          <h1 ref={heading} tabIndex={-1}>
            {titles[step]}
          </h1>
          <p className="muted">{descriptions[step]}</p>
        </div>
        <form noValidate onSubmit={advance}>
          <div
            ref={errorSummary}
            aria-label={
              Object.keys(errors).length ? "Setup validation errors" : undefined
            }
            tabIndex={-1}
            className={
              Object.keys(errors).length ? "validation-summary" : "sr-only"
            }
            role={Object.keys(errors).length ? "alert" : undefined}
          >
            {Object.keys(errors).length > 0 && (
              <>
                <strong>Check your selections</strong>
                <ul>
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="wizard-step-content">
            {step === 0 && (
              <>
                <div className="welcome-core" aria-hidden="true">
                  <span className="brand-mark">K</span>
                </div>
                <ul className="welcome-list">
                  <li>
                    <Icon name="workspace" />
                    <span>
                      <strong>A workspace with your context</strong>
                      <small>
                        Name your space and choose your business focus.
                      </small>
                    </span>
                  </li>
                  <li>
                    <Icon name="sparkle" />
                    <span>
                      <strong>Possibilities that fit your ambition</strong>
                      <small>
                        Choose goals and explore planned module interests.
                      </small>
                    </span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>
                      <strong>Review before anything moves forward</strong>
                      <small>
                        Your selections stay in this page’s memory only.
                      </small>
                    </span>
                  </li>
                </ul>
                <div className="demo-notice">
                  <span className="tiny-dot" />
                  <div>
                    <strong>No backend connected</strong>
                    <p>
                      Use sample information. Nothing here creates an
                      organization, sends invitations or starts a subscription.
                    </p>
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <Field
                id="workspace-name"
                label="Business / workspace name"
                required
                minLength={2}
                maxLength={80}
                autoComplete="organization"
                placeholder="e.g. Northstar Creative"
                value={draft.workspaceName}
                onChange={(e) => change("workspaceName", e.target.value)}
                error={errors.workspaceName}
                hint="Required · 2–80 characters. Use a sample name for this preview."
              />
            )}
            {step === 2 && (
              <>
                <div className="field">
                  <label htmlFor="industry">
                    Industry <span className="muted">(required)</span>
                  </label>
                  <select
                    id="industry"
                    value={draft.industry}
                    aria-invalid={errors.industry ? true : undefined}
                    aria-describedby={
                      errors.industry ? "industry-error" : undefined
                    }
                    onChange={(e) => change("industry", e.target.value)}
                  >
                    <option value="">Choose an industry</option>
                    {industries.map((industry) => (
                      <option key={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && (
                    <small className="field-error" id="industry-error">
                      {errors.industry}
                    </small>
                  )}
                </div>
                {draft.industry === "Other" && (
                  <Field
                    id="other-industry"
                    label="Describe your industry (optional)"
                    value={draft.otherIndustry}
                    maxLength={100}
                    error={errors.otherIndustry}
                    onChange={(e) => change("otherIndustry", e.target.value)}
                  />
                )}
              </>
            )}
            {step === 3 && (
              <fieldset
                className="choice-fieldset"
                aria-describedby={errors.teamSize ? "team-error" : undefined}
              >
                <legend>Team size (required)</legend>
                <div className="choice-grid">
                  {teamSizes.map((size) => (
                    <label key={size} className="choice-card">
                      <input
                        type="radio"
                        name="team-size"
                        value={size}
                        checked={draft.teamSize === size}
                        onChange={() => change("teamSize", size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                {errors.teamSize && (
                  <p className="field-error" id="team-error">
                    {errors.teamSize}
                  </p>
                )}
              </fieldset>
            )}
            {step === 4 && (
              <fieldset
                className="choice-fieldset"
                aria-describedby={errors.goals ? "goals-error" : "goals-hint"}
              >
                <legend>Business goals (choose at least one)</legend>
                <p id="goals-hint" className="muted choice-hint">
                  You can select more than one.
                </p>
                <div className="choice-grid">
                  {businessGoals.map((goal) => (
                    <label key={goal} className="choice-card">
                      <input
                        type="checkbox"
                        checked={draft.goals.includes(goal)}
                        onChange={() => toggle("goals", goal)}
                        aria-invalid={errors.goals ? true : undefined}
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
                {errors.goals && (
                  <p className="field-error" id="goals-error">
                    {errors.goals}
                  </p>
                )}
              </fieldset>
            )}
            {step === 5 && (
              <fieldset className="choice-fieldset">
                <legend>AI module interests (optional)</legend>
                <p className="muted choice-hint">
                  All listed capabilities are planned. Selecting one does not
                  activate a service.
                </p>
                <div className="choice-grid module-choice-grid">
                  {moduleInterests.map((module) => (
                    <label key={module} className="choice-card">
                      <input
                        type="checkbox"
                        checked={draft.modules.includes(module)}
                        onChange={() => toggle("modules", module)}
                      />
                      <span>{module}</span>
                    </label>
                  ))}
                </div>
                <p className="selection-count" role="status">
                  {draft.modules.length} modules selected
                </p>
              </fieldset>
            )}
            {(step === 6 || step === 7) && (
              <>
                {step === 7 && (
                  <div className="completion-notice" role="status">
                    <Icon name="check" />
                    <div>
                      <strong>Local setup preview complete</strong>
                      <p>
                        No server-side workspace was created. Supabase is not
                        connected.
                      </p>
                    </div>
                  </div>
                )}
                <dl className="review-list">
                  {details.map((detail) => (
                    <div key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value || "Not selected"}</dd>
                      {step === 6 && (
                        <Button
                          variant="ghost"
                          className="review-edit"
                          onClick={() => go(detail.step)}
                          aria-label={`Edit ${detail.label}`}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  ))}
                </dl>
                {step === 6 && (
                  <div className="demo-notice">
                    <span className="tiny-dot" />
                    <div>
                      <strong>
                        Completing this preview saves nothing remotely.
                      </strong>
                      <p>
                        Your choices are not an account, organization or
                        subscription.
                      </p>
                    </div>
                  </div>
                )}
                {step === 7 && (
                  <div className="completion-actions">
                    <ButtonLink href="/" variant="secondary">
                      Back to website
                    </ButtonLink>
                    <ButtonLink href="/signup" variant="ghost">
                      Explore registration UI
                    </ButtonLink>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="wizard-actions">
            <Button
              variant="ghost"
              disabled={step === 0}
              onClick={() => go(step - 1)}
            >
              Back
            </Button>
            {step < 7 ? (
              <Button type="submit">
                {step === 0
                  ? "Start setup preview"
                  : step === 6
                    ? "Complete demo preview"
                    : "Next"}
                <Icon name="arrow" />
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => go(6)}>
                Review again
              </Button>
            )}
          </div>
        </form>
        <p className="wizard-memory-note">
          Preview only · Information stays in this wizard’s memory. Refreshing
          or leaving this page clears it. Do not enter confidential information.
        </p>
      </div>
    </div>
  );
}

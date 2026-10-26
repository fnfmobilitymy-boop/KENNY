import type { OrganizationDraft, OnboardingErrors } from "../types/onboarding";
// Accept option catalogs explicitly so validation remains pure and independently testable.
export function validateOnboarding(
  step: number,
  draft: OrganizationDraft,
  options: {
    industries: readonly string[];
    teamSizes: readonly string[];
    goals: readonly string[];
    modules: readonly string[];
  },
): OnboardingErrors {
  const errors: OnboardingErrors = {};
  if (
    (step === 1 || step === 6) &&
    (draft.workspaceName.trim().length < 2 ||
      draft.workspaceName.trim().length > 80)
  )
    errors.workspaceName = "Enter a workspace name using 2–80 characters.";
  if (
    (step === 2 || step === 6) &&
    !options.industries.includes(draft.industry)
  )
    errors.industry = "Choose your industry.";
  if (draft.otherIndustry.length > 100)
    errors.otherIndustry =
      "Keep the industry description within 100 characters.";
  if ((step === 3 || step === 6) && !options.teamSizes.includes(draft.teamSize))
    errors.teamSize = "Choose your team size.";
  if (
    (step === 4 || step === 6) &&
    (!draft.goals.length ||
      draft.goals.some((goal) => !options.goals.includes(goal)))
  )
    errors.goals = "Choose at least one business goal from the list.";
  if (
    (step === 5 || step === 6) &&
    draft.modules.some((module) => !options.modules.includes(module))
  )
    errors.modules = "Choose module interests from the list.";
  return errors;
}

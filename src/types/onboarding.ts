export interface OrganizationDraft {
  workspaceName: string;
  industry: string;
  otherIndustry: string;
  teamSize: string;
  goals: string[];
  modules: string[];
}
export type OnboardingErrors = Partial<Record<keyof OrganizationDraft, string>>;

/** Fictional account concepts only. No signed-in account or subscription exists in this frontend. */
export const profileSample = {
  name: "Demo visitor",
  email: "visitor@example.invalid",
  workspace: "Kenny Studio",
  industry: "Creative",
  timezone: "Asia/Kuala_Lumpur",
} as const;
export const teamSamples = [
  {
    id: "member-1",
    name: "Avery Example",
    detail: "Fictional team member",
    role: "Owner concept",
  },
  {
    id: "member-2",
    name: "Morgan Example",
    detail: "Fictional team member",
    role: "Editor concept",
  },
] as const;
export const integrationSamples = [
  "AI provider",
  "Google Workspace",
  "Social channels",
  "Store platform",
] as const;
export const notificationSamples = [
  "Weekly digest preview",
  "Approval reminder preview",
  "Product update preview",
] as const;

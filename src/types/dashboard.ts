import type { IconName } from "@/components/ui/icon";
export type ModuleSlug =
  | "workspace"
  | "website-builder"
  | "image-studio"
  | "video-studio"
  | "marketing"
  | "seo-ads"
  | "sales"
  | "crm"
  | "documents"
  | "booking"
  | "ecommerce"
  | "automations"
  | "analytics"
  | "billing"
  | "settings";
export interface PlannedModule {
  slug: ModuleSlug;
  name: string;
  group: "OVERVIEW" | "CREATE" | "GROW" | "MANAGE" | "ACCOUNT";
  icon: IconName;
  description: string;
  capabilities: readonly string[];
}
export interface DemoWorkspace {
  id: string;
  name: string;
  initials: string;
  description: string;
  empty: boolean;
}
export interface DemoTask {
  id: string;
  title: string;
  module: ModuleSlug;
  status: "Draft" | "Needs review" | "Concept";
}
export interface DemoAgent {
  id: string;
  name: string;
  role: string;
  description: string;
}
export interface DemoApproval {
  id: string;
  title: string;
  description: string;
  module: ModuleSlug;
}
export interface DemoProject {
  id: string;
  name: string;
  type: string;
  module: ModuleSlug;
}
export interface DemoActivity {
  id: string;
  title: string;
  description: string;
  label: string;
  icon: IconName;
}
export type DashboardPreviewState = "ready" | "loading" | "error";
/** Future adapter contract only. No implementation or silent fixture fallback. */
export interface CommandCenterSnapshot {
  tasks: readonly DemoTask[];
  projects: readonly DemoProject[];
  approvals: readonly DemoApproval[];
}

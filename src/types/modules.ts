/** M7 frontend view models. Fixtures must never substitute for a production service. */
export type ModulePreviewState = "ready" | "empty" | "loading" | "error";
export interface SampleItem {
  id: string;
  name: string;
  detail: string;
}
export type LeadStage = "New" | "Qualified" | "Proposal";
export interface SampleLead extends SampleItem {
  stage: LeadStage;
  channel: string;
}
export interface SampleProduct extends SampleItem {
  stock: number;
  category: string;
}
export interface SampleAppointment extends SampleItem {
  day: string;
  time: string;
  duration: number;
}
export interface SampleMetric {
  label: string;
  values: readonly number[];
}
export interface WorkflowDraft {
  trigger: string;
  action: string;
  review: boolean;
}
export interface DocumentDraft {
  recipient: string;
  subject: string;
  quantity: number;
  unitAmount: number;
  notes: string;
}
export type ServiceConnection = "not-connected" | "connected" | "unavailable";
/** Future adapter boundary only. No provider, persistence or fallback implementation. */
export interface ModuleServiceContract<TRequest, TResult> {
  connection(): Promise<ServiceConnection>;
  submit(request: TRequest, signal: AbortSignal): Promise<TResult>;
}
export interface FutureModuleRequest {
  workspaceId: string;
  moduleId: string;
  draftId: string;
  approvalId?: string;
}
export interface FutureArtifact {
  id: string;
  kind: "image" | "video" | "document" | "website";
  status: "pending" | "ready" | "failed";
}

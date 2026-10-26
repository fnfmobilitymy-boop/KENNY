/** Provider-neutral frontend view models. No service is connected in M6. */
export type ScenarioId =
  "marketing" | "website" | "follow-up" | "seo" | "translation" | "summary";
export type PreviewStatus =
  | "pending"
  | "queued-preview"
  | "running-preview"
  | "complete-preview"
  | "failed-preview"
  | "canceled-preview";
export interface LocalAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
}
export interface WorkspaceMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  label: string;
  source: "fixture" | "local-input" | "sample-output";
  attachments?: LocalAttachment[];
}
export interface WorkspaceOutput {
  title: string;
  content: string;
  cards: readonly { label: string; value: string }[];
  artifactName: string;
}
export interface WorkspaceScenario {
  id: ScenarioId;
  name: string;
  prompt: string;
  taskType: string;
  plannedTool: string;
  output: WorkspaceOutput;
  approval: boolean;
}
export interface PreviewTask {
  id: string;
  scenarioId: ScenarioId;
  status: PreviewStatus;
  approval: "none" | "pending" | "approved-preview" | "rejected-preview";
}
export interface ConversationThread {
  id: string;
  title: string;
  updatedLabel: string;
  scenarioId: ScenarioId;
  messages: WorkspaceMessage[];
  draft: string;
  attachments: LocalAttachment[];
  task: PreviewTask | null;
}
export interface WorkspaceState {
  threads: ConversationThread[];
  activeId: string | null;
  nextId: number;
}
export interface WorkspaceRequest {
  threadId: string;
  taskId: string;
  prompt: string;
  attachments: readonly { id: string; name: string }[];
}
export type ProviderConnection = "not-connected" | "unavailable" | "connected";
export type ServiceTaskState =
  | "queued"
  | "running"
  | "awaiting-approval"
  | "complete"
  | "failed"
  | "canceled";
export interface FutureOutputReference {
  id: string;
  kind: "text" | "structured" | "artifact";
  artifactId?: string;
}
/** Future server adapter only; no implementation, credentials or network call. Local samples must never be its fallback. */
export interface WorkspaceService {
  connection(): Promise<ProviderConnection>;
  submit(
    request: WorkspaceRequest,
    signal: AbortSignal,
  ): Promise<{ taskId: string; state: ServiceTaskState }>;
  cancel(taskId: string): Promise<void>;
}

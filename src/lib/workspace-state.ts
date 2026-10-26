import type {
  WorkspaceState,
  ConversationThread,
  ScenarioId,
  LocalAttachment,
  PreviewTask,
} from "../types/workspace";
export const PROMPT_LIMIT = 4000;
export const ATTACHMENT_LIMIT = 3;
export const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
export function validatePrompt(value: string) {
  if (!value.trim())
    return "Write a prompt before starting the sample preview.";
  if (value.length > PROMPT_LIMIT)
    return `Use no more than ${PROMPT_LIMIT} characters.`;
  return null;
}
export function validateAttachment(file: { name: string; size: number }) {
  if (!/\.(txt|md|pdf)$/i.test(file.name))
    return "Unsupported file type. Only .txt, .md and .pdf metadata previews are supported.";
  if (file.size > FILE_SIZE_LIMIT)
    return "Choose a file no larger than 5 MB for this metadata-only preview.";
  return null;
}
export function validateThreadTitle(title: string) {
  return title.trim().length < 1 || title.trim().length > 80
    ? "Use a conversation title with 1–80 characters."
    : null;
}
export function searchThreads(
  query: string,
  threads: readonly ConversationThread[],
) {
  const term = query.trim().toLowerCase();
  return threads.filter((thread) => thread.title.toLowerCase().includes(term));
}
export type WorkspaceAction =
  | { type: "reset"; state: WorkspaceState }
  | { type: "new" }
  | { type: "select"; id: string }
  | { type: "draft"; id: string; value: string }
  | { type: "scenario"; id: string; scenarioId: ScenarioId }
  | { type: "rename"; id: string; title: string }
  | { type: "delete"; id: string }
  | { type: "attach"; id: string; attachments: LocalAttachment[] }
  | { type: "remove-attachment"; id: string; attachmentId: string }
  | {
      type: "start";
      id: string;
      task: PreviewTask;
      prompt: string;
      userMessageId: string;
      retry?: boolean;
    }
  | { type: "running"; id: string; taskId: string }
  | {
      type: "finish";
      id: string;
      taskId: string;
      outcome: "complete-preview" | "failed-preview";
      sample: string;
      assistantId: string;
      requiresApproval: boolean;
    }
  | { type: "cancel"; id: string; taskId: string }
  | {
      type: "approve";
      id: string;
      decision: "approved-preview" | "rejected-preview";
    };
function update(
  state: WorkspaceState,
  id: string,
  fn: (thread: ConversationThread) => ConversationThread,
): WorkspaceState {
  return {
    ...state,
    threads: state.threads.map((thread) =>
      thread.id === id ? fn(thread) : thread,
    ),
  };
}
export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction,
): WorkspaceState {
  switch (action.type) {
    case "reset":
      return action.state;
    case "new": {
      const id = `local-thread-${state.nextId}`;
      return {
        ...state,
        nextId: state.nextId + 1,
        activeId: id,
        threads: [
          {
            id,
            title: "Untitled conversation",
            updatedLabel: "Created in this preview",
            scenarioId: "marketing",
            messages: [],
            draft: "",
            attachments: [],
            task: null,
          },
          ...state.threads,
        ],
      };
    }
    case "select":
      return state.threads.some((t) => t.id === action.id)
        ? { ...state, activeId: action.id }
        : state;
    case "delete": {
      const threads = state.threads.filter((t) => t.id !== action.id);
      return {
        ...state,
        threads,
        activeId:
          state.activeId === action.id
            ? threads[0]?.id || null
            : state.activeId,
      };
    }
    case "rename":
      return validateThreadTitle(action.title)
        ? state
        : update(state, action.id, (t) => ({
            ...t,
            title: action.title.trim(),
            updatedLabel: "Renamed in this preview",
          }));
    case "draft":
      return update(state, action.id, (t) => ({ ...t, draft: action.value }));
    case "scenario":
      return update(state, action.id, (t) => ({
        ...t,
        scenarioId: action.scenarioId,
      }));
    case "attach":
      return update(state, action.id, (t) => ({
        ...t,
        attachments: [...t.attachments, ...action.attachments].slice(
          0,
          ATTACHMENT_LIMIT,
        ),
      }));
    case "remove-attachment":
      return update(state, action.id, (t) => ({
        ...t,
        attachments: t.attachments.filter((a) => a.id !== action.attachmentId),
      }));
    case "start":
      return update(state, action.id, (t) => {
        if (
          t.task &&
          ["queued-preview", "running-preview"].includes(t.task.status)
        )
          return t;
        return {
          ...t,
          draft: action.retry ? t.draft : "",
          attachments: action.retry ? t.attachments : [],
          updatedLabel: "Preview interaction · this session",
          task: action.task,
          messages: action.retry
            ? t.messages
            : [
                ...t.messages,
                {
                  id: action.userMessageId,
                  role: "user",
                  source: "local-input",
                  label: "Entered in this preview",
                  content: action.prompt,
                  attachments: t.attachments,
                },
              ],
        };
      });
    case "running":
      return update(state, action.id, (t) =>
        t.task?.id === action.taskId && t.task.status === "queued-preview"
          ? { ...t, task: { ...t.task, status: "running-preview" } }
          : t,
      );
    case "finish":
      return update(state, action.id, (t) =>
        t.task?.id === action.taskId &&
        ["queued-preview", "running-preview"].includes(t.task.status)
          ? {
              ...t,
              task: {
                ...t.task,
                status: action.outcome,
                approval:
                  action.outcome === "complete-preview" &&
                  action.requiresApproval
                    ? "pending"
                    : "none",
              },
              messages:
                action.outcome === "complete-preview"
                  ? [
                      ...t.messages,
                      {
                        id: action.assistantId,
                        role: "assistant",
                        source: "sample-output",
                        label: "Prewritten sample · local preview",
                        content: action.sample,
                      },
                    ]
                  : t.messages,
            }
          : t,
      );
    case "cancel":
      return update(state, action.id, (t) =>
        t.task?.id === action.taskId &&
        ["queued-preview", "running-preview"].includes(t.task.status)
          ? {
              ...t,
              task: { ...t.task, status: "canceled-preview", approval: "none" },
            }
          : t,
      );
    case "approve":
      return update(state, action.id, (t) =>
        t.task?.status === "complete-preview" && t.task.approval === "pending"
          ? { ...t, task: { ...t.task, approval: action.decision } }
          : t,
      );
  }
}

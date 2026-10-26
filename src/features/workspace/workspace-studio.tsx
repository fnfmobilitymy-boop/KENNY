"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { useAppPreview } from "@/features/app-shell/app-context";
import { trapDialogFocus } from "@/lib/dialog-focus";
import { validateThreadTitle, PROMPT_LIMIT } from "@/lib/workspace-state";
import { workspaceScenarios } from "@/demo/workspace";
import { ConversationHistory } from "./conversation-history";
import { PromptComposer } from "./prompt-composer";
import { MessageList } from "./message-list";
import { TaskInspector } from "./task-inspector";
import type { InspectorTab } from "./task-inspector";
import { useWorkspacePreview } from "./use-workspace-preview";
import type { WorkspaceScenario } from "@/types/workspace";
const media = "(min-width: 1280px)";
function subscribeWide(callback: () => void) {
  const m = window.matchMedia(media);
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
}
function snapshotWide() {
  return window.matchMedia(media).matches;
}
export function WorkspaceStudio() {
  const { workspace } = useAppPreview();
  return (
    <WorkspaceSession
      key={workspace.id}
      empty={workspace.empty}
      workspaceName={workspace.name}
    />
  );
}
function WorkspaceSession({
  empty,
  workspaceName,
}: {
  empty: boolean;
  workspaceName: string;
}) {
  const {
    state,
    dispatch,
    notice,
    setNotice,
    outcome,
    setOutcome,
    start,
    stop,
    reset,
  } = useWorkspacePreview(empty);
  const active = state.threads.find((t) => t.id === state.activeId) || null;
  const busy =
    !!active?.task &&
    ["queued-preview", "running-preview"].includes(active.task.status);
  const wide = useSyncExternalStore(subscribeWide, snapshotWide, () => false);
  const [historyVisible, setHistoryVisible] = useState(true);
  const [inspectorVisible, setInspectorVisible] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<InspectorTab>("OVERVIEW");
  const [action, setAction] = useState<{
    mode: "rename" | "delete" | "reset";
    id?: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const historyDialog = useRef<HTMLDialogElement>(null);
  const inspectorDialog = useRef<HTMLDialogElement>(null);
  const actionDialog = useRef<HTMLDialogElement>(null);
  const historyTrigger = useRef<HTMLButtonElement>(null);
  const inspectorTrigger = useRef<HTMLButtonElement>(null);
  const actionReturn = useRef<HTMLElement | null>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const chatTitle = useRef<HTMLHeadingElement>(null);
  const focusAfterHistory = useRef<"composer" | "title" | null>(null);
  useEffect(() => {
    if (action && !actionDialog.current?.open)
      actionDialog.current?.showModal();
  }, [action]);
  function focusContent(target: "composer" | "title") {
    requestAnimationFrame(() =>
      target === "composer"
        ? composer.current?.focus()
        : chatTitle.current?.focus(),
    );
  }
  function closeHistory(target: "composer" | "title") {
    if (historyDialog.current?.open) {
      focusAfterHistory.current = target;
      historyDialog.current.close();
    } else focusContent(target);
  }
  function newChat() {
    stop();
    dispatch({ type: "new" });
    setQuery("");
    setNotice("New local conversation. Nothing will be persisted.");
    closeHistory("composer");
  }
  function selectThread(id: string) {
    if (busy) stop();
    else setNotice("Conversation selected. All changes stay in memory.");
    dispatch({ type: "select", id });
    closeHistory("title");
  }
  function openAction(
    mode: "rename" | "delete" | "reset",
    id?: string,
    trigger?: HTMLElement,
  ) {
    setAction({ mode, id });
    setTitle(state.threads.find((t) => t.id === id)?.title || "");
    setTitleError("");
    actionReturn.current = trigger || (document.activeElement as HTMLElement);
  }
  function template(scenario: WorkspaceScenario) {
    if (!active || busy) return;
    const next = active.draft
      ? `${active.draft}\n${scenario.prompt}`
      : scenario.prompt;
    if (next.length > PROMPT_LIMIT) {
      setNotice(
        "Template was not inserted because it would exceed 4,000 characters. Your draft is unchanged.",
      );
      return;
    }
    dispatch({ type: "scenario", id: active.id, scenarioId: scenario.id });
    dispatch({ type: "draft", id: active.id, value: next });
    setNotice(
      "Prompt template inserted locally. The sample output is fixed, not generated from this text.",
    );
    focusContent("composer");
  }
  const historyProps = {
    threads: state.threads,
    activeId: state.activeId,
    query,
    onQuery: setQuery,
    onNew: newChat,
    onSelect: selectThread,
    onAction: openAction,
  };
  const inspectorProps = {
    thread: active,
    tab,
    onTab: setTab,
    onApprove: (decision: "approved-preview" | "rejected-preview") => {
      if (active) dispatch({ type: "approve", id: active.id, decision });
      setNotice(
        `${decision === "approved-preview" ? "Approved" : "Rejected"} in this local preview only. No external action occurred.`,
      );
    },
  };
  return (
    <div className="ai-workspace">
      <header className="workspace-titlebar">
        <div>
          <p className="eyebrow">THINK WITH CONTEXT. EXPLORE WITH INTENTION.</p>
          <h1>AI Workspace</h1>
          <p>{workspaceName} · Illustrative workspace</p>
        </div>
        <div className="workspace-toolbar">
          <Button
            ref={historyTrigger}
            variant="ghost"
            aria-label="Conversation history"
            aria-expanded={wide ? historyVisible : historyOpen}
            aria-controls={
              wide ? "workspace-inline-history" : "workspace-history-dialog"
            }
            onClick={() => {
              if (wide) setHistoryVisible(!historyVisible);
              else {
                historyDialog.current?.showModal();
                setHistoryOpen(true);
              }
            }}
          >
            <Icon name="history" />
            <span>History</span>
          </Button>
          <Button
            ref={inspectorTrigger}
            variant="ghost"
            aria-label="Task inspector"
            aria-expanded={wide ? inspectorVisible : inspectorOpen}
            aria-controls={
              wide ? "workspace-inline-inspector" : "workspace-inspector-dialog"
            }
            onClick={() => {
              if (wide) setInspectorVisible(!inspectorVisible);
              else {
                inspectorDialog.current?.showModal();
                setInspectorOpen(true);
              }
            }}
          >
            <Icon name="operations" />
            <span>Inspector</span>
          </Button>
          <Button onClick={newChat}>
            New chat
            <Icon name="plus" />
          </Button>
          <Button
            variant="ghost"
            aria-label="Reset workspace preview"
            onClick={(e) => openAction("reset", undefined, e.currentTarget)}
          >
            <Icon name="reset" />
          </Button>
        </div>
      </header>
      <div className="workspace-demo-banner">
        <span className="studio-badge">DEMO MODE</span>
        <p>
          <strong>Preview simulator.</strong> Fixed samples only. No AI calls,
          tool execution or file processing. Future service:{" "}
          <strong>Not connected.</strong>
        </p>
      </div>
      <div
        className="workspace-grid"
        data-history={historyVisible}
        data-inspector={inspectorVisible}
      >
        <aside
          id="workspace-inline-history"
          className="workspace-history-inline"
          hidden={!historyVisible}
          aria-label="Conversation history panel"
        >
          <ConversationHistory {...historyProps} />
        </aside>
        <section
          className="workspace-chat-panel"
          aria-label="AI conversation preview"
        >
          <div className="workspace-chat-header">
            <div>
              <h2 ref={chatTitle} tabIndex={-1}>
                {active?.title || "A blank page. A new possibility."}
              </h2>
              <p>{active?.updatedLabel || "Empty workspace · Local preview"}</p>
            </div>
            <span className="workspace-status">
              {active?.task?.status || "pending"}
            </span>
          </div>
          <div className="workspace-scenario-controls">
            <label>
              Sample scenario
              <select
                aria-label="Sample scenario"
                disabled={!active || busy}
                value={active?.scenarioId || "marketing"}
                onChange={(e) => {
                  if (active)
                    dispatch({
                      type: "scenario",
                      id: active.id,
                      scenarioId: e.target.value as WorkspaceScenario["id"],
                    });
                }}
              >
                {workspaceScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Preview outcome
              <select
                aria-label="Preview outcome"
                value={outcome}
                disabled={busy}
                onChange={(e) =>
                  setOutcome(e.target.value as "sample" | "failure")
                }
              >
                <option value="sample">Fixed sample</option>
                <option value="failure">Sample failure</option>
              </select>
            </label>
          </div>
          <MessageList
            thread={active}
            busy={busy}
            scenarios={workspaceScenarios}
            onTemplate={template}
            onNew={newChat}
            onNotice={setNotice}
          />
          {active?.task && !busy && (
            <div className="sample-retry-row">
              <span>
                {active.task.status === "complete-preview"
                  ? "Sample result ready · No AI generated it."
                  : active.task.status === "failed-preview"
                    ? "Failure preview · No real outage."
                    : "Stopped locally · No request was sent."}
              </span>
              <Button
                variant="ghost"
                onClick={() => {
                  setOutcome("sample");
                  start(active, true, "sample");
                }}
              >
                {active.task.status === "complete-preview"
                  ? "Replay fixed sample"
                  : "Retry sample preview"}
              </Button>
            </div>
          )}
          <PromptComposer
            key={active?.id || "empty"}
            thread={active}
            busy={busy}
            inputRef={composer}
            onDraft={(value) => {
              if (active) dispatch({ type: "draft", id: active.id, value });
            }}
            onSend={() => active && start(active)}
            onStop={stop}
            onAttach={(attachments) => {
              if (active)
                dispatch({ type: "attach", id: active.id, attachments });
              setNotice(
                "Attachment names selected locally. File contents were not read.",
              );
            }}
            onRemove={(attachmentId) =>
              active &&
              dispatch({
                type: "remove-attachment",
                id: active.id,
                attachmentId,
              })
            }
          />
        </section>
        <aside
          id="workspace-inline-inspector"
          className="workspace-inspector-inline"
          hidden={!inspectorVisible}
          aria-label="Task inspector panel"
        >
          <TaskInspector {...inspectorProps} />
        </aside>
      </div>
      <p
        className="workspace-live-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notice}
      </p>
      <p className="workspace-privacy-note">
        Local memory only. Refreshing, switching demo workspaces or leaving the
        page clears this prototype. Do not enter sensitive information.
        Conversations and attachments are not saved to browser storage.
      </p>
      <dialog
        ref={historyDialog}
        id="workspace-history-dialog"
        className="workspace-panel-dialog workspace-history-dialog"
        aria-label="Conversation history drawer"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          setHistoryOpen(false);
          const target = focusAfterHistory.current;
          focusAfterHistory.current = null;
          if (target) focusContent(target);
          else historyTrigger.current?.focus();
        }}
      >
        <Button
          variant="ghost"
          className="workspace-drawer-close"
          aria-label="Close conversation history"
          onClick={() => historyDialog.current?.close()}
        >
          <Icon name="close" />
        </Button>
        <ConversationHistory {...historyProps} inDialog />
      </dialog>
      <dialog
        ref={inspectorDialog}
        id="workspace-inspector-dialog"
        className="workspace-panel-dialog workspace-inspector-dialog"
        aria-label="Task inspector drawer"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          setInspectorOpen(false);
          inspectorTrigger.current?.focus();
        }}
      >
        <Button
          variant="ghost"
          className="workspace-drawer-close"
          aria-label="Close task inspector"
          onClick={() => inspectorDialog.current?.close()}
        >
          <Icon name="close" />
        </Button>
        <TaskInspector {...inspectorProps} />
      </dialog>
      <dialog
        ref={actionDialog}
        className="workspace-action-dialog"
        aria-labelledby="workspace-action-title"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          if (actionReturn.current?.isConnected) actionReturn.current.focus();
          else {
            const button = Array.from(
              document.querySelectorAll<HTMLButtonElement>(
                "[data-new-conversation]",
              ),
            ).find((el) => el.getClientRects().length);
            button?.focus();
          }
          setAction(null);
        }}
      >
        <p className="eyebrow">LOCAL PREVIEW ONLY</p>
        <h2 id="workspace-action-title">
          {action?.mode === "rename"
            ? "Rename conversation"
            : action?.mode === "delete"
              ? "Delete this conversation?"
              : "Reset the workspace preview?"}
        </h2>
        <p>
          {action?.mode === "rename"
            ? "Change this title in memory only."
            : action?.mode === "delete"
              ? "This removes the conversation and its local messages from this preview. No server record is changed."
              : "This discards all local conversations, drafts, attachments and decisions and restores the selected workspace’s initial demo state."}
        </p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!action) return;
            if (action.mode === "rename") {
              const error = validateThreadTitle(title);
              setTitleError(error || "");
              if (error) {
                requestAnimationFrame(() =>
                  document.getElementById("conversation-title-input")?.focus(),
                );
                return;
              }
              dispatch({ type: "rename", id: action.id!, title });
              setNotice("Conversation renamed locally. Nothing saved.");
            } else if (action.mode === "delete") {
              if (action.id === state.activeId) stop();
              dispatch({ type: "delete", id: action.id! });
              setNotice("Conversation deleted from this local preview only.");
            } else {
              reset();
              setQuery("");
              setTab("OVERVIEW");
            }
            actionDialog.current?.close();
          }}
        >
          {action?.mode === "rename" && (
            <Field
              id="conversation-title-input"
              label="Conversation title"
              autoFocus
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={titleError}
            />
          )}
          <div className="workspace-action-buttons">
            <Button
              variant="ghost"
              onClick={() => actionDialog.current?.close()}
            >
              Cancel
            </Button>
            <Button type="submit">
              {action?.mode === "rename"
                ? "Save title · Local"
                : action?.mode === "delete"
                  ? "Delete conversation · Local"
                  : "Reset preview · Local"}
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

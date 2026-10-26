"use client";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Dropdown } from "@/features/app-shell/dropdown";
import { Icon } from "@/components/ui/icon";
import { searchThreads } from "@/lib/workspace-state";
import type { ConversationThread } from "@/types/workspace";
export function ConversationHistory({
  threads,
  activeId,
  query,
  onQuery,
  onNew,
  onSelect,
  onAction,
  inDialog = false,
}: {
  threads: readonly ConversationThread[];
  activeId: string | null;
  query: string;
  onQuery: (query: string) => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onAction: (
    mode: "rename" | "delete",
    id: string,
    trigger?: HTMLElement,
  ) => void;
  inDialog?: boolean;
}) {
  const id = useId();
  const visible = searchThreads(query, threads);
  return (
    <div className="conversation-history">
      <div className="workspace-panel-heading">
        <p className="eyebrow">YOUR CONVERSATIONS</p>
        <h2>Room for your ideas.</h2>
      </div>
      <Button variant="secondary" onClick={onNew} data-new-conversation>
        New conversation
        <Icon name="plus" />
      </Button>
      <Field
        id={`${id}-search`}
        type="search"
        label="Search conversations"
        placeholder="Find a conversation…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        autoFocus={inDialog}
      />
      <p className="history-count" role="status">
        {visible.length}{" "}
        {visible.length === 1 ? "conversation" : "conversations"} · Local
        preview
      </p>
      <ul className="conversation-list">
        {visible.map((thread) => (
          <li
            key={thread.id}
            className={activeId === thread.id ? "is-active" : ""}
          >
            <button
              type="button"
              className="conversation-select"
              aria-current={activeId === thread.id ? "true" : undefined}
              onClick={() => onSelect(thread.id)}
            >
              <strong>{thread.title}</strong>
              <small>{thread.updatedLabel}</small>
            </button>
            <Dropdown
              name={`Conversation options: ${thread.title}`}
              trigger={<Icon name="more" />}
            >
              <button
                role="menuitem"
                tabIndex={-1}
                onClick={(e) =>
                  onAction(
                    "rename",
                    thread.id,
                    e.currentTarget
                      .closest(".app-dropdown")
                      ?.querySelector<HTMLButtonElement>("button") || undefined,
                  )
                }
              >
                Rename conversation
              </button>
              <button
                role="menuitem"
                tabIndex={-1}
                onClick={(e) =>
                  onAction(
                    "delete",
                    thread.id,
                    e.currentTarget
                      .closest(".app-dropdown")
                      ?.querySelector<HTMLButtonElement>("button") || undefined,
                  )
                }
              >
                Delete conversation
              </button>
            </Dropdown>
          </li>
        ))}
      </ul>
      {!visible.length && (
        <div className="history-empty">
          <Icon name="workspace" />
          <h3>
            {threads.length
              ? "No matching conversations."
              : "A quiet beginning."}
          </h3>
          <p>
            {threads.length
              ? "Try another title, or clear your search."
              : "Create a conversation to explore a fixed sample. Nothing is saved."}
          </p>
          {query && (
            <Button variant="ghost" onClick={() => onQuery("")}>
              Clear conversation search
            </Button>
          )}
        </div>
      )}
      <p className="workspace-panel-footnote">
        All changes stay in memory. Refreshing clears local messages, names and
        selections. Switching conversations stops a pending local preview.
      </p>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SampleContent } from "./sample-content";
import type { ConversationThread, WorkspaceScenario } from "@/types/workspace";
export function MessageList({
  thread,
  busy,
  scenarios,
  onTemplate,
  onNew,
  onNotice,
}: {
  thread: ConversationThread | null;
  busy: boolean;
  scenarios: readonly WorkspaceScenario[];
  onTemplate: (scenario: WorkspaceScenario) => void;
  onNew: () => void;
  onNotice: (text: string) => void;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const previousThread = useRef<string | null>(null);
  const [scrollState, setScrollState] = useState({
    away: false,
    seen: 0,
    threadId: "",
  });
  const [manualCopy, setManualCopy] = useState<string | null>(null);
  const count = thread?.messages.length || 0;
  const newBelow =
    scrollState.away &&
    scrollState.threadId === thread?.id &&
    count > scrollState.seen;
  useEffect(() => {
    const el = scroll.current;
    if (!el) return;
    const changed = previousThread.current !== thread?.id;
    previousThread.current = thread?.id || null;
    if (changed || nearBottom.current) {
      el.scrollTop = el.scrollHeight;
      nearBottom.current = true;
    }
  }, [thread?.id, count, busy]);
  async function copy(id: string, text: string) {
    try {
      if (!navigator.clipboard) throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      onNotice("Message copied to clipboard.");
      setManualCopy(null);
    } catch {
      setManualCopy(id);
      onNotice(
        "Clipboard is unavailable. Use the selectable text field to copy manually.",
      );
    }
  }
  return (
    <div className="message-region">
      <div
        ref={scroll}
        className="workspace-messages"
        role="region"
        aria-label="Conversation messages"
        tabIndex={0}
        onScroll={(e) => {
          const el = e.currentTarget;
          nearBottom.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 100;
          setScrollState((previous) => ({
            threadId: thread?.id || "",
            away: !nearBottom.current,
            seen: nearBottom.current
              ? count
              : previous.threadId === thread?.id
                ? previous.seen
                : count,
          }));
        }}
      >
        {!thread ? (
          <div className="conversation-welcome">
            <span className="brand-mark" aria-hidden="true">
              K
            </span>
            <p className="eyebrow">A SPACE FOR YOUR NEXT IDEA</p>
            <h2>No conversations here yet.</h2>
            <p>
              Create a local conversation to explore fixed samples. This empty
              workspace contains no actual tenant data.
            </p>
            <Button onClick={onNew}>Start a new chat</Button>
          </div>
        ) : !thread.messages.length ? (
          <div className="conversation-welcome">
            <span className="brand-mark" aria-hidden="true">
              K
            </span>
            <p className="eyebrow">IDEAS START WITH A LITTLE SPACE</p>
            <h3>What would you like to explore?</h3>
            <p>
              Choose a prompt template. Sending shows a fixed scenario sample,
              not real AI output.
            </p>
            <div className="suggested-prompts">
              {scenarios.map((scenario) => (
                <Button
                  variant="ghost"
                  key={scenario.id}
                  onClick={() => onTemplate(scenario)}
                >
                  {scenario.name}
                  <Icon name="diagonal" />
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="message-stack">
            {thread.messages.map((message) => (
              <article
                className={`workspace-message message-${message.role}`}
                key={message.id}
                aria-label={`${message.role === "assistant" ? "Sample assistant" : "User"} message`}
              >
                <div className="message-meta">
                  <span className="message-avatar" aria-hidden="true">
                    {message.role === "assistant" ? "K" : "Y"}
                  </span>
                  <strong>
                    {message.role === "assistant"
                      ? "Sample assistant"
                      : message.source === "fixture"
                        ? "Sample user"
                        : "You"}
                  </strong>
                  <span className="message-source">
                    {message.role === "assistant"
                      ? "PREWRITTEN SAMPLE"
                      : message.label}
                  </span>
                </div>
                <div className="message-body">
                  {message.role === "assistant" ? (
                    <SampleContent content={message.content} />
                  ) : (
                    <p className="user-message-text">{message.content}</p>
                  )}
                  {!!message.attachments?.length && (
                    <ul className="message-file-names">
                      {message.attachments.map((a) => (
                        <li key={a.id}>
                          {a.name} · Metadata only, not processed
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="message-actions">
                  <small>
                    {message.role === "assistant"
                      ? "Fixed fixture · unrelated to your prompt or files"
                      : message.label}
                  </small>
                  <Button
                    variant="ghost"
                    aria-label={`Copy ${message.role === "assistant" ? "sample assistant" : "user"} message`}
                    onClick={() => copy(message.id, message.content)}
                  >
                    <Icon name="copy" />
                    Copy
                  </Button>
                </div>
                {manualCopy === message.id && (
                  <label className="manual-copy-field">
                    Copy message text manually
                    <textarea
                      readOnly
                      value={message.content}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </label>
                )}
              </article>
            ))}
          </div>
        )}
        {busy && (
          <div className="preview-busy" aria-label="Sending preview">
            <span className="preview-static-dots" aria-hidden="true">
              •••
            </span>
            <div>
              <strong>Preview simulator is active</strong>
              <p>
                A local timer is showing this state. No AI reasoning, file
                processing or tools.
              </p>
            </div>
          </div>
        )}
        {thread?.task?.status === "failed-preview" && (
          <div className="chat-state-note" role="status">
            <strong>Sample task failure</strong>
            <p>
              This is the selected failure preview, not an actual network or
              provider failure.
            </p>
          </div>
        )}
        {thread?.task?.status === "canceled-preview" && (
          <div className="chat-state-note">
            <strong>Preview stopped.</strong>
            <p>
              No AI request or external action occurred. Your local message is
              retained.
            </p>
          </div>
        )}
      </div>
      {newBelow && (
        <Button
          variant="secondary"
          className="jump-to-message"
          onClick={() => {
            if (scroll.current)
              scroll.current.scrollTop = scroll.current.scrollHeight;
            nearBottom.current = true;
            setScrollState({
              away: false,
              seen: count,
              threadId: thread?.id || "",
            });
          }}
        >
          New sample below
          <Icon name="down" />
        </Button>
      )}
    </div>
  );
}

"use client";
import { useId, useRef, useState } from "react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  PROMPT_LIMIT,
  ATTACHMENT_LIMIT,
  validatePrompt,
  validateAttachment,
} from "@/lib/workspace-state";
import type { ConversationThread, LocalAttachment } from "@/types/workspace";
export function PromptComposer({
  thread,
  busy,
  onDraft,
  onSend,
  onStop,
  onAttach,
  onRemove,
  inputRef,
}: {
  thread: ConversationThread | null;
  busy: boolean;
  onDraft: (text: string) => void;
  onSend: () => void;
  onStop: () => void;
  onAttach: (attachments: LocalAttachment[]) => void;
  onRemove: (id: string) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const serial = useRef(1);
  const [fileError, setFileError] = useState("");
  const count = thread?.draft.length || 0;
  function selectFiles(files: FileList | null) {
    if (!thread || !files) return;
    const accepted: LocalAttachment[] = [];
    const errors: string[] = [];
    for (const file of Array.from(files)) {
      const error = validateAttachment(file);
      if (error) {
        errors.push(error);
        continue;
      }
      if (thread.attachments.length + accepted.length >= ATTACHMENT_LIMIT) {
        errors.push("Select no more than three metadata previews.");
        continue;
      }
      if (
        [...thread.attachments, ...accepted].some(
          (a) => a.name === file.name && a.size === file.size,
        )
      ) {
        errors.push("That filename and size are already selected.");
        continue;
      }
      accepted.push({
        id: `attachment-${serial.current++}`,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
    if (accepted.length) onAttach(accepted);
    setFileError(errors.join(" "));
    if (fileInput.current) fileInput.current.value = "";
  }
  return (
    <form
      className="workspace-composer"
      aria-label="Demo prompt composer"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <label htmlFor={`${id}-prompt`}>
        Your prompt <span>Local preview only</span>
      </label>
      <textarea
        id={`${id}-prompt`}
        ref={inputRef}
        value={thread?.draft || ""}
        onChange={(e) => onDraft(e.target.value)}
        maxLength={PROMPT_LIMIT}
        disabled={!thread}
        readOnly={busy}
        placeholder={
          thread
            ? "Describe a task to preview the selected fixed sample…"
            : "Create a conversation to begin…"
        }
        aria-describedby={`${id}-hint ${id}-count`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            if (!busy && thread && !validatePrompt(thread.draft)) onSend();
          }
        }}
      />
      {!!thread?.attachments.length && (
        <ul
          className="local-attachments"
          aria-label="Selected attachment metadata"
        >
          {thread.attachments.map((a) => (
            <li key={a.id}>
              <Icon name="attachment" />
              <span title={a.name}>
                {a.name}
                <small>Metadata only · {Math.ceil(a.size / 1024)} KB</small>
              </span>
              <Button
                variant="ghost"
                aria-label={`Remove attachment ${a.name}`}
                disabled={busy}
                onClick={() => {
                  onRemove(a.id);
                  setFileError("");
                }}
              >
                <Icon name="close" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="composer-controls">
        <input
          ref={fileInput}
          id={`${id}-file`}
          type="file"
          accept=".txt,.md,.pdf"
          multiple
          className="sr-only"
          tabIndex={-1}
          disabled={
            !thread || busy || thread.attachments.length >= ATTACHMENT_LIMIT
          }
          onChange={(e) => selectFiles(e.target.files)}
          aria-label="Choose attachment metadata"
        />
        <Button
          variant="ghost"
          className="attachment-button"
          aria-label="Select local attachment metadata"
          disabled={
            !thread || busy || thread.attachments.length >= ATTACHMENT_LIMIT
          }
          onClick={() => fileInput.current?.click()}
        >
          <Icon name="attachment" />
          <span>Attach preview</span>
        </Button>
        <span
          id={`${id}-count`}
          className="composer-count"
          aria-live={count >= PROMPT_LIMIT - 100 ? "polite" : "off"}
        >
          {count.toLocaleString("en-US")} / 4,000
          {count === PROMPT_LIMIT ? " · Limit reached" : ""}
        </span>
        {busy ? (
          <Button
            variant="secondary"
            onClick={onStop}
            className="send-preview-button"
          >
            <Icon name="stop" />
            Stop preview
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!thread || !!validatePrompt(thread.draft)}
            className="send-preview-button"
          >
            <Icon name="send" />
            Send preview
          </Button>
        )}
      </div>
      {fileError && (
        <p
          className="workspace-file-error"
          role="alert"
          aria-label="Attachment notice"
        >
          {fileError}
        </p>
      )}
      <p id={`${id}-hint`} className="composer-disclosure">
        Enter previews · Shift+Enter adds a line. The simulator displays fixed
        text; it does not answer your prompt. Files are never read, uploaded or
        processed. TXT, MD, PDF only · 5 MB each · 3 max. Other types are
        unsupported.
      </p>
    </form>
  );
}

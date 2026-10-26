"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { createWorkspaceFixture, workspaceScenarios } from "@/demo/workspace";
import { workspaceReducer, validatePrompt } from "@/lib/workspace-state";
import type { ConversationThread } from "@/types/workspace";
export function useWorkspacePreview(empty: boolean) {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    empty,
    createWorkspaceFixture,
  );
  const [notice, setNotice] = useState(
    "Fixed samples only. Future AI service is not connected.",
  );
  const [outcome, setOutcome] = useState<"sample" | "failure">("sample");
  const sequence = useRef(1);
  const pending = useRef<{
    threadId: string;
    taskId: string;
    queue: ReturnType<typeof setTimeout>;
    finish: ReturnType<typeof setTimeout>;
  } | null>(null);
  useEffect(
    () => () => {
      if (pending.current) {
        clearTimeout(pending.current.queue);
        clearTimeout(pending.current.finish);
        pending.current = null;
      }
    },
    [],
  );
  function stop() {
    if (!pending.current) return;
    const task = pending.current;
    clearTimeout(task.queue);
    clearTimeout(task.finish);
    pending.current = null;
    dispatch({ type: "cancel", id: task.threadId, taskId: task.taskId });
    setNotice(
      "Canceled local preview. No AI request or external action occurred.",
    );
  }
  function start(
    thread: ConversationThread,
    retry = false,
    runOutcome: "sample" | "failure" = outcome,
  ) {
    if (pending.current) return;
    const prompt = retry
      ? thread.messages.filter((m) => m.role === "user").at(-1)?.content ||
        "Retry the selected fixed sample."
      : thread.draft;
    const error = validatePrompt(prompt);
    if (error) {
      setNotice(error);
      return;
    }
    const scenario = workspaceScenarios.find(
      (s) => s.id === thread.scenarioId,
    )!;
    const number = sequence.current++;
    const taskId = `local-task-${number}`;
    dispatch({
      type: "start",
      id: thread.id,
      task: {
        id: taskId,
        scenarioId: thread.scenarioId,
        status: "queued-preview",
        approval: "none",
      },
      prompt,
      userMessageId: `local-input-${number}`,
      retry,
    });
    setNotice("Queued local preview. No AI provider request is being sent.");
    const queue = setTimeout(() => {
      if (pending.current?.taskId !== taskId) return;
      dispatch({ type: "running", id: thread.id, taskId });
      setNotice(
        "Running-preview is a local display timer only. No model reasoning or tools.",
      );
    }, 300);
    const finish = setTimeout(() => {
      if (pending.current?.taskId !== taskId) return;
      pending.current = null;
      dispatch({
        type: "finish",
        id: thread.id,
        taskId,
        outcome:
          runOutcome === "failure" ? "failed-preview" : "complete-preview",
        sample: scenario.output.content,
        assistantId: `sample-output-${number}`,
        requiresApproval: scenario.approval,
      });
      setNotice(
        runOutcome === "failure"
          ? "Sample failure preview selected. No real service failed."
          : "Sample result ready. This fixed text was not generated from your prompt or files.",
      );
    }, 1600);
    pending.current = { threadId: thread.id, taskId, queue, finish };
  }
  function reset() {
    stop();
    dispatch({ type: "reset", state: createWorkspaceFixture(empty) });
    setOutcome("sample");
    setNotice("Workspace preview reset locally. No server action occurred.");
  }
  return {
    state,
    dispatch,
    notice,
    setNotice,
    outcome,
    setOutcome,
    start,
    stop,
    reset,
  };
}

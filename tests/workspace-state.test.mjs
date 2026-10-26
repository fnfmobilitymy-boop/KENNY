import test from "node:test";
import assert from "node:assert/strict";
import {
  workspaceReducer,
  validatePrompt,
  validateAttachment,
  validateThreadTitle,
  searchThreads,
  FILE_SIZE_LIMIT,
} from "../src/lib/workspace-state.ts";
import {
  createWorkspaceFixture,
  workspaceScenarios,
} from "../src/demo/workspace.ts";
const task = {
  id: "local-test-task",
  scenarioId: "marketing",
  status: "queued-preview",
  approval: "none",
};
function fresh() {
  return workspaceReducer(createWorkspaceFixture(true), { type: "new" });
}
function started() {
  const s = fresh();
  return workspaceReducer(s, {
    type: "start",
    id: s.activeId,
    task,
    prompt: "A local input",
    userMessageId: "input-1",
  });
}
test("new/select/rename/delete are immutable, bounded and preserve other thread drafts", () => {
  const initial = createWorkspaceFixture();
  const s = workspaceReducer(initial, { type: "new" });
  assert.equal(initial.threads.length, 3);
  assert.equal(s.threads.length, 4);
  assert.notEqual(s.activeId, initial.activeId);
  const renamed = workspaceReducer(s, {
    type: "rename",
    id: s.activeId,
    title: "  Local title  ",
  });
  assert.equal(renamed.threads[0].title, "Local title");
  assert.equal(
    workspaceReducer(renamed, { type: "rename", id: s.activeId, title: " " }),
    renamed,
  );
  const drafted = workspaceReducer(renamed, {
    type: "draft",
    id: s.activeId,
    value: "Keep this draft",
  });
  const switched = workspaceReducer(drafted, {
    type: "select",
    id: "sample-website",
  });
  assert.equal(switched.threads[0].draft, "Keep this draft");
  assert.equal(
    workspaceReducer(switched, { type: "select", id: "unknown" }),
    switched,
  );
  const deleted = workspaceReducer(switched, {
    type: "delete",
    id: "sample-website",
  });
  assert.notEqual(deleted.activeId, "sample-website");
  assert.equal(validateThreadTitle("x".repeat(81)) !== null, true);
});
test("deleting the last thread yields an honest empty workspace", () => {
  const s = fresh();
  const result = workspaceReducer(s, { type: "delete", id: s.activeId });
  assert.equal(result.activeId, null);
  assert.deepEqual(result.threads, []);
});
test("prompt and attachment validation enforces limits without reading contents", () => {
  assert.ok(validatePrompt("   "));
  assert.ok(validatePrompt("a".repeat(4001)));
  assert.equal(validatePrompt("a".repeat(4000)), null);
  assert.ok(validateAttachment({ name: "sample.exe", size: 1 }));
  assert.ok(validateAttachment({ name: "sample.png", size: 1 }));
  assert.ok(
    validateAttachment({ name: "sample.pdf", size: FILE_SIZE_LIMIT + 1 }),
  );
  assert.equal(
    validateAttachment({ name: "sample.MD", size: FILE_SIZE_LIMIT }),
    null,
  );
});
test("thread search matches titles and has deterministic zero results", () => {
  assert.equal(
    searchThreads("  WEBSITE ", createWorkspaceFixture().threads).length,
    1,
  );
  assert.equal(
    searchThreads("absent-title", createWorkspaceFixture().threads).length,
    0,
  );
});
test("duplicate starts and duplicate finishes cannot append repeated messages", () => {
  const s = started();
  const duplicate = workspaceReducer(s, {
    type: "start",
    id: s.activeId,
    task: { ...task, id: "another" },
    prompt: "duplicate",
    userMessageId: "duplicate",
  });
  assert.equal(duplicate.threads[0].messages.length, 1);
  const finish = {
    type: "finish",
    id: s.activeId,
    taskId: task.id,
    outcome: "complete-preview",
    sample: workspaceScenarios[0].output.content,
    assistantId: "sample-1",
    requiresApproval: true,
  };
  const complete = workspaceReducer(s, finish);
  assert.equal(complete.threads[0].messages.length, 2);
  assert.equal(complete.threads[0].task.approval, "pending");
  assert.equal(
    workspaceReducer(complete, finish).threads[0].messages.length,
    2,
  );
});
test("cancel/stale completion and failure never fabricate assistant output", () => {
  const s = started();
  const canceled = workspaceReducer(s, {
    type: "cancel",
    id: s.activeId,
    taskId: task.id,
  });
  const stale = workspaceReducer(canceled, {
    type: "finish",
    id: s.activeId,
    taskId: task.id,
    outcome: "complete-preview",
    sample: "stale",
    assistantId: "stale",
    requiresApproval: true,
  });
  assert.equal(stale.threads[0].messages.length, 1);
  assert.equal(stale.threads[0].task.status, "canceled-preview");
  const failed = workspaceReducer(s, {
    type: "finish",
    id: s.activeId,
    taskId: task.id,
    outcome: "failed-preview",
    sample: "unused",
    assistantId: "unused",
    requiresApproval: true,
  });
  assert.equal(failed.threads[0].messages.length, 1);
  assert.equal(failed.threads[0].task.approval, "none");
});
test("approval is allowed only for a completed pending local preview", () => {
  const s = started();
  assert.equal(
    workspaceReducer(s, {
      type: "approve",
      id: s.activeId,
      decision: "approved-preview",
    }).threads[0].task.approval,
    "none",
  );
  const complete = workspaceReducer(s, {
    type: "finish",
    id: s.activeId,
    taskId: task.id,
    outcome: "complete-preview",
    sample: "SAMPLE",
    assistantId: "sample",
    requiresApproval: true,
  });
  const approved = workspaceReducer(complete, {
    type: "approve",
    id: s.activeId,
    decision: "approved-preview",
  });
  assert.equal(approved.threads[0].task.approval, "approved-preview");
  assert.equal(
    workspaceReducer(approved, {
      type: "approve",
      id: s.activeId,
      decision: "rejected-preview",
    }).threads[0].task.approval,
    "approved-preview",
  );
});
test("metadata attachment removal is local and reset factory returns independent state", () => {
  const s = fresh();
  const attached = workspaceReducer(s, {
    type: "attach",
    id: s.activeId,
    attachments: [{ id: "a", name: "note.txt", size: 5, type: "text/plain" }],
  });
  assert.equal(attached.threads[0].attachments.length, 1);
  assert.equal(
    workspaceReducer(attached, {
      type: "remove-attachment",
      id: s.activeId,
      attachmentId: "a",
    }).threads[0].attachments.length,
    0,
  );
  const first = createWorkspaceFixture();
  first.threads[0].draft = "private local draft";
  assert.equal(createWorkspaceFixture().threads[0].draft, "");
  assert.equal(workspaceScenarios.length, 6);
  for (const scenario of workspaceScenarios)
    assert.ok(scenario.output.content.includes("SAMPLE"));
});

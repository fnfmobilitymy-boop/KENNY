import test from "node:test";
import assert from "node:assert/strict";
import {
  filterLeads,
  moveLead,
  documentTotal,
  validateWorkflow,
  planningEstimate,
  appointmentConflicts,
  validateLocalName,
} from "../src/lib/module-state.ts";
test("CRM filters and sorts without mutating fixtures; status changes are bounded", () => {
  const leads = [
    {
      id: "a",
      name: "Zeta sample",
      detail: "Fictional agency",
      stage: "New",
      channel: "Demo",
    },
    {
      id: "b",
      name: "Alpha sample",
      detail: "Fictional shop",
      stage: "Qualified",
      channel: "Demo",
    },
  ];
  assert.deepEqual(
    filterLeads(leads, "sample", "All", "asc").map((x) => x.id),
    ["b", "a"],
  );
  assert.equal(filterLeads(leads, " AGENCY ", "New", "desc")[0].id, "a");
  assert.deepEqual(filterLeads(leads, "none", "All", "asc"), []);
  assert.equal(moveLead(leads, "a", "Proposal")[0].stage, "Proposal");
  assert.equal(leads[0].stage, "New");
  assert.equal(moveLead(leads, "a", "Invalid")[0].stage, "New");
});
test("document and illustrative budget calculations reject nonfinite or invalid values", () => {
  assert.equal(documentTotal(3, 10.25), 30.75);
  assert.equal(documentTotal(-1, 10), null);
  assert.equal(documentTotal(1, NaN), null);
  assert.equal(planningEstimate(12, 7), 84);
  for (const pair of [
    [-1, 7],
    [5, 0],
    [5, 91],
    [Infinity, 5],
    [10001, 2],
  ])
    assert.equal(planningEstimate(...pair), null);
});
test("workflow preview requires configured nodes and human review", () => {
  assert.equal(
    validateWorkflow({ trigger: "", action: "", review: false }).length,
    3,
  );
  assert.deepEqual(
    validateWorkflow({
      trigger: "Local form example",
      action: "Create review draft",
      review: true,
    }),
    [],
  );
});
test("booking interval overlap includes containing ranges but not touching endpoints", () => {
  const rows = [
    {
      id: "a",
      name: "Sample",
      detail: "Fictional",
      day: "2026-11-02",
      time: "10:00",
      duration: 30,
    },
  ];
  assert.equal(appointmentConflicts(rows, "2026-11-02", "10:15", 30), true);
  assert.equal(appointmentConflicts(rows, "2026-11-02", "09:45", 60), true);
  assert.equal(appointmentConflicts(rows, "2026-11-02", "10:30", 30), false);
  assert.equal(appointmentConflicts(rows, "2026-11-03", "10:00", 30), false);
});
test("local demo names trim and bound input", () => {
  assert.ok(validateLocalName(" "));
  assert.ok(validateLocalName("x"));
  assert.ok(validateLocalName("a".repeat(81)));
  assert.equal(validateLocalName("  Sample concept  "), null);
});

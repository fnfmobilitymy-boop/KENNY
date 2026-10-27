import type {
  SampleLead,
  LeadStage,
  WorkflowDraft,
  SampleAppointment,
} from "../types/modules";
export function filterLeads(
  leads: readonly SampleLead[],
  query: string,
  stage: string,
  sort: "asc" | "desc",
) {
  const term = query.trim().toLowerCase();
  return leads
    .filter(
      (l) =>
        (stage === "All" || l.stage === stage) &&
        `${l.name} ${l.detail}`.toLowerCase().includes(term),
    )
    .toSorted((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
}
export function moveLead(
  leads: readonly SampleLead[],
  id: string,
  stage: LeadStage,
): SampleLead[] {
  if (!["New", "Qualified", "Proposal"].includes(stage)) return [...leads];
  return leads.map((l) => (l.id === id ? { ...l, stage } : l));
}
export function documentTotal(quantity: number, unitAmount: number) {
  return Number.isFinite(quantity) &&
    Number.isFinite(unitAmount) &&
    quantity >= 0 &&
    quantity <= 9999 &&
    unitAmount <= 999999 &&
    unitAmount >= 0
    ? Math.round(quantity * unitAmount * 100) / 100
    : null;
}
export function validateWorkflow(draft: WorkflowDraft) {
  const errors: string[] = [];
  if (!draft.trigger) errors.push("Choose a trigger.");
  if (!draft.action) errors.push("Choose an action.");
  if (!draft.review)
    errors.push("Include the human review step in this preview.");
  return errors;
}
export function planningEstimate(daily: number, days: number) {
  return Number.isFinite(daily) &&
    Number.isFinite(days) &&
    daily >= 0 &&
    daily <= 10000 &&
    days >= 1 &&
    days <= 90
    ? Math.round(daily * days)
    : null;
}
export function appointmentConflicts(
  appointments: readonly SampleAppointment[],
  day: string,
  time: string,
  duration: number,
) {
  const minutes = (value: string) => {
    const [h, m] = value.split(":").map(Number);
    return h * 60 + m;
  };
  const start = minutes(time);
  return appointments.some(
    (a) =>
      a.day === day &&
      start < minutes(a.time) + a.duration &&
      start + duration > minutes(a.time),
  );
}
export function validateLocalName(name: string) {
  return name.trim().length >= 2 && name.trim().length <= 80
    ? null
    : "Use 2–80 characters for this local demo name.";
}

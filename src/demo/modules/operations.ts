import type {
  SampleAppointment,
  SampleProduct,
  SampleItem,
  SampleMetric,
} from "@/types/modules";
export const sampleAppointments: readonly SampleAppointment[] = [
  {
    id: "appt-1",
    name: "Cedar sample discovery",
    detail: "Fictional appointment · No real booking",
    day: "2026-11-02",
    time: "10:00",
    duration: 30,
  },
  {
    id: "appt-2",
    name: "Harbor sample review",
    detail: "Fictional appointment · No real booking",
    day: "2026-11-04",
    time: "14:00",
    duration: 45,
  },
];
export const bookingDays = [
  { id: "2026-11-02", label: "Mon 2" },
  { id: "2026-11-03", label: "Tue 3" },
  { id: "2026-11-04", label: "Wed 4" },
  { id: "2026-11-05", label: "Thu 5" },
  { id: "2026-11-06", label: "Fri 6" },
  { id: "2026-11-07", label: "Sat 7" },
  { id: "2026-11-08", label: "Sun 8" },
] as const;
export const sampleProducts: readonly SampleProduct[] = [
  {
    id: "product-1",
    name: "Orbit notebook",
    detail: "Fictional stationery concept",
    stock: 12,
    category: "Stationery",
  },
  {
    id: "product-2",
    name: "Forma desk object",
    detail: "Fictional creative object",
    stock: 8,
    category: "Objects",
  },
  {
    id: "product-3",
    name: "Quiet print",
    detail: "Fictional art print",
    stock: 5,
    category: "Prints",
  },
];
export const sampleOrders = [
  {
    id: "DEMO-001",
    product: "Orbit notebook",
    quantity: 1,
    status: "Unfulfilled sample",
  },
  {
    id: "DEMO-002",
    product: "Quiet print",
    quantity: 2,
    status: "Review sample",
  },
] as const;
export const workflowSamples: readonly SampleItem[] = [
  {
    id: "flow-1",
    name: "Inquiry to human review",
    detail: "Local workflow draft · Never running",
  },
  {
    id: "flow-2",
    name: "Content review reminder",
    detail: "Local workflow draft · Never running",
  },
];
export const executionSample = [
  "SIMULATED · Fixture trigger selected; no actual event received.",
  "SIMULATED · Human review node inspected; no person notified.",
  "SIMULATED · Draft action illustrated; no record written or message sent.",
] as const;
export const analyticsMetrics: readonly SampleMetric[] = [
  { label: "Sample sessions", values: [32, 48, 40, 64, 52, 72, 60] },
  { label: "Sample draft views", values: [18, 24, 20, 36, 30, 40, 32] },
  { label: "Sample review events", values: [4, 8, 5, 10, 7, 12, 8] },
];
export const analyticsSources = [
  "Website analytics",
  "Advertising accounts",
  "CRM data",
] as const;

export const bookingMonthDays = Array.from({ length: 30 }, (_, i) => ({
  id: `2026-11-${String(i + 1).padStart(2, "0")}`,
  label: `Nov ${i + 1}`,
}));

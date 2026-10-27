import type { SampleItem, SampleLead } from "@/types/modules";
export const campaigns: readonly SampleItem[] = [
  {
    id: "campaign-1",
    name: "A considered introduction",
    detail: "Fictional campaign · Draft",
  },
  {
    id: "campaign-2",
    name: "The making-of series",
    detail: "Fictional campaign · Outline",
  },
];
export const calendarDays = [
  "Mon 2",
  "Tue 3",
  "Wed 4",
  "Thu 5",
  "Fri 6",
  "Sat 7",
  "Sun 8",
] as const;
export const marketingDrafts = [
  { id: "post-1", name: "Our approach", detail: "Mon 2 · Draft only" },
  { id: "post-2", name: "Behind the practice", detail: "Wed 4 · Draft only" },
  { id: "post-3", name: "An invitation", detail: "Fri 6 · Draft only" },
] as const;
export const keywordSamples = [
  {
    term: "thoughtful brand design",
    intent: "Informational",
    volume: "240",
    difficulty: "Moderate",
  },
  {
    term: "creative studio brief",
    intent: "Research",
    volume: "120",
    difficulty: "Low",
  },
  {
    term: "small business identity",
    intent: "Commercial",
    volume: "360",
    difficulty: "High",
  },
] as const;
export const salesInbox = [
  {
    id: "inbox-1",
    name: "Cedar sample inquiry",
    detail: "Fictional conversation · Needs human review",
    message: "Could you share a sample overview of your creative process?",
  },
  {
    id: "inbox-2",
    name: "Harbor sample inquiry",
    detail: "Fictional conversation · Draft response",
    message:
      "What information should a fictional client include in an initial brief?",
  },
] as const;
export const responseTemplates = [
  {
    id: "overview",
    name: "Process overview",
    text: "SAMPLE — Thank you for your interest. Our illustrative process includes discovery, direction and a human review. [Team member] will confirm real scope separately.",
  },
  {
    id: "brief",
    name: "Brief request",
    text: "SAMPLE — Please describe your goals, audience and preferred timing. Do not share sensitive information in this demo. A human would review a real request before replying.",
  },
] as const;
export const sampleLeads: readonly SampleLead[] = [
  {
    id: "lead-1",
    name: "Cedar Example",
    detail: "Fictional creative practice",
    stage: "New",
    channel: "Sample web form",
  },
  {
    id: "lead-2",
    name: "Harbor Example",
    detail: "Fictional retail concept",
    stage: "Qualified",
    channel: "Sample referral",
  },
  {
    id: "lead-3",
    name: "Willow Example",
    detail: "Fictional education concept",
    stage: "Proposal",
    channel: "Sample event",
  },
  {
    id: "lead-4",
    name: "Amber Example",
    detail: "Fictional agency concept",
    stage: "New",
    channel: "Sample web form",
  },
];
export const leadStages = ["New", "Qualified", "Proposal"] as const;
export const sampleFollowups = [
  "Sample inquiry recorded in fixture",
  "Human review suggested in fixture",
  "Follow-up draft available, not sent",
] as const;

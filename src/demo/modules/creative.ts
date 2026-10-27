import type { DocumentDraft, SampleItem } from "@/types/modules";
export const websiteProjects: readonly SampleItem[] = [
  {
    id: "site-1",
    name: "Forma — creative practice",
    detail: "Fixed concept · 3 pages",
  },
  {
    id: "site-2",
    name: "Moss — thoughtful objects",
    detail: "Fixed concept · 2 pages",
  },
];
export const websitePages = ["Home", "About", "Contact"] as const;
export const websiteVersions = [
  "V3 · Current sample · Editorial spacing",
  "V2 · Fixed history · Violet palette",
  "V1 · Fixed history · First composition",
] as const;
export const imageAssets = [
  {
    id: "art-1",
    name: "Orbit study",
    detail: "Hand-authored vector sample",
    style: "Spatial",
    palette: "violet",
  },
  {
    id: "art-2",
    name: "Quiet architecture",
    detail: "Hand-authored vector sample",
    style: "Editorial",
    palette: "blue",
  },
  {
    id: "art-3",
    name: "Soft geometry",
    detail: "Hand-authored vector sample",
    style: "Minimal",
    palette: "peach",
  },
  {
    id: "art-4",
    name: "Evening form",
    detail: "Hand-authored vector sample",
    style: "Spatial",
    palette: "blue",
  },
] as const;
export const videoProjects: readonly SampleItem[] = [
  {
    id: "film-1",
    name: "A quieter kind of launch",
    detail: "Fixed storyboard · 18 seconds",
  },
  {
    id: "film-2",
    name: "Objects in motion",
    detail: "Fixed storyboard · 12 seconds",
  },
];
export const videoClips = [
  { id: "clip-1", name: "Opening shape", detail: "0–6s · Fixed storyboard" },
  { id: "clip-2", name: "Product moment", detail: "6–12s · Fixed storyboard" },
  { id: "clip-3", name: "Closing title", detail: "12–18s · Fixed storyboard" },
] as const;
export const documentTemplates = [
  "Quotation",
  "Invoice",
  "Proposal",
  "Letter",
  "Report",
] as const;
export const documentSamples: readonly SampleItem[] = [
  {
    id: "doc-1",
    name: "A considered proposal",
    detail: "Fictional design brief · Sample",
  },
  {
    id: "doc-2",
    name: "Project quotation",
    detail: "Illustrative line items · Sample",
  },
];

export const sampleDocumentDraft: DocumentDraft = {
  recipient: "Fictional client",
  subject: "Creative direction exploration",
  quantity: 1,
  unitAmount: 100,
  notes: "Sample scope: discovery, a concept review and a written direction.",
};
export const videoCaptionSample: string = "A quieter kind of launch";
export const websiteSampleCopy = {
  Home: {
    heading: "Make space for the meaningful.",
    body: "A fictional creative practice shaping identities, digital experiences and everyday objects.",
  },
  About: {
    heading: "A practice built with intention.",
    body: "A fictional creative practice shaping identities, digital experiences and everyday objects.",
  },
  Contact: {
    heading: "Start a thoughtful conversation.",
    body: "Contact form placeholder — no form submission or external link.",
  },
} as const;

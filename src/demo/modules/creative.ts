import type { SampleItem } from "@/types/modules";
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

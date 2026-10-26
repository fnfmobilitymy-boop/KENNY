import type { WorkspaceScenario, WorkspaceState } from "@/types/workspace";
/** Fixed M6 SAMPLES. None of these texts are generated from prompts, files or actual business data. */
export const workspaceScenarios: readonly WorkspaceScenario[] = [
  {
    id: "marketing",
    name: "Business marketing plan",
    prompt: "Explore a simple marketing plan for a fictional creative studio.",
    taskType: "Marketing direction sample",
    plannedTool: "Marketing Studio (planned)",
    approval: true,
    output: {
      title: "A considered launch direction",
      content:
        "## SAMPLE — Marketing plan\nStart with one clear audience and one useful promise.\n\n- Define the problem your fictional studio helps solve.\n- Share one educational story and one example of your approach.\n- Review the message with a human before publishing.\n\n**Review point:** choose a direction before creating a campaign.\n\nThis is prewritten sample text, independent of your prompt and attachments.",
      cards: [
        { label: "Focus", value: "One audience, one clear promise" },
        { label: "Human review", value: "Required before any real publishing" },
      ],
      artifactName: "sample-marketing-plan.md",
    },
  },
  {
    id: "website",
    name: "Website requirements brief",
    prompt: "Outline website requirements for a fictional small business.",
    taskType: "Website brief sample",
    plannedTool: "Website Builder (planned)",
    approval: true,
    output: {
      title: "A clear brief before a first page",
      content:
        "## SAMPLE — Website requirements\n**Purpose:** help a visitor understand the fictional business and its next step.\n\n- Home: explain the idea clearly.\n- Services: describe the approach without invented claims.\n- Contact: define a future contact workflow.\n\n```text\nHome → Services → Contact\n```\n\nNo website or real files were created. This fixed outline does not interpret your prompt.",
      cards: [
        { label: "Structure", value: "Three illustrative pages" },
        { label: "Publishing", value: "Not connected" },
      ],
      artifactName: "sample-website-brief.md",
    },
  },
  {
    id: "follow-up",
    name: "Client follow-up message",
    prompt: "Show a fictional, human-reviewed follow-up message example.",
    taskType: "Outreach sample",
    plannedTool: "Sales Agent (planned)",
    approval: true,
    output: {
      title: "A respectful next step",
      content:
        "## SAMPLE — Follow-up draft\nHello [sample contact],\n\nThank you for considering the idea. If useful, we can outline the next steps for your review. There is no urgency to decide.\n\nBest wishes,\n[Sample sender]\n\n**Nothing has been sent.** Placeholder names are not actual client data. This fixed sample is not personalized.",
      cards: [
        { label: "Recipient", value: "Placeholder only" },
        { label: "Delivery", value: "No messages sent" },
      ],
      artifactName: "sample-follow-up.txt",
    },
  },
  {
    id: "seo",
    name: "SEO content outline",
    prompt: "Preview an educational content outline for a fictional business.",
    taskType: "Content outline sample",
    plannedTool: "SEO & Ads (planned)",
    approval: false,
    output: {
      title: "Helpful content starts with a question",
      content:
        "## SAMPLE — Content outline\n**Working title:** How to choose a thoughtful creative partner\n\n- Explain the reader’s decision.\n- List questions to ask before a project.\n- Describe how to compare approaches.\n- End with a useful checklist.\n\nNo keyword research, ranking checks or advertising actions took place.",
      cards: [
        { label: "Research", value: "Not connected" },
        { label: "Ad spend", value: "No ads created or purchased" },
      ],
      artifactName: "sample-content-outline.md",
    },
  },
  {
    id: "translation",
    name: "Translation request",
    prompt:
      "Show the fixed translation demonstration, without translating my input.",
    taskType: "Translation sample",
    plannedTool: "Future language service (not connected)",
    approval: false,
    output: {
      title: "A small language example",
      content:
        "## SAMPLE — Fixed translation\n**Example source:** Welcome to the studio.\n\n**Example Malay:** Selamat datang ke studio.\n\nThis is a fixed illustrative pair. Your input is not translated, evaluated or sent to a provider.",
      cards: [
        { label: "Source", value: "Prewritten example sentence" },
        { label: "Provider", value: "Not connected" },
      ],
      artifactName: "sample-translation.txt",
    },
  },
  {
    id: "summary",
    name: "Document summary preview",
    prompt:
      "Preview a fixed document-summary format without reading any selected file.",
    taskType: "Summary layout sample",
    plannedTool: "Documents (planned)",
    approval: false,
    output: {
      title: "A structured summary format",
      content:
        "## SAMPLE — Summary template\n**Context:** a fictional planning note, not an attached document.\n\n- Main idea: agree on a clear direction.\n- Decision: review a draft together.\n- Next step: choose what to refine.\n\nNo attachment was read, uploaded or summarized. The sample is unrelated to selected files.",
      cards: [
        { label: "Document source", value: "Fictional fixture only" },
        { label: "File processing", value: "Not available" },
      ],
      artifactName: "sample-summary.md",
    },
  },
];
export const previewStepVariants = [
  {
    status: "pending",
    label: "Pending",
    description: "No local preview has started.",
  },
  {
    status: "queued-preview",
    label: "Queued-preview",
    description: "A local display timer is queued; no provider request.",
  },
  {
    status: "running-preview",
    label: "Running-preview",
    description: "A local timer is displaying a busy state; no tools run.",
  },
  {
    status: "complete-preview",
    label: "Complete-preview",
    description: "A fixed sample has been displayed.",
  },
  {
    status: "failed-preview",
    label: "Failed-preview",
    description: "A selected failure demonstration, not a service outage.",
  },
  {
    status: "canceled-preview",
    label: "Canceled-preview",
    description: "The local display timer was stopped.",
  },
] as const;
export function createWorkspaceFixture(empty = false): WorkspaceState {
  if (empty) return { threads: [], activeId: null, nextId: 1 };
  const sample = workspaceScenarios[0];
  return {
    nextId: 4,
    activeId: "sample-marketing",
    threads: [
      {
        id: "sample-marketing",
        title: "A thoughtful marketing direction",
        updatedLabel: "Sample conversation · example 01",
        scenarioId: "marketing",
        draft: "",
        attachments: [],
        messages: [
          {
            id: "fixture-user-1",
            role: "user",
            source: "fixture",
            label: "Example prompt · fixture",
            content: sample.prompt,
          },
          {
            id: "fixture-assistant-1",
            role: "assistant",
            source: "sample-output",
            label: "Prewritten sample · fixture",
            content: sample.output.content,
          },
        ],
        task: {
          id: "sample-task-marketing",
          scenarioId: "marketing",
          status: "complete-preview",
          approval: "pending",
        },
      },
      {
        id: "sample-website",
        title: "Website brief, before a first page",
        updatedLabel: "Sample conversation · example 02",
        scenarioId: "website",
        draft: "",
        attachments: [],
        messages: [
          {
            id: "fixture-user-2",
            role: "user",
            source: "fixture",
            label: "Example prompt · fixture",
            content: workspaceScenarios[1].prompt,
          },
          {
            id: "fixture-assistant-2",
            role: "assistant",
            source: "sample-output",
            label: "Prewritten sample · fixture",
            content: workspaceScenarios[1].output.content,
          },
        ],
        task: {
          id: "sample-task-website",
          scenarioId: "website",
          status: "complete-preview",
          approval: "pending",
        },
      },
      {
        id: "sample-empty",
        title: "Room for a new outline",
        updatedLabel: "Empty conversation · example 03",
        scenarioId: "seo",
        draft: "",
        attachments: [],
        messages: [],
        task: null,
      },
    ],
  };
}

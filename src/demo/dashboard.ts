import type {
  PlannedModule,
  DemoWorkspace,
  DemoTask,
  DemoAgent,
  DemoApproval,
  DemoProject,
  DemoActivity,
} from "@/types/dashboard";
/** M5 DEMO FIXTURES ONLY. No live metrics, customer records, revenue or agent execution. */
export const plannedModules = [
  {
    slug: "workspace",
    name: "AI Workspace",
    group: "OVERVIEW",
    icon: "workspace",
    description:
      "A planned space to think with context and explore ideas together.",
    capabilities: [
      "Conversations and model selection",
      "Agent collaboration concepts",
      "Human-reviewed results",
    ],
  },
  {
    slug: "analytics",
    name: "Analytics",
    group: "OVERVIEW",
    icon: "insights",
    description:
      "A clearer view of information from future connected services.",
    capabilities: [
      "Business reporting concepts",
      "Workspace activity views",
      "Source-aware summaries",
    ],
  },
  {
    slug: "website-builder",
    name: "AI Website Builder",
    group: "CREATE",
    icon: "website",
    description:
      "Bring your website direction into focus, one brief at a time.",
    capabilities: [
      "Brief-to-page concepts",
      "Side-by-side editing preview",
      "Publishing integration planned",
    ],
  },
  {
    slug: "image-studio",
    name: "AI Image Studio",
    group: "CREATE",
    icon: "image",
    description: "Explore a visual language for your next campaign or product.",
    capabilities: [
      "Image direction and prompts",
      "Brand asset organization",
      "Generation integration planned",
    ],
  },
  {
    slug: "video-studio",
    name: "AI Video Studio",
    group: "CREATE",
    icon: "video",
    description: "Shape the stories your business wants to tell.",
    capabilities: [
      "Video concept planning",
      "Timeline and caption concepts",
      "Export integration planned",
    ],
  },
  {
    slug: "documents",
    name: "AI Documents",
    group: "CREATE",
    icon: "knowledge",
    description: "A planned home for purposeful business documents.",
    capabilities: [
      "Drafting and refinement",
      "Document templates",
      "Review and export concepts",
    ],
  },
  {
    slug: "marketing",
    name: "AI Marketing Studio",
    group: "GROW",
    icon: "marketing",
    description: "Connect your campaign thinking with your brand context.",
    capabilities: [
      "Campaign concepts",
      "Content planning",
      "Channel strategy briefs",
    ],
  },
  {
    slug: "seo-ads",
    name: "AI SEO & Ads",
    group: "GROW",
    icon: "search",
    description: "Plan how your business could be discovered.",
    capabilities: [
      "Search content briefs",
      "Keyword research integration planned",
      "Ad concepts, without live spend",
    ],
  },
  {
    slug: "sales",
    name: "AI Sales Agent",
    group: "GROW",
    icon: "sales",
    description: "Explore a considered approach to customer follow-up.",
    capabilities: [
      "Human-reviewed outreach drafts",
      "Sales workflow concepts",
      "No autonomous messages",
    ],
  },
  {
    slug: "crm",
    name: "AI CRM",
    group: "GROW",
    icon: "contacts",
    description: "A planned place to keep customer context connected.",
    capabilities: [
      "Contact organization concepts",
      "Follow-up planning",
      "Relationship activity views",
    ],
  },
  {
    slug: "booking",
    name: "AI Booking",
    group: "MANAGE",
    icon: "calendar",
    description: "Bring appointment planning into your business workflow.",
    capabilities: [
      "Scheduling concepts",
      "Availability interfaces",
      "Calendar integration planned",
    ],
  },
  {
    slug: "ecommerce",
    name: "AI E-Commerce",
    group: "MANAGE",
    icon: "commerce",
    description: "Explore a connected workspace for online commerce.",
    capabilities: [
      "Catalog management concepts",
      "Product content planning",
      "Store integration planned",
    ],
  },
  {
    slug: "automations",
    name: "AI Automations",
    group: "MANAGE",
    icon: "workflow",
    description: "Design repeatable processes with thoughtful review points.",
    capabilities: [
      "Workflow mapping",
      "Agent handoff concepts",
      "Human approval checkpoints",
    ],
  },
  {
    slug: "billing",
    name: "Billing",
    group: "ACCOUNT",
    icon: "billing",
    description: "A planned view of subscription information and usage.",
    capabilities: [
      "Plan overview concepts",
      "Usage information",
      "No payments or subscriptions connected",
    ],
  },
  {
    slug: "settings",
    name: "Settings",
    group: "ACCOUNT",
    icon: "settings",
    description: "Shape the preferences of your future workspace.",
    capabilities: [
      "Profile and workspace settings concepts",
      "Team preference interfaces",
      "Permissions require backend authorization",
    ],
  },
] as const satisfies readonly PlannedModule[];
export const demoWorkspaces: readonly DemoWorkspace[] = [
  {
    id: "kenny-demo",
    name: "Kenny Studio",
    initials: "KS",
    description: "Illustrative pilot workspace",
    empty: false,
  },
  {
    id: "blank-demo",
    name: "Blank workspace",
    initials: "BW",
    description: "Empty-state preview",
    empty: true,
  },
];
export const demoTasks: readonly DemoTask[] = [
  {
    id: "task-brief",
    title: "Shape the launch brief",
    module: "marketing",
    status: "Needs review",
  },
  {
    id: "task-site",
    title: "Explore the website direction",
    module: "website-builder",
    status: "Draft",
  },
  {
    id: "task-notes",
    title: "Outline the brand story",
    module: "documents",
    status: "Concept",
  },
];
export const demoAgents: readonly DemoAgent[] = [
  {
    id: "planner",
    name: "Planner",
    role: "Strategy & context",
    description:
      "A sample profile for planning work with your business context.",
  },
  {
    id: "creator",
    name: "Creator",
    role: "Ideas & content",
    description:
      "A sample profile for creative exploration and draft preparation.",
  },
  {
    id: "coordinator",
    name: "Coordinator",
    role: "Process & handoffs",
    description:
      "A sample profile for organizing work and human review points.",
  },
];
export const demoApprovals: readonly DemoApproval[] = [
  {
    id: "approval-brief",
    title: "Campaign brief concept",
    description:
      "Sample review item: check that the proposed campaign direction is clear, useful and consistent with a future brand brief. No content has been generated or published.",
    module: "marketing",
  },
  {
    id: "approval-site",
    title: "Website outline concept",
    description:
      "Sample review item: consider the structure of a future home page and the information a visitor would need. There is no generated website or deployment attached.",
    module: "website-builder",
  },
];
export const demoProjects: readonly DemoProject[] = [
  {
    id: "project-brand",
    name: "Brand direction",
    type: "Creative concept",
    module: "image-studio",
  },
  {
    id: "project-site",
    name: "Website outline",
    type: "Website concept",
    module: "website-builder",
  },
  {
    id: "project-launch",
    name: "Launch story",
    type: "Campaign concept",
    module: "marketing",
  },
];
export const demoActivity: readonly DemoActivity[] = [
  {
    id: "activity-1",
    title: "A brief enters review",
    description: "An illustrative handoff from planning to human review.",
    label: "Sample event 01",
    icon: "knowledge",
  },
  {
    id: "activity-2",
    title: "A project takes shape",
    description: "A website concept is added to the sample project list.",
    label: "Sample event 02",
    icon: "website",
  },
  {
    id: "activity-3",
    title: "A direction is chosen",
    description: "A creative concept is organized in this demo workspace.",
    label: "Sample event 03",
    icon: "sparkle",
  },
];
export const demoChecklist = [
  {
    id: "setup",
    label: "Review your organization blueprint",
    href: "/onboarding",
  },
  {
    id: "tools",
    label: "Explore the planned AI tools",
    href: "/app/workspace",
  },
  {
    id: "preferences",
    label: "Find your workspace preferences",
    href: "/app/settings",
  },
] as const;
export const demoUsage = {
  used: 240,
  total: 1000,
  label: "Sample credits",
} as const;

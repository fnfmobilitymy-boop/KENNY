/** Presentation-only fixtures for the M3 concept. No production metrics or API responses. */
export const modules = [
  {
    icon: "command",
    name: "AI Command Center",
    category: "Business overview",
    description:
      "A planned home for priorities, team activity and business insights.",
  },
  {
    icon: "workspace",
    name: "AI Workspace",
    category: "Think & collaborate",
    description:
      "A shared space for conversations, model selection and agent collaboration.",
  },
  {
    icon: "website",
    name: "AI Website Builder",
    category: "Build your presence",
    description:
      "Turn a brief into a website concept, with chat and a side-by-side preview.",
  },
  {
    icon: "image",
    name: "AI Image Studio",
    category: "Create visually",
    description:
      "Explore product photography, campaign artwork and brand assets.",
  },
  {
    icon: "video",
    name: "AI Video Studio",
    category: "Tell your story",
    description:
      "Plan video concepts, timelines, captions and export workflows.",
  },
  {
    icon: "marketing",
    name: "Marketing Studio",
    category: "Reach your audience",
    description:
      "Bring campaign ideas, content planning and channel strategies together.",
  },
  {
    icon: "sales",
    name: "Sales & CRM",
    category: "Build relationships",
    description:
      "Organize customer context, follow-ups and sales opportunities.",
  },
  {
    icon: "workflow",
    name: "Workflow Automation",
    category: "Connect the work",
    description:
      "Design repeatable steps and agent handoffs with human review.",
  },
  {
    icon: "insights",
    name: "Business Insights",
    category: "See the bigger picture",
    description:
      "Explore reporting concepts across connected business information.",
  },
  {
    icon: "knowledge",
    name: "Knowledge Hub",
    category: "Keep context close",
    description:
      "A planned library for business documents and shared knowledge.",
  },
  {
    icon: "operations",
    name: "Operations",
    category: "Keep things moving",
    description:
      "Bring projects, tasks and team responsibilities into one view.",
  },
  {
    icon: "settings",
    name: "Workspace & Billing",
    category: "Shape your workspace",
    description:
      "Planned organization, profile, preferences and subscription management.",
  },
] as const;
export const previewTabs = [
  { id: "overview", label: "Overview" },
  { id: "creative", label: "Creative studio" },
  { id: "workflow", label: "Workflows" },
] as const;
export const demoTasks = [
  {
    name: "Shape the launch brief",
    team: "Marketing",
    status: "Ready for review",
    tone: "success",
  },
  {
    name: "Explore website directions",
    team: "Creative",
    status: "In progress",
    tone: "accent",
  },
  {
    name: "Plan customer follow-ups",
    team: "Sales",
    status: "Draft",
    tone: "muted",
  },
] as const;
export const plans = [
  {
    name: "Individual",
    for: "Room for your next big idea.",
    description:
      "A proposed starting point for founders and independent creators.",
    features: [
      "Personal workspace concept",
      "Creative module access planned",
      "Usage details to be confirmed",
    ],
  },
  {
    name: "Team",
    for: "Bring your people together.",
    description: "A proposed shared studio for teams building their business.",
    features: [
      "Collaborative workspace concept",
      "Shared knowledge and projects planned",
      "Seat and usage details to be confirmed",
    ],
  },
  {
    name: "Business",
    for: "A wider view of your business.",
    description:
      "A proposed path for organizations with broader workflow needs.",
    features: [
      "Organization workflows planned",
      "Integration options to be defined",
      "Availability and terms to be confirmed",
    ],
  },
] as const;
export const faqs = [
  {
    q: "What can I try in this preview?",
    a: "You can explore the landing page, switch the illustrative dashboard views, browse planned modules and try the design-system components. This Phase 1 preview does not run AI, create accounts or process business data.",
  },
  {
    q: "Are the AI modules available now?",
    a: "No. The modules shown here describe the planned product direction. Their interfaces will be developed in later milestones, and real model execution requires a backend integration.",
  },
  {
    q: "Can I upload my business documents?",
    a: "Not in this milestone. No file upload or storage service is connected. Please do not submit confidential information through demo components.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing, usage allowances, currencies and billing terms have not been finalized. The plan concepts are provided for review only. There is no checkout, paid subscription or free-trial promise.",
  },
  {
    q: "Will it work for teams?",
    a: "Shared workspaces and organization workflows are planned. Authentication, membership, permissions and tenant isolation must be implemented and verified on the backend before real team use.",
  },
  {
    q: "What happens next?",
    a: "After review of this landing page, M4 will focus on authentication and organization onboarding screens. Those screens will still be clearly separated from the later backend implementation.",
  },
] as const;

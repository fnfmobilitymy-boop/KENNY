# M5 — AI Command Center dashboard

## Audit and implementation plan

Starting revision: `13e8d14d9f92a7fe72c71924260c3341e16aa29e`. Existing M1–M4 routes, shared Inter/Space Grotesk typography, semantic dark/light/motion tokens, K symbol, primitives, tests and `/KENNY` static export were inspected and retained. The installed Next.js layout/client-boundary/static-export guides were consulted. No dependencies were added.

Implementation sequence: shared application layout and accessible controls; focused demo dashboard; static Coming Soon routes; eight-width and accessibility/regression QA; documentation and Pages publication. Stop before M6.

## Architecture and files

- `src/app/app/layout.tsx`: shared server layout and scoped stylesheet; no session checks or fake auth gate.
- `src/app/app/page.tsx`: Command Center route.
- `src/app/app/[module]/page.tsx`: fifteen statically enumerated module shells with `generateStaticParams`, `dynamicParams=false`, route-specific metadata and not-found handling.
- `src/app/app/studio.css`: extends existing tokens/radii. Operational screens have no heavy animation or 3D visuals.
- `src/features/app-shell`: AppShell, AppSidebar, AppTopbar, WorkspaceSwitcher, CommandSearch, NotificationMenu, UserMenu, shared Dropdown and in-memory workspace context.
- `src/features/dashboard`: DashboardHeader, QuickActionCard, MetricCard, ToolLauncherCard, AgentStatusCard, TaskList, ActivityFeed, UsageCard, ApprovalCard, GettingStartedChecklist, EmptyState, SkeletonLoader, ResponsiveDashboardGrid and orchestrating DashboardHome.
- `src/features/modules/coming-soon.tsx`: consistent planned-capability page, with real navigation back to the Command Center/setup.
- `src/demo/dashboard.ts`: centralized typed demo workspace, module, task, approval, agent, project, usage, activity and checklist fixtures.
- `src/types/dashboard.ts`: view-model and future integration shapes; no service implementation or API fallback.
- `src/lib/app-navigation.ts`: pure page search and base-path normalization; `src/lib/dialog-focus.ts`: native-dialog focus containment.
- `src/components/ui/icon.tsx`: extends the existing local SVG vocabulary; no icon package.
- Existing public header, auth exploration area and onboarding completion add explicitly labeled dashboard demo links without removing prior actions.
- `tests/app-navigation.test.mjs`, `tests/browser/dashboard.spec.ts`: route/search integrity and interaction/responsive tests. Existing suites remain.

## Shell behavior

The desktop sidebar remains across app routes. Collapse state is in memory in the shared layout, so navigation preserves it; refresh resets it. Below 1024px, a native modal drawer replaces it. Native dialogs support Escape and explicit focus containment/return. The topbar supplies workspace selection, page search, theme, notifications and visitor menu. Breadcrumbs and active-link state use normalized paths.

Menus/listbox have explicit roles, Arrow/Home/End navigation, Escape and outside/blur dismissal. Search is local page/module matching, not an AI or business-data search; Ctrl/Cmd+K opens it. Native modal dialogs contain focus. No shortcut library is needed.

Workspace selection changes illustrative fixtures only. Kenny Studio is an illustrative pilot workspace, and Blank workspace is an empty-state example. This does not enforce tenant isolation or authenticate a user. Menus say Demo visitor / No signed-in session. The app is intentionally inspectable without a fake login.

## Dashboard and data honesty

The dashboard prioritizes identity, quick actions, a few nonfinancial sample counts and tool discovery before detailed work panels. Counts describe sample tasks/projects/review items/planned tools. No sales, revenue, customer performance or trend percentages are invented. Credit values are explicitly illustrative, with no subscription allowance or actual balance.

Agent profiles all say Not connected. No models/jobs/agents run. Sample task/project links navigate to planned module shells. Approval inspection changes a local reviewed label only; nothing is persisted. Checklist checkmarks are local and reset on leaving/refresh. Notifications are explicitly demo and clear/restore locally.

The Preview state select exposes ready, loading-layout and error examples. Loading is a static skeleton with an accessible description; no request is running. Error explains that no real service failed and supports returning to demo data. Blank workspace exposes useful task/project/agent/approval/activity empty states. Future real service adapters must be introduced separately; do not silently replace backend failures with fixtures.

## Routes

`/app` plus `/app/workspace`, `/app/website-builder`, `/app/image-studio`, `/app/video-studio`, `/app/documents`, `/app/marketing`, `/app/seo-ads`, `/app/sales`, `/app/crm`, `/app/booking`, `/app/ecommerce`, `/app/automations`, `/app/analytics`, `/app/billing`, `/app/settings`.

All module pages are Coming Soon, including AI Workspace. M6's actual workspace prototype is not implemented here. Pages adds `/KENNY` and trailing slashes. Sidebar/tool/search/project/task links point to generated routes; no dead module links are intentional.

## Quality and review

Required checks: lint, typecheck, unit tests, format check, production build, Chromium suite and Pages export. Browser targets: 320, 375, 430, 768, 1024, 1280, 1440 and 1920px, both themes, reduced motion, menu/drawer/dialog keyboard behavior, search/no-results, collapse persistence, empty/loading/error states, local approval/checklist behavior, all module routes and M1–M4 regressions.

Screenshots live under `/workspace/artifacts/kenny-m5/`. Final counts and verified deployment evidence are in `PHASE_1_ACCEPTANCE.md`. No authentication, database writes, payments, AI calls or M6 implementation is included.

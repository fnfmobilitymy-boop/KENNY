# Phase 1 acceptance — M5 AI Command Center

Date: 2026-10-26. Product: **Kenny AI Business Studio**. M1–M4 are preserved. M5 adds the frontend Command Center, shared app shell and planned module pages. **Stop after M5; no M6 implementation is included.** Historical M4 evidence is retained in `docs/M4_ACCEPTANCE_HISTORY.md`.

## Deliverables and changed files

- `/app`: `src/app/app/{layout.tsx,page.tsx,studio.css}`.
- Fifteen static Coming Soon pages: `src/app/app/[module]/page.tsx`, `src/features/modules/coming-soon.tsx`.
- Shared shell: `src/features/app-shell/{app-shell,app-sidebar,app-topbar,app-context,dropdown,workspace-switcher,command-search,notification-menu,user-menu}.tsx`.
- Dashboard: `src/features/dashboard/{dashboard-home,components,approval-card,getting-started-checklist}.tsx`.
- Typed centralized demo catalog: `src/demo/dashboard.ts`, `src/types/dashboard.ts`.
- Shared utilities: `src/lib/{app-navigation,dialog-focus}.ts`; extended existing `src/components/ui/icon.tsx`.
- Entry links: existing public header, auth exploration area and onboarding completion now link to the Command Center demo without removing prior actions.
- Tests: `tests/app-navigation.test.mjs`, `tests/browser/dashboard.spec.ts`; Playwright output directory updated for M5.
- Deployment helpers identify M5 and verify the dashboard, module shells and referenced assets; the static export/base path/hosting workflow are preserved.
- README, architecture, M5 implementation guide and this report updated; M4 report archived.

No dependencies, API adapters, database writes or authentication gate were added. See `docs/M5_IMPLEMENTATION.md` for the repository audit and architecture decisions.

## Routes

Dashboard: `/app`.

Module shells: `/app/workspace`, `/app/analytics`, `/app/website-builder`, `/app/image-studio`, `/app/video-studio`, `/app/documents`, `/app/marketing`, `/app/seo-ads`, `/app/sales`, `/app/crm`, `/app/booking`, `/app/ecommerce`, `/app/automations`, `/app/billing`, `/app/settings`.

All fifteen modules are **Coming Soon**, with planned capabilities and working navigation. AI Workspace is not an M6 prototype. Existing landing, design-system, auth, legal-placeholder and onboarding routes remain. GitHub Pages prefixes paths with `/KENNY` and trailing slashes.

## Components and interactions

Reusable components include AppSidebar, AppTopbar, WorkspaceSwitcher, CommandSearch, NotificationMenu, UserMenu, DashboardHeader, QuickActionCard, MetricCard, ToolLauncherCard, AgentStatusCard, TaskList, ActivityFeed, UsageCard, ApprovalCard, GettingStartedChecklist, EmptyState, SkeletonLoader and ResponsiveDashboardGrid.

Desktop sidebar collapse/expand survives app-route navigation in the shared layout. Mobile uses a native modal drawer, with Escape, focus containment/return, expanded-state reporting and navigation dismissal. Topbar menus/listbox support Arrow/Home/End navigation and Escape/outside dismissal. Search supports Ctrl/Cmd+K, local filtering, keyboard result selection and no-results recovery. Theme uses the existing accessible toggle and tokens.

The dashboard prioritizes identity and quick actions, with nonfinancial sample counts, planned tools, disconnected agent profiles, sample tasks/reviews/projects, illustrative credits, local checklist and sample timeline. Blank workspace exposes empty states. Preview state exposes explicitly non-network loading and error examples, with recovery. Reviewed labels, notifications and checklist state are local only, not persisted.

## Data honesty and backend boundaries

Kenny Studio is an illustrative pilot workspace, not private customer data. Workspace switching changes fixture presentation and does not enforce tenant isolation. Visitor menu states that no session is signed in. No agent/model/job runs. No real sales, revenue, customer performance or financial trends are represented. Credit values are not an actual balance or subscription allowance.

No authentication, Supabase, authorization/RLS, database writes, payments, live notifications or AI calls were implemented. Fixtures are separate from future service contracts. No fallback pretends to be a production API. No dashboard state or business data is stored in localStorage; the pre-existing theme preference remains.

## Final engineering checks

| Command                       | Result                                              |
| ----------------------------- | --------------------------------------------------- |
| `npm run lint`                | Passed, no lint warnings                            |
| `npm run typecheck`           | Passed                                              |
| `npm test`                    | 15 passed; zero failures/skips                      |
| `npm run format:check`        | Passed                                              |
| `npm run build`               | Passed; dashboard and all module routes prerendered |
| `npm run test:browser`        | 32 passed; zero failures/skips                      |
| `KENNY_PAGES=1 npm run build` | Passed; all 16 app routes exported under `/KENNY`   |

The 15 unit tests include the existing validation/contrast suites plus module-route/catalog integrity, fixture-reference validity, page search and path normalization. The existing Node unit runner emits informational module-format warnings for direct TypeScript helper imports; tests execute successfully and no warning suppression was added.

## Browser coverage

- Dashboard widths: **320, 375, 430, 768, 1024, 1280, 1440, 1920px**, both themes; no horizontal page overflow and key controls/cards stay within viewport bounds.
- Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA scans on dashboard themes at representative small/tablet/wide sizes; search/approval overlays, empty and error states. No violations in tested states. Not a full accessibility certification.
- Sidebar collapse across navigation, active links and all fifteen module routes; mobile drawer keyboard containment/Escape/navigation.
- Workspace listbox keyboard selection, blank data and memory-only switching.
- Search shortcut, focus, no results, clearing and keyboard route selection.
- Notification clearing, outside dismissal, visitor-menu session honesty and focus return.
- Approval inspection/local reviewed label, checklist/reset behavior, explicit loading/error recovery.
- Small-screen menu bounds at 320, 375 and 430px.
- Reduced-motion rendering, visible focus and injected long headline wrapping.
- All sixteen pre-existing M3/M4 browser scenarios remain and pass, including auth/demo honesty, onboarding state/review validation, placeholder links, design-system dialog/tabs, themes, reduced motion and font fallback.

Initial findings resolved: render-prop/ref lint warning replaced with event-delegated popup dismissal; reserved module variable renamed; preview-state select/error region given unambiguous accessible labels; notification popup anchored within small-screen bounds; operational text sizes refined. No assertions or accessibility rules were disabled.

## Screenshots and preview instructions

Open the deployed `/KENNY/app/` route. Public navigation, auth exploration and onboarding completion also offer explicitly labeled dashboard demo links; no login is required. Switch workspaces for the empty state. Use Preview state for loading/error. Inspect approval examples, toggle checklist items and open planned modules.

Screenshots: `/workspace/artifacts/kenny-m5/dashboard-1440-dark.png`, `dashboard-1440-light.png`, `dashboard-375-dark.png`, `dashboard-375-light.png`, 1920px captures, module-mobile and loading-preview captures. Full browser traces/results: `/workspace/artifacts/kenny-m5/test-results/`. Desktop/mobile/light screenshots were reviewed for hierarchy, spacing and clipping.

## Known limitations and next milestone

Frontend demo only. All planned module pages are shells. No operational service or security enforcement is connected. Local preview state resets on refresh; it is not persistence. Manual screen-reader testing, Safari/Firefox, physical devices and measured Core Web Vitals remain unrun. Prior direct public Chromium checks encountered the cloud proxy CA trust issue; local production Chromium coverage and direct public HTTPS checks must be distinguished.

Next is M6 only after user review/approval. M5 does not implement the AI Workspace prototype or any real AI functionality.

## Static export and deployment verification

The Pages build passed with `/KENNY` base path and trailing slashes. Chromium smoke testing of the actual export passed all fifteen module routes (HTTP 200), the landing dashboard entry, collapse-state persistence, module navigation, empty workspace, command-search navigation, mobile drawer and error recovery. No failed HTTP assets or uncaught page errors were observed.

The public verifier now checks M5 revision metadata, the preserved landing/design system/auth/onboarding/legal routes, the Command Center, all fifteen module shells and the union of referenced static assets. Deployment/public evidence is reported separately after publication; do not infer a live revision solely from an existing URL. Cloud startup instructions were saved as an M5 draft and are separate from website deployment. No M6 work is included.

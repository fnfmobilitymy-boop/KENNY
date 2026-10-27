# Kenny AI Business Studio

Next.js App Router + React + strict TypeScript frontend. M1–M7 are implemented, including AI Workspace and fourteen purpose-built module prototypes. **Stop after M7; M8 requires user review.** No authentication, AI, payments or backend service is connected.

## Run locally

Validated toolchain: Node.js 24.19.0 / npm 11.9.0. Use the existing checkout; do not create a Git worktree unless explicitly requested.

```sh
cd /workspace/KENNY
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

## Implemented routes

[Open the Command Center demo](https://fnfmobilitymy-boop.github.io/KENNY/app/) — no login required; this is not an authenticated workspace.

| Route                | Content                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `/`                  | Preserved M3 landing plus Login/Get Started links                              |
| `/design-system`     | Existing design tokens and component showcase                                  |
| `/login`             | Split-screen demo login, local validation, password visibility, Remember me UI |
| `/signup`            | Registration UI, password/confirmation rules, demo acknowledgement             |
| `/forgot-password`   | Reset explanation and email-format checks; no email sent                       |
| `/verify-email`      | Pending/expired/error previews; resend not connected                           |
| `/onboarding`        | Eight-step in-memory organization setup and completion preview                 |
| `/terms`, `/privacy` | Clearly marked legal placeholders; not final legal documents                   |

M5 adds `/app` with a shared responsive shell. `/app/workspace` is now the M6 interactive prototype. M7 implements the other fourteen routes as explicitly local **frontend prototypes**:

- Overview: `/app/analytics`.
- Create: `/app/website-builder`, `/app/image-studio`, `/app/video-studio`, `/app/documents`.
- Grow: `/app/marketing`, `/app/seo-ads`, `/app/sales`, `/app/crm`.
- Manage: `/app/booking`, `/app/ecommerce`, `/app/automations`.
- Account: `/app/billing`, `/app/settings`.

GitHub Pages prefixes these paths with `/KENNY/`, with trailing slashes. Landing exploration CTAs remain; Get Started opens registration. Auth screens also link directly to the organization setup preview. No sign-in is needed to review it.

## Quality checks

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm run test:browser
```

Use a normal production build before browser tests or `npm run start`. Playwright starts an isolated production server on port 3100; do not reuse a stale server while rebuilding. Chromium defaults to `/usr/bin/chromium`; override `CHROMIUM_PATH` on other machines. Missing browsers must be reported as an unrun check. Screenshots are in `/workspace/artifacts/kenny-m4/`; M5 dashboard captures and M5 traces/results are under `/workspace/artifacts/kenny-m5/`; M6 captures are under `/workspace/artifacts/kenny-m6/`; current M7 screenshots/results are under `/workspace/artifacts/kenny-m7/`. The preserved M3 suite writes landing screenshots to `/workspace/artifacts/kenny-m3/`.

M4 browser coverage includes 320, 375, 430, 768, 1024 and 1440px, local validation, password visibility, disconnected-action feedback, verification states, wizard forward/backward/review editing, optional interests, theme rendering and accessibility scans. Unit tests exercise format/selection validation and both-theme contrast.

## Demo boundaries and privacy

Use sample information and a disposable demo password. No form action sends an authentication request or creates an account/organization. “Remember me” is UI-only. No password, token, email, name or wizard data is written to localStorage/sessionStorage. Only the pre-existing theme preference is stored. Passwords clear after a valid local form check. Wizard choices remain in memory while moving between steps; refreshing/leaving clears them. Completion is explicitly a preview, not server-side creation.

Terms/Privacy are navigation placeholders. Supabase, sessions, verification emails, password resets, authorization, RLS, organization membership and billing enforcement remain later backend work. Do not treat frontend validation as a security boundary.

## Structure

Routes and static layouts live in `src/app`; shared brand/UI/layout components in `src/components`; auth/onboarding/landing features in `src/features`; semantic tokens in `src/design-tokens`; demo catalogs in `src/demo`; types in `src/types`; pure validation in `src/lib`; future adapters in `src/services`. M4 reuses Inter, Space Grotesk, dark/light themes, native form controls and the existing primitives. No animation framework or runtime font CDN was added.

## GitHub Pages deployment

[Website](https://fnfmobilitymy-boop.github.io/KENNY/) · [Login](https://fnfmobilitymy-boop.github.io/KENNY/login/) · [Onboarding](https://fnfmobilitymy-boop.github.io/KENNY/onboarding/)

The preserved workflow deploys `main` from `fnfmobilitymy-boop/KENNY`. `KENNY_PAGES=1 npm run build` generates static `out/` with `/KENNY` base path. The workflow writes `deployment.json` identifying its exact SHA, application source tree and M7 milestone before artifact upload. Inspect that marker and the successful Actions run rather than assuming an existing URL serves the latest code.

```sh
python3 scripts/verify-public-deployment.py <full-successful-deployment-sha>
```

The verifier checks the M3 landing, M4 routes, M5 dashboard, the M6 workspace, fourteen M7 module prototypes, referenced static assets, cache-busted responses and exact M7 revision metadata through the configured HTTPS proxy. Direct public-host checks require `fnfmobilitymy-boop.github.io` to be allowed in the environment network settings. A pending allowlist draft does not establish public verification. Deployment API evidence, local static-browser checks and actual public HTTP checks are reported separately in the acceptance report.

See [M4 implementation](docs/M4_IMPLEMENTATION.md), [acceptance results](PHASE_1_ACCEPTANCE.md), [architecture](docs/ARCHITECTURE.md), [historical M3 audit](docs/M3_DEPLOYMENT_AUDIT.md), and [backend requirements](src/services/README.md).

## M4 release verification

The M4 application release `d6b93597b824758dcddc13c71c5e22783438de4f` deployed successfully in [Actions run 40285425010](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40285425010). Its source fingerprint is `87ce5e45781a324c74360b87b0b7dc6f70ef3ae2`. Actual public HTTPS checks passed for revision metadata, all seven M4/legal routes, the preserved landing/design system and eleven static assets. Normal and cache-busted landing responses matched. GitHub Pages advertised a 600-second cache lifetime; no stale-root mismatch was observed.

All 16 local Chromium scenarios passed. A separate public Chromium attempt could not establish trust in the cloud proxy CA; no TLS checks were disabled. Public browser interactions remain pending, separately from the successful public HTTPS and local production-browser checks. See the acceptance report for evidence and limitations. Later documentation-only revisions can change the deployed commit SHA; consult `/KENNY/deployment.json` and the latest successful Actions run for the current revision.

## M5 dashboard review

The responsive app shell has desktop collapse/expand, mobile modal navigation, workspace demo switching, local page search (Ctrl/Cmd+K), notifications and visitor menus, breadcrumbs and the shared theme toggle. Kenny Studio is an illustrative pilot workspace; Blank workspace shows useful empty states. Workspace switching is not tenant isolation.

All metrics, tasks, projects, credit values and activity are illustrative and explicitly labeled. No real business performance or revenue is represented, and every agent is Not connected. Review buttons and checklist checkmarks only change local state; nothing is saved. The Preview state select exposes static loading/error examples with an honest explanation and recovery control.

No dependencies were added. Existing M3/M4 tests remain; M5 adds route/search integrity and dashboard interaction tests across 320, 375, 430, 768, 1024, 1280, 1440 and 1920px. Screenshots: `/workspace/artifacts/kenny-m5/dashboard-1440-dark.png`, `dashboard-375-dark.png` and matching light-theme captures. See [M5 implementation](docs/M5_IMPLEMENTATION.md) and [acceptance evidence](PHASE_1_ACCEPTANCE.md).

The M5 release originally kept AI Workspace as a Coming Soon shell; M6 replaces only that shell with the local frontend prototype. No database, authentication, tenant enforcement, live notifications, subscriptions or AI execution is connected.

### Verified M5 release

M5 application commit `e43469dee8fc946c7a5292c8245015ee151259a5` deployed successfully in [Actions run 40289692770](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40289692770). Application source fingerprint: `f537d72042be56942add24ca7d8e4eee805451a9`. The public verifier passed against the actual HTTPS site: exact M5 metadata, dashboard, all fifteen module shells, preserved routes and 24 referenced assets. Normal/cache-busted landing responses matched. All 15 unit tests and 32 local production-browser scenarios passed; Pages export/static-host interaction checks passed separately. Later documentation-only revisions may update the deployed SHA; `deployment.json` identifies the current release. See the acceptance report for bounded browser coverage and unrun checks.


## M6 workspace review

[Open AI Workspace](https://fnfmobilitymy-boop.github.io/KENNY/app/workspace/). The existing app shell, themes and M1–M5 routes are preserved. Independent history and inspector panels surround the conversation at desktop widths; smaller screens use keyboard-accessible modal panels. New/search/switch/rename/delete conversations, per-thread drafts, fixed scenario previews, stop/retry, inspector tabs and local approval decisions are functional in memory.

Six deterministic samples cover marketing, website requirements, follow-up messages, SEO, translation and document summary. **Preview simulator is not AI**: outputs never depend on prompt/file contents. Sample failure, cancellation, disconnected provider, empty and zero-search states are explicitly labeled. Selected TXT/MD/PDF attachments retain only name/type/size metadata (three files, 5 MB each); no contents are read, uploaded or processed. Prompts are limited to 4,000 characters. No workspace messages, drafts, files or approval state enter browser storage. Reload, leaving the route or switching demo workspaces clears this session.

Run the commands above plus `KENNY_PAGES=1 npm run build`. See [M6 implementation](docs/M6_IMPLEMENTATION.md) and [current acceptance report](PHASE_1_ACCEPTANCE.md) for file changes, test evidence, screenshots, future API contracts and deployment status. Desktop/mobile screenshots are under `/workspace/artifacts/kenny-m6/`.

### Verified M6 application release

M6 application commit `fe28e74fc01bb2b0d8abf55367e271c897c746fa` was pushed to `fnfmobilitymy-boop/KENNY` on `main` and deployed successfully by [Actions run 40306991141](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40306991141). Its tested application source fingerprint is `8fc0827179281841d7e20636696942db5a9b2149`.

Actual public HTTPS verification passed for [AI Workspace](https://fnfmobilitymy-boop.github.io/KENNY/app/workspace/), exact M6 commit/source metadata, preserved landing/design system, seven M4/legal routes, M5 dashboard, all fourteen planned module shells and **28 referenced static assets**. All asset paths use `/KENNY/_next/` and returned HTTP 200. Normal and cache-busted landing/workspace responses matched; Pages advertised a 600-second cache lifetime. No stale-shell response was observed. Source metadata was compared with the local committed source tree, not merely checked for a SHA-shaped string.

The application was tested before that commit; no application code changed after the passing 49-test production-browser run. This evidence is recorded by a subsequent documentation-only commit, which can update the public commit SHA without changing the application source fingerprint. Consult `/KENNY/deployment.json` and the latest successful Actions run for the current deployment revision. Public verification output is `/workspace/artifacts/kenny-m6/public-deployment-application.json`.


## M7 complete module review

[Website Builder](https://fnfmobilitymy-boop.github.io/KENNY/app/website-builder/) · [CRM](https://fnfmobilitymy-boop.github.io/KENNY/app/crm/) · [Billing](https://fnfmobilitymy-boop.github.io/KENNY/app/billing/) · [Settings](https://fnfmobilitymy-boop.github.io/KENNY/app/settings/).

All fourteen former module shells now have separate, purpose-built interactive prototypes. Creative includes website concepts, fixed vector asset inspection/favorites, video storyboards and live local document templates. Growth includes campaign/calendar drafts, SEO/Ads planning, disconnected sales inbox/human-review concepts and local CRM list/kanban interactions. Operations includes calendar/conflict examples, fictional commerce editor/orders, inspectable workflow nodes with a prewritten sample log, and filterable fictional analytics with a data-table alternative. Account includes proposed-plan comparison and eight Settings sections.

All examples are fictional DEMO. Drafts, favorites, schedules, statuses, roles and approvals are unsaved local state. No actual generation, crawl, social post, booking, order, workflow, invoice, payment or security change occurs. Backend actions are disabled with visible Not connected explanations. No card, credential or API-key entry is implemented. Only the existing theme preference persists. Switching Settings tabs preserves local drafts; leaving/reloading a module clears it. Do not enter sensitive information. Preview state controls expose static empty/loading/error examples, never a silent substitute for a failed backend.

See [M7 implementation](docs/M7_IMPLEMENTATION.md) for the four reviewable groups, architecture and changed files; [current acceptance](PHASE_1_ACCEPTANCE.md) for actual command results, screenshots and deployment evidence. Historical M6 results are preserved in `docs/M6_ACCEPTANCE_HISTORY.md`. No dependencies, M6 conversation logic, static export configuration or hosting workflow were replaced.

For an internal static-host check after the Pages build, serve `out/` beneath `/KENNY/` and run `node scripts/verify-static-modules.mjs <served-export-base-url>`. This helper exercises module routes/actions and preserved routes using Chromium; it does not deploy anything. The public verifier requires the full successful deployment SHA and compares both metadata and the local committed `src` fingerprint.

### Verified M7 application release

M7 application commit `0e5987e2b21de5213ad458381bbf042af0b1ceb3` was pushed to `fnfmobilitymy-boop/KENNY` on `main` and deployed successfully by [Actions run 40442861605](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40442861605). Tested application source fingerprint: `8a444ac48bbd3213cfd5723bf3fb06ce0038e705`.

Actual public HTTPS checks passed for all fourteen purpose-built M7 module routes, preserved landing/design system, seven M4/legal routes, M5 dashboard, M6 workspace and **29 referenced static assets**. Every asset path uses `/KENNY/_next/` and returned HTTP 200. Each M7 route was checked for its own content signature and absence of the old shell. Normal and cache-busted responses matched for all fourteen modules, the landing and workspace. Public metadata matched both the exact SHA and local committed `src` tree. No stale module response was observed; Pages advertises a 600-second cache lifetime.

Review [Website Builder](https://fnfmobilitymy-boop.github.io/KENNY/app/website-builder/), [CRM](https://fnfmobilitymy-boop.github.io/KENNY/app/crm/), [Automations](https://fnfmobilitymy-boop.github.io/KENNY/app/automations/) and [Billing](https://fnfmobilitymy-boop.github.io/KENNY/app/billing/). All other modules are reachable from the preserved app navigation.

This deployment evidence is recorded in a documentation-only follow-up commit. That follow-up can update the public SHA while keeping the tested application source fingerprint unchanged. `/KENNY/deployment.json` and the latest successful Actions run identify the current revision. Evidence: `/workspace/artifacts/kenny-m7/public-deployment-application.json`. Public interactive browser checks remain unverified separately from successful actual HTTPS and local Chromium checks.

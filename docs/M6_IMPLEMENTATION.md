# M6 — AI Workspace frontend prototype

## Repository audit and plan

The existing M1–M5 implementation uses Next.js App Router, strict TypeScript, self-hosted Inter/Space Grotesk, semantic dark/light tokens, native dialogs, accessible menu primitives and a shared dashboard layout. `/app/workspace` was one of fifteen generated Coming Soon routes. The GitHub Pages workflow exports `out/` under `/KENNY`, with trailing slashes and exact revision metadata. Existing tests cover the public landing, auth/onboarding and dashboard.

M6 reuses those foundations, replaces only the workspace shell, separates typed fixtures and pure transitions from UI, adds local interactions, then checks production and Pages builds. No dependencies, backend adapters, credentials or hosting changes are introduced. The global layout, navigation and theme remain shared. The sidebar/search/dashboard now describe Workspace as a demo prototype rather than Coming Soon; fourteen other modules remain planned.

## Files and architecture

| Area | Files |
| --- | --- |
| Explicit route and responsive styles | `src/app/app/workspace/{page.tsx,workspace.css}` |
| Local frontend view models and future contracts | `src/types/workspace.ts` |
| Six fixed scenarios and fresh fixture factory | `src/demo/workspace.ts` |
| Immutable reducer, search and validation | `src/lib/workspace-state.ts` |
| Session and responsive panels | `src/features/workspace/workspace-studio.tsx` |
| Timed simulator orchestration | `src/features/workspace/use-workspace-preview.ts` |
| History and local actions | `src/features/workspace/conversation-history.tsx` |
| Input and metadata-only attachments | `src/features/workspace/prompt-composer.tsx` |
| Message rendering and scroll behavior | `src/features/workspace/message-list.tsx` |
| Safe limited text formatting | `src/features/workspace/sample-content.tsx` |
| Overview/Steps/Results/Approvals | `src/features/workspace/task-inspector.tsx` |
| Route/catalog integration | `src/app/app/[module]/page.tsx`, `src/demo/dashboard.ts`, `src/types/dashboard.ts`, app sidebar/search and dashboard home |
| Shared icons | `src/components/ui/icon.tsx` |
| Automated checks | `tests/workspace-state.test.mjs`, `tests/browser/workspace.spec.ts`; M5 route expectations updated without removing coverage |
| Deployment and reports | metadata writer, public verifier, Playwright output directory, README, architecture, current acceptance and historical M5 acceptance |

The reducer owns threads, active ID, drafts, metadata attachments, messages, task status and local approval state. The orchestration hook alone owns cancelable timers and an immediate submission lock; the reducer also rejects duplicate/stale completions. Stop, switching threads, deleting the active thread, reset and unmount clear pending timers. Selecting a different scenario does not relabel past results. Retrying/replaying adds a fixed sample without duplicating the user's message. Workspace switching remounts the local session, visibly disclosed in the interface.

All state lives in memory. No messages, drafts, attachment metadata or decisions are written to localStorage/sessionStorage, URLs, logs or a service. The existing theme preference is unchanged. Reload, route unmount or demo-workspace switching clears this session. This is not durable storage or tenant isolation.

## Demonstration scenarios

- Business marketing plan: fictional planning outline and three structured cards.
- Website requirements brief: fixed site outline with a code-block example.
- Client follow-up message: placeholder names only, never sent.
- SEO content outline: sample headings, no live search or ranking claim.
- Translation request: a fixed English/Malay example, not translation of entered text.
- Document summary preview: a fictional document example, never a summary of a selected file.

Every assistant sample is prewritten and labeled. The outcome selector provides a deliberately failed sample; this does not report an actual network outage. Queued/running-preview uses a local display timer (300 ms then 1,600 ms completion), never model reasoning/tool execution. Stop cancels that timer. Overview explicitly says the provider is not connected. Results show fixed text/cards and a future artifact shell, not a created file. Approval/rejection changes only a local label and does not authorize any external action.

## Input, rendering and accessibility

Composer uses Enter to submit, Shift+Enter for newline and ignores Enter during IME composition. Blank or over-4,000-character inputs cannot submit; duplicate submissions are guarded synchronously. TXT/MD/PDF selection accepts at most three files, each up to 5 MB, and stores only name/type/size. Unsupported extensions are rejected with an alert. No file contents are read, uploaded or processed. File validation is a prototype UI rule, not malware scanning or a server security control.

User messages render as escaped React text. Fixed samples support only headings, bullets, bold fragments and fenced code through React elements. HTML, executable markup and remote media are not rendered. Long text/code/filenames wrap within their panels. Clipboard writing occurs only after an explicit Copy action; success waits for the browser promise. An unavailable clipboard exposes selectable text.

Native modal dialogs handle history/inspector at smaller sizes plus rename/delete/reset confirmations. They support Escape, focus containment and return. Delete/reset require explicit confirmation. Rename errors are associated with the input and focus returns to it. Inspector tabs support Arrow/Home/End navigation with roving tabIndex. Task updates use a polite atomic live region. The message viewport scrolls automatically only near its bottom; a new-sample control allows returning when reading older messages. Keyboard focus stays available in the composer, and local conversation changes move to the appropriate heading/input.

## Layout

At 1280 px and above, history and inspector independently collapse around a flexible main chat. At narrower widths those panels are modal drawers; the global app sidebar retains its existing responsive behavior. The composer stays within the chat flex region, has a bounded scrollable attachment/error area, and includes safe-area padding. Semantic tokens support both themes. No animation library or operational 3D effect is added; reduced motion disables transitions.

## Future integration boundary

`WorkspaceService` describes provider connection, submission with an AbortSignal and cancellation, without implementing any of them. Request models carry thread/task IDs and attachment references; output references support text, structured and artifact kinds. Production work must add authenticated server authorization, tenant policies, validated file upload/storage, provider adapters, streaming/error handling, rate limits and explicit action approval enforcement separately. Demo fixtures must never become a silent fallback for a failed production AI request. No particular provider is assumed.

## QA and deployment

Current command results, screenshot paths, deployment SHA and unresolved limitations are recorded in `PHASE_1_ACCEPTANCE.md`. Historical M5 evidence is in `docs/M5_ACCEPTANCE_HISTORY.md`. The workflow and static export configuration remain intact. The public verifier checks exact M6 commit metadata, preserved routes, the actual workspace HTML and all referenced asset paths/HTTP responses, including cache-busted root responses. Local Chromium interaction coverage and public HTTPS verification are distinct evidence.

M6 stops here. M7 and all real AI/backend features require a later authorized milestone.

## Verified application release

M6 application commit `fe28e74fc01bb2b0d8abf55367e271c897c746fa` was pushed to `fnfmobilitymy-boop/KENNY` on `main` and deployed successfully by [Actions run 40306991141](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40306991141). Its tested application source fingerprint is `8fc0827179281841d7e20636696942db5a9b2149`.

Actual public HTTPS verification passed for [AI Workspace](https://fnfmobilitymy-boop.github.io/KENNY/app/workspace/), exact M6 commit/source metadata, preserved landing/design system, seven M4/legal routes, M5 dashboard, all fourteen planned module shells and **28 referenced static assets**. All asset paths use `/KENNY/_next/` and returned HTTP 200. Normal and cache-busted landing/workspace responses matched; Pages advertised a 600-second cache lifetime. No stale-shell response was observed. Source metadata was compared with the local committed source tree, not merely checked for a SHA-shaped string.

The application was tested before that commit; no application code changed after the passing 49-test production-browser run. This evidence is recorded by a subsequent documentation-only commit, which can update the public commit SHA without changing the application source fingerprint. Consult `/KENNY/deployment.json` and the latest successful Actions run for the current deployment revision. Public verification output is `/workspace/artifacts/kenny-m6/public-deployment-application.json`.

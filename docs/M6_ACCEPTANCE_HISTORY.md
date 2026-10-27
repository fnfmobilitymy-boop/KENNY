# Phase 1 acceptance — M6 AI Workspace

Date: 2026-10-26. Product: **Kenny AI Business Studio**. M1–M5 are preserved. M6 replaces only the workspace Coming Soon shell with an interactive frontend prototype. **Stop after M6; do not begin M7 without user approval.** Historical M5 evidence is retained in `docs/M5_ACCEPTANCE_HISTORY.md`.

## Delivered scope and changed files

The working route is `/app/workspace`, publicly `/KENNY/app/workspace/`. It retains the shared global sidebar, topbar, breadcrumbs, workspace selector and dark/light themes. Fourteen other planned modules retain their existing Coming Soon pages. All landing, authentication demo, onboarding and dashboard routes remain.

Features include independently collapsible history/inspector, responsive modal panels, new/search/switch/rename/delete/reset conversations, local per-thread drafts, six fixed scenario previews, safe formatted samples, copy/fallback selection, Enter/Shift+Enter composition, attachment metadata previews, duplicate-submit protection, stop/retry/failure states, four inspector tabs, structured sample results and local approval decisions. Empty/search/disconnected states and destructive confirmations are explicit.

Changed files and state architecture are listed in `docs/M6_IMPLEMENTATION.md`. Main additions are `src/app/app/workspace`, `src/features/workspace`, `src/demo/workspace.ts`, `src/types/workspace.ts`, `src/lib/workspace-state.ts` and M6 unit/browser tests. Existing catalog/sidebar/search/dashboard labels distinguish the prototype from planned tools. No packages, backend connections or hosting changes were added.

## Demo honesty and privacy

The simulator returns deterministic prewritten samples unrelated to prompt or attachment contents. Queued/running/complete/failed/canceled preview statuses never represent real AI execution. The provider is Not connected. Approval/rejection is local only and performs no action. Artifact previews create no files. No real client/business performance records are represented; Kenny Studio is an illustrative pilot workspace.

Prompts, conversations, drafts, attachment metadata and decisions remain only in React memory. No local/session storage or network request stores them. Only the pre-existing theme preference persists. Files are metadata only (TXT/MD/PDF, three files, 5 MB each); their contents are never read/uploaded/processed. Refreshing, leaving the route or switching demo workspaces clears this local session. No authentication, Supabase, database, billing, cloud upload, actual AI or autonomous action is implemented.

## Engineering verification

| Command / check | Actual result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | 23 passed, 0 failed |
| `npm run format:check` | Passed |
| `npm run build` | Passed; explicit static workspace + fourteen module shells |
| Targeted M6 Chromium suite | 17 passed, 0 failed |
| `npm run test:browser` | 49 passed, 0 failed (32 preserved M3–M5 + 17 M6) |
| `KENNY_PAGES=1 npm run build` | Passed; `/KENNY` base path, trailing slashes and `out/` retained |
| Pages static-host interaction check | Passed; workspace send/stop/retry, rename/delete, mobile panels/focus, 24 additional routes; 0 page errors/failed HTTP/external requests |
| Public exact-revision/routes/assets check | Passed; exact M6 SHA/source tree, normal/fresh root and workspace, preserved routes and 28 assets |

The initial browser pass found three M6 test failures (one ambiguous selector and two dialog-timing failures under a paused test clock). The selector was scoped and dialog opening now follows committed state in an effect. Targeted rerun passed all 17 without disabling tests. Existing M5 route assertions were updated only to recognize the now-implemented workspace; all prior scenarios remain.

M6 browser coverage includes all eight requested widths (320, 375, 430, 768, 1024, 1280, 1440, 1920 px), both themes, reduced motion, responsive panel collapse/drawers, focus return, axe scans at representative widths and mobile dialogs, conversation lifecycle/search/confirmation, all six fixed outputs, inspector keyboard tabs and local decisions, Enter/Shift+Enter, duplicate prevention, cancel/stale timers/retry/failure, long conversations/filenames/4,000-character input, reader-controlled scrolling, clipboard success/fallback and refresh privacy. M3–M5 regression coverage remains in the full suite. Node reports its existing typeless-package warning; it does not fail the unit suite.

## Screenshots and review

Desktop: `/workspace/artifacts/kenny-m6/workspace-1440-dark.png` and matching light capture. Mobile: `/workspace/artifacts/kenny-m6/workspace-375-dark.png` and matching light capture. Additional 1920 px screenshots, desktop Results (`workspace-results-1440-dark.png`), mobile Approvals (`workspace-approvals-375-dark.png`) and Playwright results are in the same artifact directory.

Review the public workspace, open History/Inspector on mobile, create/rename/delete a local conversation, enter a nonsensitive prompt and run a fixed sample, stop/retry, select Sample failure, inspect all tabs, approve/reject a local sample and try an unsupported file. Select Blank workspace for empty-state review. Reload to verify local content clears. No login is required; this is not a protected tenant workspace.

## Limitations and unrun checks

This is a frontend foundation, not a deployed AI service. No cross-device persistence, streaming, real file parsing, generated/downloadable artifacts or server approval enforcement exists. Future contracts are typed but unimplemented. Automated axe checks and keyboard scenarios do not establish complete WCAG conformance. Physical devices, actual mobile keyboards, Safari, Firefox and manual screen-reader review have not been tested.

Direct public Chromium browsing in this environment previously failed proxy-CA trust; TLS verification is not disabled. Public HTTPS/asset checks and local production/static-export browser checks are reported separately. No browser failure will be described as successful visual verification.

## Deployment

M6 application commit `fe28e74fc01bb2b0d8abf55367e271c897c746fa` was pushed to `fnfmobilitymy-boop/KENNY` on `main` and deployed successfully by [Actions run 40306991141](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40306991141). Its tested application source fingerprint is `8fc0827179281841d7e20636696942db5a9b2149`.

Actual public HTTPS verification passed for [AI Workspace](https://fnfmobilitymy-boop.github.io/KENNY/app/workspace/), exact M6 commit/source metadata, preserved landing/design system, seven M4/legal routes, M5 dashboard, all fourteen planned module shells and **28 referenced static assets**. All asset paths use `/KENNY/_next/` and returned HTTP 200. Normal and cache-busted landing/workspace responses matched; Pages advertised a 600-second cache lifetime. No stale-shell response was observed. Source metadata was compared with the local committed source tree, not merely checked for a SHA-shaped string.

The application was tested before that commit; no application code changed after the passing 49-test production-browser run. This evidence is recorded by a subsequent documentation-only commit, which can update the public commit SHA without changing the application source fingerprint. Consult `/KENNY/deployment.json` and the latest successful Actions run for the current deployment revision. Public verification output is `/workspace/artifacts/kenny-m6/public-deployment-application.json`.



## Local evidence and environment instructions

Full Chromium run: `/tmp/kenny-m6-full-browser.log` (49 passed). Static-export report: `/workspace/artifacts/kenny-m6/static-export-verification.json`; mobile export capture: `workspace-pages-375-dark.png`. An initial static-smoke assertion matched multiple status badges; it was scoped to the chat header and rerun successfully. No application changes were needed after the final full browser run.

Updated M6 cloud startup instructions were saved successfully as an environment configuration draft. This does not publish or restart the cloud environment. Review/save/publish in environment settings activates that separate configuration; it is not required for the GitHub Pages deployment. Existing install script, repository membership, network rules and credentials were preserved.

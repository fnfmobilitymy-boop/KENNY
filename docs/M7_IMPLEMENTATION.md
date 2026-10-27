# M7 — Full module UI architecture, Billing & Settings

## Audit and implementation plan

The clean M6 checkout uses Next.js App Router, strict TypeScript, self-hosted fonts, semantic themes, shared app shell, native modal/menu primitives, centralized fixtures, pure-state tests and Chromium/axe QA. M6 has an explicit `/app/workspace` route; fourteen dynamic static-export routes previously rendered Coming Soon. Preserve M1–M6 and `/KENNY` Pages hosting; replace only those module renderers. No dependency or provider integration is needed.

Architecture: separate feature component for each module, centralized fixtures by group in `src/demo/modules`, provider-neutral models in `src/types/modules.ts`, pure helpers in `src/lib/module-state.ts`, and shared headers/panels/catalogs/editors/tabs/dialogs/state examples in `src/features/modules/shared`. Existing buttons, fields, tokens, shell and theme remain authoritative. M6 chat engine is reused through navigation, never duplicated. A server-side module registry selects only the matching feature for each static route.

Implement/test four groups, then run full regression and Pages export, deploy and verify exact public metadata/routes/assets. Do not begin M8 or connect backends.

## Group A — Creative Studio

Website Builder: local concept creation/validation, sample project list, brief editor, page navigator, three viewport widths, style selector, fixed version descriptions, separate handoff tab. Fixed website composition is independent of prompts; new local concepts show an honest empty preview. No generation, file export or publishing.

Image Studio: prompt/settings drafts, ratio/style/quantity controls, hand-authored inline vector samples, asset inspection, favorites/filter/zero results. No generated asset claim.

Video Studio: concept browser, direction/settings, fixed storyboard assets, clip selection, subtitle text draft, audio placeholder, disconnected export/upload/generation. No playback, encoding or actual editing claim.

Documents: five templates, sample list, editable recipient/subject/quantity/sample amount/body and live local preview. Demo units are illustrative, never actual prices/invoices/contracts. PDF export is disabled.

Changed: `src/features/modules/creative/*`, shared primitives/artwork/CSS, `src/demo/modules/creative.ts`, types/helpers, module router, dynamic route/catalog and targeted unit/browser tests.

Executed: lint, typecheck, unit tests, production build, targeted Chromium. Results: all passed; 28 unit tests, four Creative browser tests. Initial lint rejected a render-prop callback capturing a dialog ref; dialog content now uses normal React children and closes through its submit event. No lint rule/test was disabled. Group remains frontend-only; detailed cross-width/theme QA follows after all modules.

## Remaining groups

B: Marketing, SEO & Ads, Sales Agent, CRM.
C: Booking, E-Commerce, Automations, Analytics.
D: Billing and Settings.

Full regression, accessibility/responsive audit, screenshots and deployment evidence will be appended after actual checks.

## Group B — Growth Studio

Marketing has campaign/draft catalogs, a fixed November calendar, channel selection, live local post preview, checklist and local scheduling-label dialog. Nothing is queued or published. SEO & Ads has an unsubmitted URL, fictional keyword table/filter, editable content with a literal word count, SEO checklist, Ads draft controls and illustrative bounded budget arithmetic; no crawl/ranking/performance claim. Sales Agent has disconnected channels, fictional inbox, fixed response templates, unsaved behavior controls and local approval/reject/handoff labels. CRM has fictional contacts, search/stage/sort, list and keyboard-tabbed kanban views, local stage changes, sample follow-up timeline and disconnected import/export.

Changed: `src/features/modules/growth/*`, `src/demo/modules/growth.ts`, registry/catalog, shared CSS, targeted browser tests and current Playwright artifact directory.

Executed: lint/typecheck/unit/build, targeted Growth Chromium. Build/typecheck and 28 units passed; four Growth browser tests passed. Initial browser locator matched two live regions; it now targets the Ads panel. No application behavior or assertion was removed. Lint initially reported imports reserved for later QA but not yet used; those unused imports were removed. No live channels, database or service is connected.

## Group C — Business Operations

Booking provides fixed November week/month views, appointment/empty lists, sample details, availability/reminder drafts and interval conflict comparison. Month-date and availability selections stay consistent. No calendar sync or booking creation. E-Commerce provides fictional catalog/search, local name/category/stock editor, copy preview, sample orders and disconnected store/payment/shipping states. Invalid stock counts are disclosed rather than shown as valid inventory. Automations provides per-workflow in-memory drafts, connected visual node layout, node inspection, validation (including human review) and explicit prewritten simulated log, with no event processing. Analytics provides fixed fictional metric series, range/metric filtering, a readable chart plus accessible data table and disconnected sources/export.

Changed: `src/features/modules/operations/*`, `src/demo/modules/operations.ts`, shared CSS, registry/catalog and targeted browser tests.

Executed: lint/typecheck/unit/build and targeted Operations Chromium. All passed; 28 units and four Operations browser tests. Test selectors were scoped to the workflow panel to distinguish its validation alert from Next.js route announcements. No checks were disabled. All stock, calendar, workflow and analytical records remain sample/local only.

## Group D — Billing & Settings

Billing reuses the existing Individual/Team/Business plan concepts, with local comparison/period selection and no invented prices, finalized allowances, checkout or card fields. Current plan, usage, methods and history explicitly have no data connected. Settings includes Profile, Workspace details, Appearance, Notifications, Team and roles, Security, Integrations and Billing entry. Editable fields are local-only; role labels assign no permission. Security/account actions and integrations are disabled with visible reasons. The shared theme toggle remains the sole persistent preference. Settings tabs keep drafts mounted in memory while switching sections.

Changed: `src/features/modules/account/*`, `src/demo/modules/account.ts`, registry/catalog, shared styles, dashboard/search/user-menu labels and browser expectations reflecting actual prototype availability. The module registry now requires all fourteen non-workspace slugs at compile time. Website concept validation additionally returns focus to its invalid field.

Executed: lint/typecheck/unit/build and targeted Account Chromium. All passed; 28 units and two Account browser tests. The no-card-input assertion was scoped to the Billing module to exclude the app shell's hidden global search field. No application or test was disabled. Final QA below will revalidate integration labels and the focus refinement against a fresh build.

## Reviewable commits and final refinement

- A: `f65520a` — Creative Studio and shared module architecture.
- B: `6b2c5bd` — Growth Studio.
- C: `78a4892` — Business Operations.
- D: `14dae9a` — Billing, Settings and navigation integration.

Subsequent QA refinement centralizes remaining seed copy, document defaults, website copy and workflow/post/product draft factories in the group fixtures. Post/product drafts stay associated with their selected item; factories return independent state. Minimal website styling has a distinct local presentation, and video selection identifies the selected fixed storyboard. M6 code remains unchanged.

## File map

| Concern | Files |
| --- | --- |
| Route selection | `src/app/app/[module]/page.tsx`, `src/features/modules/module-router.tsx` |
| Shared module UI | `src/features/modules/shared/{module-ui,sample-art}.tsx`, `src/features/modules/module-workspaces.css` |
| Creative | `src/features/modules/creative/{website-builder,image-studio,video-studio,documents}.tsx` |
| Growth | `src/features/modules/growth/{marketing,seo-ads,sales,crm}.tsx` |
| Operations | `src/features/modules/operations/{booking,ecommerce,automations,analytics}.tsx` |
| Account | `src/features/modules/account/{billing,settings}.tsx` |
| Demo fixtures | `src/demo/modules/{creative,growth,operations,account}.ts` |
| Models and pure transitions | `src/types/modules.ts`, `src/lib/module-state.ts` |
| Navigation integration | `src/demo/dashboard.ts`, app-shell command search/user menu, dashboard home/approval links |
| Tests | `tests/module-state.test.mjs`, `tests/browser/modules.spec.ts`, updated M5 route/label assertions in `tests/browser/dashboard.spec.ts`, Playwright artifact directory |
| Deployment | existing workflow unchanged; `scripts/{write-deployment-metadata.mjs,verify-public-deployment.py}` identify/verify M7; `scripts/verify-static-modules.mjs` checks a locally served Pages export |
| Reports | README, current acceptance, architecture, this guide and archived M6 acceptance |

## State, accessibility and future services

Feature state is React memory. Shared primitives do not call services or persist module content. Immutable CRM transitions, bounded budget arithmetic, document totals, interval overlap, name validation and independent draft factories have unit coverage. Settings panels remain mounted while their tabs change; module unmount/reload clears drafts. Preview-state examples are deliberate UI states, never a failed-request fallback. Local edits do not rename the global illustrative workspace or change real entitlements.

Native dialogs reuse focus trapping and return focus to their trigger on close/Escape; invalid concept/profile fields receive focus. Tabs use roving tabIndex with Arrow/Home/End keys and associated panels. Form fields are labeled, local notices use polite status regions, workflow issues use an alert, and tables have captions/headers plus named focusable horizontal-scroll regions. Tables may scroll within their own region; the page must not overflow. Mobile stacks panels and workflow nodes, retains touch-friendly controls and the shared navigation drawer. Charts expose equivalent table values. Both themes and reduced motion use existing tokens/preferences. Fixed vector studies are hand-authored examples, never generated assets.

`ModuleServiceContract<TRequest,TResult>` and future request/artifact models intentionally have no implementation. Production work must establish real user/workspace authorization, validated persistence, provider connections, approvals, file safety, background jobs, error reporting and billing enforcement on the server. No provider is assumed and fixtures must never become a production fallback. Security/account/billing controls cannot enforce policy in the frontend.


## Final QA evidence

The dedicated M7 run passed all 23 cases, including all fourteen modules at eight widths, both themes, reduced motion, selected states, keyboard dialogs/tabs, long content and axe scans. The subsequent full production-browser run passed all 72 cases (49 preserved + 23 M7). After that pass, a reproduced arithmetic overflow in oversized document input was bounded to the supported input ranges; all 29 units, lint/typecheck/format/build and a targeted document Chromium test were rerun and passed. No unrelated app code changed after that full run. A fresh Pages build also passed.

The static export helper is `node scripts/verify-static-modules.mjs <internal-export-base-url>`. Serve a fresh `out` export under `/KENNY/` first; the helper checks fourteen module routes, related-link prefixes, representative local interactions, mobile drawer navigation, eleven preserved routes, page errors, failed HTTP and external requests. The report and final deployment evidence are recorded in `PHASE_1_ACCEPTANCE.md` after actual checks finish. Local test artifacts are `/workspace/artifacts/kenny-m7/`.

No Safari/Firefox, physical devices, actual mobile keyboards or manual screen-reader session was run. Automated scans do not guarantee complete WCAG conformance. Public-browser proxy-CA trust is separate from public HTTPS verification; TLS verification is never disabled.

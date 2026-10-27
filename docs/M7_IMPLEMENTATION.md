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

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

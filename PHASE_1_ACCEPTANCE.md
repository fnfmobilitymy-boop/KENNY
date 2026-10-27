# Phase 1 acceptance — M7 full module UI architecture

Date: 2026-10-27. Product: **Kenny AI Business Studio**. M1–M6 are preserved; all fourteen former M7 module placeholders now have purpose-built frontend prototypes. **Stop after M7; M8 and backend work require explicit approval.** Historical M6 evidence: `docs/M6_ACCEPTANCE_HISTORY.md`.

## Routes and delivered behavior

| Route under `/app` | Purpose-built frontend behavior |
| --- | --- |
| `website-builder` | Local concept validation/list, draft brief, fixed preview, viewport/page/style controls, version descriptions; no generation/files/publish |
| `image-studio` | Prompt/settings drafts, fixed vector gallery/detail, local favorites/filter; no image generation |
| `video-studio` | Concept/asset browser, storyboard/timeline selection, clip inspector, local caption and audio placeholder; no video pipeline |
| `documents` | Five templates, sample list, local editable fields and live preview; no issuance/PDF export |
| `marketing` | Campaign/draft catalog, calendar, channel/editor/preview/checklist, local schedule label; no publishing |
| `seo-ads` | Unsubmitted URL, fictional keyword filtering, checklist/content draft, Ads draft and bounded illustrative estimates; no crawling/account connection |
| `sales` | Disconnected channels, sample inbox/templates, behavior drafts and local handoff/review labels; no messaging |
| `crm` | Fictional list/detail, search/filter/sort, keyboard-tabbed pipeline and local stage changes, fixture timeline; no database/import/export |
| `booking` | Fixed month/week calendar, appointment/empty views, availability/reminder drafts and fixture conflict checks; no bookings/sync |
| `ecommerce` | Fictional product/search/editor/inventory/orders, local description preview and disconnected integrations; no orders/payments/stock writes |
| `automations` | Workflow drafts, connected visual nodes, inspector, required-review validation and prewritten simulated log; no actual execution |
| `analytics` | Fictional metrics, range/series filters, chart with accessible values table and disconnected sources/export; no real business analytics |
| `billing` | Existing plan concepts, comparison, usage/method/history empty states and disabled upgrade; no finalized prices, cards or checkout |
| `settings` | Profile, workspace, appearance, notifications, team/roles, security, integrations, billing entry; local drafts and disconnected account/security actions |

The shared app shell, all navigation, M6 workspace, public landing, design system, auth/onboarding demos and legal placeholders remain. Public paths retain `/KENNY/` and trailing slashes. New links resolve to prototypes; old tests retain coverage with obsolete shell/link labels updated.

## Architecture and changed files

See `docs/M7_IMPLEMENTATION.md` for the module/file map and group commits. New feature components are separated by Creative, Growth, Operations and Account; typed fixtures are centralized per group. Shared ModuleFrame, Panel, Catalog, Editor, Select/Input, Tabs, Checks, DemoDialog, Notice, Disconnected and TableWrap extend existing tokens/primitives. Pure helpers cover CRM, validation, budget/document arithmetic and fixture conflicts. Generic future service contracts have no implementation. M6's engine is not duplicated. No packages, backend providers or hosting settings changed.

## Reviewable group verification

| Group | Commands actually completed | Result |
| --- | --- | --- |
| A Creative | lint, typecheck, unit, build, targeted Chromium | Passed: 28 units, 4 browser cases |
| B Growth | lint, typecheck, unit, build, targeted Chromium | Passed: 28 units, 4 browser cases |
| C Operations | lint, typecheck, unit, build, targeted Chromium | Passed: 28 units, 4 browser cases |
| D Account | lint, typecheck, unit, build, targeted Chromium | Passed: 28 units, 2 browser cases |

Tests initially exposed ambiguous global locators (multiple status/alert regions or hidden app search input); those were scoped without deleting assertions. Early dialog-ref lint failure was corrected using normal children and event-driven close. Final cross-module QA follows below; no unrun check is described as passed.

## Full engineering checks

| Command / check | Actual result |
| --- | --- |
| `npm run lint` | Passed; includes ES-module static QA helper |
| `npm run typecheck` | Passed |
| `npm test` | 29 passed, 0 failed |
| `npm run format:check` | Passed |
| `npm run build` | Passed; preserved static routes |
| Dedicated M7 Chromium | 23 passed |
| `npm run test:browser` | 72 passed, including all 49 M1–M6 regressions and 23 M7 cases |
| Oversized document-input follow-up | Passed after bounded arithmetic guard; oversized input now shows Invalid amount |
| `KENNY_PAGES=1 npm run build` | Passed; 28 static routes generated with `/KENNY` and trailing slashes |
| Static-export smoke | Passed: 14 M7 + 11 preserved routes, representative actions/mobile navigation; zero page errors, HTTP failures or external requests |
| Public deployment verification | Pending deployment |

The full suite covers 320, 375, 430, 768, 1024, 1280, 1440 and 1920 px, both themes and reduced motion across all fourteen modules. All modules' empty/loading/error controls are checked at 320/1440; axe scans run on every module in both themes at those widths. Additional checks cover mobile dialog Escape/focus, all Settings tabs, long unbroken content, local interactions, no persistent content and no external requests. Desktop/mobile screenshots were visually inspected.

After the 72-case pass, code review reproduced an oversized document arithmetic result of `Infinity`. The helper now enforces the same quantity/amount bounds as its inputs; unit coverage includes oversized/nonfinite values. Lint/typecheck/unit/format/build were rerun; a targeted real-browser document check validates the new edge case. No unrelated source changed after the full pass. Existing Node typeless-package warnings do not fail tests.

## Honesty, privacy and service boundary

All examples are fictional DEMO, independent of customer data. No external model/API, Supabase, storage, crawler, calendar, social, store, advertising, payment or analytics connection exists. No actual upload, generation, publish, booking, invoice issuance, order, charge, workflow execution or security action is claimed. Sample previews/logs are explicitly fixed/prewritten; failed/loading/offline states are selected UI examples, never fallbacks for actual backend errors.

No customer/sensitive content enters persistent browser storage. Edits, favorites, schedule labels, stages, draft configuration, role labels and approvals stay in React memory and clear on unmount/reload. Settings tabs preserve draft state while switching. Only the existing theme preference persists. No actual tenant isolation, role enforcement, security policy or subscription entitlement is implemented. Billing requests no card details, prices/allowances are unfinalized, and credit/history data is unavailable.

Future adapters require authenticated server authorization, tenant policies, input/file validation, provider contracts, action approval enforcement, metering, auditing and reliable error handling. Fixtures must never silently replace real service failures.

## Screenshots and limitations

Screenshots and current test artifacts: `/workspace/artifacts/kenny-m7/`.

- Desktop Website Builder: `website-builder-1440-dark.png` and matching light capture.
- Desktop CRM, Automations, Analytics, Billing and Settings: respective `*-1440-dark.png` plus light captures.
- Mobile counterparts: respective `*-320-dark.png` plus light captures.
- Full 72-case run: `browser-verification.log`.
- Static Pages smoke results: `static-export-verification.json`.

Screenshots were captured from the local tested production build, not represented as live-site browser screenshots. Visual inspection included desktop website composition and mobile automation nodes/light theme. Public HTTPS and local browser verification remain separate evidence.

Physical devices, actual mobile keyboards, Safari/Firefox and manual screen-reader review are not tested. Automated axe/keyboard checks do not establish full WCAG conformance. Direct public-browser proxy certificate trust was a prior limitation; local production/static-browser and public HTTPS evidence will be reported separately. No TLS checks are disabled.

## Deployment

Not deployed yet. M7 is held locally until full QA completes. Preserve `.github/workflows/pages.yml`, static export and `/KENNY` basePath. Exact application SHA, source fingerprint, successful Actions run and public route/asset checks will be recorded after publishing. No M8 or real backend work is included.


## Environment configuration

Updated M7 startup instructions were saved as a cloud environment configuration draft. Existing installation script, repository membership, network rules and credentials were preserved. Saving this draft does not execute, activate or publish it. Review/save/publish in environment settings activates that separate configuration; GitHub Pages publication does not depend on it.

# Historical M4 acceptance

Archived after explicit user authorization for M5. This is historical evidence, not the current milestone status.

# Phase 1 acceptance — M4 authentication UI and organization onboarding

Date: 2026-10-26. Product: **Kenny AI Business Studio**. M1–M3 are preserved; M4 adds frontend-only authentication and organization onboarding. **Stop after M4; do not implement M5 without user approval.** Historical M3 results are retained in `docs/M3_ACCEPTANCE_HISTORY.md`.

## Changed files

- Auth routes: `src/app/(auth)/layout.tsx` and `src/app/(auth)/{login,signup,forgot-password,verify-email}/page.tsx`.
- Setup/legal routes: `src/app/{onboarding,terms,privacy}/page.tsx`.
- M4 styles: `src/app/account.css`, reusing the existing semantic tokens, fonts, radii and motion settings.
- Auth feature: `src/features/auth/{auth-shell,auth-form,verification-preview,legal-placeholder}.tsx`.
- Wizard: `src/features/onboarding/onboarding-wizard.tsx`.
- Shared components: existing `src/components/ui/field.tsx` extended with error association; new `password-field.tsx`.
- Landing integration: `src/components/layout/site-header.tsx` and `src/features/landing/landing-page.tsx`; all existing landing sections and exploration actions remain.
- Types/catalog/validation: `src/types/{auth,onboarding}.ts`, `src/demo/onboarding.ts`, `src/lib/{auth-validation,onboarding-validation}.ts`.
- Tests: `tests/auth-validation.test.mjs`, `tests/browser/auth-onboarding.spec.ts`, `playwright.config.ts` (new result directory only).
- Deployment: `scripts/write-deployment-metadata.mjs` now identifies M4; `scripts/verify-public-deployment.py` also checks all M4 routes. Existing Pages workflow/base path remain.
- Documentation: README, architecture, this report, `docs/M4_IMPLEMENTATION.md`, and archived M3 history.

No dependencies were added for M4. No private business data or credentials are included.

## Implemented routes

| Route                | Behavior                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/login`             | Desktop split-screen, labeled email/password, show/hide, Remember me UI, reset/registration links, local validation, pending/error/validation-complete presentation |
| `/signup`            | Name/email/password/confirmation, clear demo requirements, validation, placeholder legal links, login and verification-preview links                                |
| `/forgot-password`   | Email validation and reset explanation; explicitly no reset email sent                                                                                              |
| `/verify-email`      | Pending/expired/error preview selector; resend reports not connected/no email sent                                                                                  |
| `/onboarding`        | Eight-step organization setup, progress, Back/Next, validation, review edits and demo completion                                                                    |
| `/terms`, `/privacy` | Clearly marked legal placeholders, with return to registration                                                                                                      |

GitHub Pages uses `/KENNY/` before each route and trailing slashes. `/` and `/design-system` remain implemented. Login/Get Started navigate to `/login` and `/signup`; no authentication is needed to inspect onboarding.

## UI and data boundaries

M4 uses the existing dark/light tokens, Inter/Space Grotesk, K symbol and UI primitives. Desktop auth uses a static orbital brand panel; mobile prioritizes the form. No additional theme system or animation library was introduced. Reduced motion disables the local indicator animation through the existing policy.

Forms perform local input checks only. The short pending state is explicitly local, not a simulated backend request. Successful input checks state that no login, account creation, reset or email occurred. Passwords clear after a valid local check. No passwords, tokens, email/name/form contents or wizard data are written to localStorage/sessionStorage. Remember me is UI-only; only the existing theme preference is persisted.

Wizard steps: Welcome → Workspace name → Industry → Team size → Goals → optional AI module interests → Review → Completion preview. Required steps validate before advancing. All selections survive Back/Next and review editing. Refreshing/leaving clears this in-memory draft, with an explicit notice. Completion states that no organization was created and Supabase is not connected. Industry and module catalogs match the requested lists exactly.

## Commands and results

Required commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run format:check`, `npm run build`, `npm run test:browser`, and `KENNY_PAGES=1 npm run build`. Final outcomes and deployment evidence are recorded below after validation.

Unit suite: six preserved token/contrast tests plus six auth/onboarding validation tests. New tests reject missing inputs, weak/mismatched passwords, missing demo acknowledgement, malformed/overlong emails/names and invalid wizard choices, and permit optional module interests. Login does not impose new-password composition rules on existing passwords.

Browser suite: four preserved M3/design-system scenarios plus twelve M4 scenarios. Six widths (320, 375, 430, 768, 1024, 1440px) across all seven M4/placeholder routes; dark/light axe scans on key auth/onboarding routes; field bounds and page overflow; error summary focus; password visibility; no credential persistence or authentication POST; signup/placeholder links; disconnected reset/resend; all verification states; full wizard validation/back/next/edit/completion; optional interests; keyboard focus; landing integration.

First pass: all six responsive scenarios, initial dark/light scans, reset/verification, optional interests, landing links and M3 regressions passed. Three functional tests encountered Next.js's additional route-announcement alert, making a broad alert selector ambiguous. Validation summaries now have explicit accessible names, and tests target those names. A radio aria-invalid lint warning was resolved by associating the group error with its fieldset. No assertions or accessibility rules were disabled.

## Screenshots and review instructions

Open `/login`, `/signup`, `/forgot-password`, `/verify-email` and `/onboarding` using the deployed website, or use the normal dev server documented in README. Use disposable/sample inputs. Verification has an explicitly labeled state selector. Onboarding needs no login; review eight steps, Back, optional modules and Edit controls.

Screenshots under `/workspace/artifacts/kenny-m4/`: auth, onboarding and legal pages at 375px and 1440px; key pages in light theme; verification states; wizard review and completion. Existing M3 screenshots remain under `/workspace/artifacts/kenny-m3/`. Browser traces/results go to `/workspace/artifacts/kenny-m4/test-results`.

## Known limitations

Frontend only. No real authentication, Supabase, session persistence, authorization/RLS, verification tokens/emails, reset service, organization creation, invitations, payments or AI execution. Client validation is not a security guarantee. Legal pages are placeholders, not production policies. The wizard intentionally loses data when refreshed or left.

Chromium automation does not establish full WCAG conformance. Safari/Firefox, physical devices, manual screen readers and measured Core Web Vitals remain untested. CI runs its existing lint/typecheck/unit/build gates; local Chromium browser checks are separate.

The cloud network initially blocked the public Pages hostname; direct verified HTTPS requests became available during final checks. Public HTTP evidence is recorded below separately from local browser coverage.

## Final validation and deployment evidence

| Check                      | Final result                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| ESLint                     | Passed, no lint warnings                                                                                  |
| Strict TypeScript          | Passed                                                                                                    |
| Unit tests                 | 12 passed; zero failed/skipped                                                                            |
| Formatting                 | Passed                                                                                                    |
| Normal production build    | Passed; all routes prerendered                                                                            |
| Chromium suite             | 16 passed; zero failed/skipped                                                                            |
| Pages static export        | Passed with `/KENNY` base path and trailing slashes                                                       |
| Static-host Chromium smoke | Passed for landing, design system and all seven M4/legal routes; no failed assets or uncaught page errors |
| Deployment helpers         | JavaScript/Python syntax checks passed                                                                    |

Static-host smoke additionally exercised the mobile Login link, auth-to-onboarding navigation, local checking/disabled/aria-busy/status presentation using a controlled browser clock, and initial wizard transitions. This verified the pending state without representing an authentication network call. Screenshots were visually inspected for auth split-screen hierarchy, mobile wizard spacing, light theme and completion disclosure.

No dependencies were changed. Node emits an informational module-format warning when directly running TypeScript validation helpers in the unit runner; all tests execute and pass. No warning suppression was added.

Deployment is performed by the preserved GitHub Actions workflow on `main`. The final delivery identifies its actual deployed commit/run. `/KENNY/deployment.json` contains the exact CI SHA/source fingerprint and M4 milestone. API deployment success is distinct from direct public HTTP and browser evidence. The direct public HTTP checks completed below; public Chromium encountered a trust-store limitation. No M5 work is included.

## Verified M4 application release

- Application commit: `d6b93597b824758dcddc13c71c5e22783438de4f`; repository `fnfmobilitymy-boop/KENNY`; branch `main`.
- Source tree: `87ce5e45781a324c74360b87b0b7dc6f70ef3ae2`.
- Actions run `40285425010`: build and deploy jobs **success**. Pages deployment `7326283108` names the same SHA.
- Public URL: `https://fnfmobilitymy-boop.github.io/KENNY/`.
- `python3 scripts/verify-public-deployment.py d6b93597b824758dcddc13c71c5e22783438de4f` passed against the actual public HTTPS host, with TLS verification enabled and the configured proxy retained.
- Public `deployment.json` identified M4, the exact commit, repository, branch and matching application source-tree fingerprint.
- Normal and cache-busted public landing HTML were byte-identical. SHA-256: `75941afd33a0e0a59ee810a9cef3a22c3f453b04317c3b45a2f6048ee382e22d`. The complete M3 landing sections remained present, with no obsolete foundation marker.
- All seven M4/legal routes plus the design-system route returned HTTP 200 with expected content. Eleven referenced assets returned HTTP 200 with `/KENNY/_next/` paths.
- Headers: `Cache-Control: max-age=600`, observed `Age: 0`. The response contained the current release; no stale-root discrepancy was observed in this check. Individual user-browser caches are not remotely inspectable.
- Public response evidence: `/workspace/artifacts/kenny-m4/public-verification.json`. The same verifier also passed against the local static export and confirmed its revision metadata.

A separate public-host Chromium attempt failed at TLS trust validation (`ERR_CERT_AUTHORITY_INVALID`) because Chromium did not trust the cloud proxy CA in that browser context. Certificate verification was not disabled. Public browser interactions therefore remain **unverified**, while public HTTPS content/assets/routes and all 16 local production-browser scenarios are verified. This is an execution-environment browser trust limitation, not evidence of a website certificate defect.

Documentation-only follow-up revisions may change the deployment SHA without changing the tested application tree. The final delivery reports the latest deployment SHA/run; public `deployment.json` is the revision source of truth. **No M5 work is included.**

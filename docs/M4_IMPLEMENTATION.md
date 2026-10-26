# M4 — Authentication UI and organization onboarding

## Scope and preservation

The clean starting revision was `665ee33b59df8cb74ab6176bc77f9e1b0edc7454`. The existing M3 landing, K brand mark, fonts, tokens, reduced-motion behavior, M2 showcase, tests and Pages workflow remain. New landing Login/Get Started links navigate to implemented UI routes; the original concept-exploration CTA and all landing sections remain.

The user explicitly authorized M4 after the earlier public-M3 audit. No M5 dashboard implementation is included. The landing dashboard illustration remains a marketing preview.

## Routes and architecture

- `src/app/(auth)`: server-rendered auth layout with `/login`, `/signup`, `/forgot-password` and `/verify-email`; route grouping does not change URLs.
- `src/features/auth`: server auth shell plus small client form/verification components. Legal placeholders are server-rendered and shared by `/terms` and `/privacy`.
- `/onboarding`: server header wrapping the client wizard in `src/features/onboarding`.
- `src/components/ui`: existing Field/Button/ButtonLink extended with error descriptions and shared PasswordField.
- `src/demo/onboarding.ts`: supported option catalog, not production business records.
- `src/types/{auth,onboarding}.ts`: typed in-memory form and organization draft contracts.
- `src/lib/*-validation.ts`: pure format/selection validation. No API calls or authentication assumptions.
- `src/app/account.css`: M4 layouts using existing semantic tokens; no second theme or font system.

## Data honesty

Auth submits perform client-side input checks only. The 220ms pending-state demonstration is labeled as local checking, not an authentication request. Valid input produces a validation-only status that explicitly says no login/account/email happened. Password values are cleared after a valid check. Password input, name, email, selections and Remember me are never persisted to browser storage. The existing theme preference remains the only application localStorage use.

Login does not impose new-password rules on existing password input. Signup's local demo rule requires 12 characters with uppercase, lowercase and a number; this is not represented as a production security guarantee. Terms and Privacy routes clearly state that legal text is a placeholder. The checkbox acknowledges the demo, rather than claiming acceptance of final terms.

Verification Pending/Expired/Error are explicitly selectable UI previews. Resend reports that no email was sent. No verification token is read. Organization completion states that Supabase is not connected and no server-side workspace exists.

## Wizard behavior

Eight steps: Welcome, Workspace, Industry, Team size, Goals, optional Module interests, Review, Completion preview. Required inputs validate before Next. Review validates the whole draft. Back, previous-step controls and Edit preserve the in-memory draft. Step changes focus the new heading; errors focus an announced summary. Native radio/select/checkbox controls support keyboard interaction. Refreshing/leaving clears the draft, with a visible warning.

Industries and module interests match the user's catalog. Optional Other description and optional module selection are clearly labeled. No invitation, activation, file upload, session, billing or organization service is connected.

## Validation and review

See `PHASE_1_ACCEPTANCE.md` for command outcomes and limitations. Review `/login`, `/signup`, `/forgot-password`, `/verify-email` and `/onboarding` in both themes. Test the wizard with sample information. Stop after M4 for user design/interaction approval before M5.

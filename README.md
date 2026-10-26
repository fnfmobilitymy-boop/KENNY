# Kenny AI Business Studio

Next.js App Router + React + strict TypeScript frontend. M1–M3 and M4 authentication/organization setup UI are implemented. **Stop after M4; M5 requires user review.** No authentication, AI, payments or backend service is connected.

## Run locally

Validated toolchain: Node.js 24.19.0 / npm 11.9.0. Use the existing checkout; do not create a Git worktree unless explicitly requested.

```sh
cd /workspace/KENNY
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

## Implemented routes

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

Use a normal production build before browser tests or `npm run start`. Playwright starts an isolated production server on port 3100; do not reuse a stale server while rebuilding. Chromium defaults to `/usr/bin/chromium`; override `CHROMIUM_PATH` on other machines. Missing browsers must be reported as an unrun check. Screenshots are in `/workspace/artifacts/kenny-m4/`; browser traces/results are under its `test-results/` directory. The preserved M3 suite writes landing screenshots to `/workspace/artifacts/kenny-m3/`.

M4 browser coverage includes 320, 375, 430, 768, 1024 and 1440px, local validation, password visibility, disconnected-action feedback, verification states, wizard forward/backward/review editing, optional interests, theme rendering and accessibility scans. Unit tests exercise format/selection validation and both-theme contrast.

## Demo boundaries and privacy

Use sample information and a disposable demo password. No form action sends an authentication request or creates an account/organization. “Remember me” is UI-only. No password, token, email, name or wizard data is written to localStorage/sessionStorage. Only the pre-existing theme preference is stored. Passwords clear after a valid local form check. Wizard choices remain in memory while moving between steps; refreshing/leaving clears them. Completion is explicitly a preview, not server-side creation.

Terms/Privacy are navigation placeholders. Supabase, sessions, verification emails, password resets, authorization, RLS, organization membership and billing enforcement remain later backend work. Do not treat frontend validation as a security boundary.

## Structure

Routes and static layouts live in `src/app`; shared brand/UI/layout components in `src/components`; auth/onboarding/landing features in `src/features`; semantic tokens in `src/design-tokens`; demo catalogs in `src/demo`; types in `src/types`; pure validation in `src/lib`; future adapters in `src/services`. M4 reuses Inter, Space Grotesk, dark/light themes, native form controls and the existing primitives. No animation framework or runtime font CDN was added.

## GitHub Pages deployment

[Website](https://fnfmobilitymy-boop.github.io/KENNY/) · [Login](https://fnfmobilitymy-boop.github.io/KENNY/login/) · [Onboarding](https://fnfmobilitymy-boop.github.io/KENNY/onboarding/)

The preserved workflow deploys `main` from `fnfmobilitymy-boop/KENNY`. `KENNY_PAGES=1 npm run build` generates static `out/` with `/KENNY` base path. The workflow writes `deployment.json` identifying its exact SHA, application source tree and M4 milestone before artifact upload. Inspect that marker and the successful Actions run rather than assuming an existing URL serves the latest code.

```sh
python3 scripts/verify-public-deployment.py <full-successful-deployment-sha>
```

The verifier checks the M3 landing, M4 routes, static assets, cache-busted responses and exact revision metadata through the configured HTTPS proxy. Direct public-host checks require `fnfmobilitymy-boop.github.io` to be allowed in the environment network settings. A pending allowlist draft does not establish public verification. Deployment API evidence, local static-browser checks and actual public HTTP checks are reported separately in the acceptance report.

See [M4 implementation](docs/M4_IMPLEMENTATION.md), [acceptance results](PHASE_1_ACCEPTANCE.md), [architecture](docs/ARCHITECTURE.md), [historical M3 audit](docs/M3_DEPLOYMENT_AUDIT.md), and [backend requirements](src/services/README.md).

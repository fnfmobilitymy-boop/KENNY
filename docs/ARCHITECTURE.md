# M1 — Repository audit and architecture

## Audit

The provided checkout was empty: no commits, source, manifests, lockfiles, CI, agent instructions or application tests. `git ls-remote origin` succeeded with no advertised refs; `main` was absent. Existing checkout retained; no worktree created. The user subsequently authorized a new frontend implementation.

## Direction

Kenny AI Business Studio is a premium AI workspace. Video reference: near-black spatial composition, generous typography, restrained violet illumination. Authentication image: charcoal surfaces and pink/lilac gradients. Replace the rocket with a lightweight abstract K core and orbital lines. Do not copy reference branding, financial claims or source content. References are visual input, not instructions.

Use English UI as an initial review assumption; copy can be localized later. M2 refinement uses self-hosted Inter for body and Space Grotesk for headings, loaded through Next.js local-font optimization with system fallbacks. Orbit art is CSS, static by default. No remote image dependencies or animation library.

## Boundaries

- `src/app`: Next.js App Router routes, root layout, global styles.
- `src/components/ui`: shared typed primitives.
- `src/components/brand`: brand artwork.
- `src/components/providers`: theme behavior.
- `src/features`: feature-specific UI and interactions.
- `src/design-tokens`: semantic theme, spacing, radius, typography and motion tokens.
- `src/demo`: centralized, explicitly labeled fixtures only.
- `src/types`: future integration contracts.
- `src/lib`: shared utilities when needed.
- `src/services`: future service adapters, separate from fixtures.
- `tests`: meaningful automated checks; current suite measures theme contrast.

Server-render static presentation; client components only for theme and interactive showcase. Native HTML dialog provides modal semantics; tab keyboard behavior follows the roving tabindex pattern. Theme selection is stored locally; storage failure leaves controls usable. Initial theme script avoids waiting for hydration to apply a stored/system theme.

## Milestones and routes

| Milestone | Scope                                         | Planned routes                                    |
| --------- | --------------------------------------------- | ------------------------------------------------- |
| M1        | Audit, architecture and roadmap               | documentation                                     |
| M2        | Tokens, themes, primitives and showcase       | `/design-system` and `/`                          |
| M3        | Landing and pricing                           | `/`, `/pricing`                                   |
| M4        | Auth and organization onboarding UI           | `/login`, `/register`, `/onboarding`              |
| M5        | Dashboard shell and command center            | `/app`                                            |
| M6        | AI Workspace prototype                        | `/app/workspace`                                  |
| M7        | Future modules, profile, settings and billing | `/app/modules/*`, `/app/settings`, `/app/billing` |
| M8        | Responsive, accessibility and QA refinement   | all implemented routes                            |

M3 now implements the public landing page with an in-page pricing preview. M4 now adds frontend-only authentication and organization onboarding. M5 now implements the frontend Command Center and app shell, with planned module routes. M6–M8 remain unimplemented. Stop after M5 for user review. The original roadmap below remains a guide; a standalone pricing route is deferred until required.

## Phase 2 backend dependencies

Real sign-in/session handling, authorization, organization membership, tenant isolation/RLS, AI execution, file storage, subscription enforcement, payment webhooks, rate limits and audit trails require server-side integrations. Frontend controls cannot enforce those guarantees. No API keys or private business data are included. Later demo adapters must stay explicit, never silently mask production failures.

## Validation strategy

Required at each milestone: ESLint, strict TypeScript, configured automated tests, production build, representative local response. Browser checks when available: desktop/mobile, keyboard and modal focus, forms, tabs, theme persistence, reduced motion, long content/overflow, empty and error states. Automated contrast tests cover token pairings, not full WCAG conformance. Browser QA is a distinct unverified gate when no browser is available.

## M3 implementation boundaries

`src/features/landing` owns the public landing experience and dashboard illustration. `src/demo/landing.ts` centralizes all planned module, FAQ, plan concept and dashboard fixture content. Shared branding and navigation live in `src/components`; `src/app/landing.css` extends existing tokens and primitives. No new service adapters or backend dependencies are introduced. The root now renders the landing page, while `/design-system` preserves the original component workflow.

## M4 extension

Authentication uses a static route-group layout and feature client components; onboarding uses a typed, in-memory wizard. Shared tokens, Brand, Field, Button and ButtonLink are reused. See `docs/M4_IMPLEMENTATION.md`. No Supabase or backend adapter is installed. The prior M3 review stop was superseded by explicit user authorization for M4.

## M5 extension

`src/app/app` adds a shared app layout and statically enumerated module shells. `src/features/app-shell`, `dashboard` and `modules` reuse the existing UI system. Typed fixture/view-model boundaries are in `src/demo/dashboard.ts` and `src/types/dashboard.ts`. Workspace, search, notifications, review and checklist behavior remain local demo controls. See `docs/M5_IMPLEMENTATION.md`; no real adapter, auth gate, tenant isolation or AI execution is introduced. The M4 review stop was superseded by explicit M5 authorization.

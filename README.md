# KENNY · Phase 1

A Next.js App Router + React + strict TypeScript foundation for a futuristic AI SaaS frontend. M1 and M2 are implemented for review. M3 onwards awaits approval.

## Run

Requires Node.js 24 (validated with 24.19.0) and npm 11. Use this existing checkout; no additional Git worktree is needed.

```sh
cd /workspace/KENNY
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

The default port is 3000. `/` and `/design-system` show the foundation review page. It is not the final landing page. No credentials, database or external services are required for this milestone.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

For onboarding smoke validation, start the production server and request `/design-system` locally. Assert HTTP 200 and the expected page heading. Processes must be restarted in new tasks; installed dependencies and build outputs may be retained in the environment snapshot. Do not assume a live service survives publication.

## M2 features

Dark/light semantic tokens, fluid typography, CSS K core/orbit brand concept, shared buttons/cards/labeled inputs, native accessible dialog, keyboard tabs, demo feedback and skeleton/empty examples. Reduced motion disables transitions; slow-update devices use static effects. No continuously animated cards or heavy visual dependencies.

Component examples are centralized in `src/demo`. Demo actions and forms are explicitly labeled; nothing creates an account, calls AI or bills a customer. Service interfaces in `src/types/services.ts` describe future integrations without pretending they exist.

See [architecture and milestone plan](docs/ARCHITECTURE.md), [design tokens](src/design-tokens/tokens.css), [acceptance results](PHASE_1_ACCEPTANCE.md) and [backend dependencies](src/services/README.md).

## Limits

Only `/design-system` is implemented. Authentication reference styling is reserved for M4. Automated checks do not establish browser accessibility or Core Web Vitals. Visual, keyboard and device verification remains required before acceptance.

## GitHub Pages preview

The repository includes `.github/workflows/pages.yml`. Once these files are pushed to `main`, select **Settings → Pages → Source → GitHub Actions** in GitHub. A successful workflow deployment produces the public preview URL; no deployment has been verified yet.

`KENNY_PAGES=1 npm run build` creates a static export in `out/`, with `/KENNY` as the base path. Normal builds remain compatible with `npm run start`. The static preview includes only M1/M2; it does not add authentication or backend services. GitHub Pages availability depends on repository visibility and plan.

# Kenny AI Business Studio

A Next.js App Router + React + strict TypeScript frontend. M1, refined M2 and the M3 landing page are implemented for review. Stop before M4.

## Local development

Validated toolchain: Node.js 24.19.0 / npm 11.9.0. Use the existing checkout; do not create a Git worktree unless explicitly requested.

```sh
cd /workspace/KENNY
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

## Routes

| Route            | Content                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `/`              | M3 public landing page: orb, product illustration, planned modules, process, use cases, pricing preview, FAQ |
| `/design-system` | Preserved and refined M2 component showcase, themes, form, modal and keyboard tabs                           |

Landing CTAs navigate to implemented sections or the design system. No dead sign-up, login or checkout actions. The interactive dashboard is a marketing illustration, not an implemented M5 dashboard.

## Quality checks

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm run test:browser
```

Browser tests use the **production build**, start their own server on port 3100, and use system Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` if installed elsewhere. On a machine without Chromium, install a supported browser or report browser checks as pending; do not treat a missing browser as a pass. Run the build before browser tests. Test results and screenshots go outside the checkout at `/workspace/artifacts/kenny-m3/`.

For production startup use `npm run start` after a normal build. Servers must restart in new tasks; processes do not survive snapshots reliably.

## Preview deployment

[GitHub Pages preview](https://fnfmobilitymy-boop.github.io/KENNY/)

The existing `.github/workflows/pages.yml` runs lint, typecheck, unit tests and a Pages production build on pushes to `main`. GitHub Pages uses GitHub Actions as its source. `KENNY_PAGES=1 npm run build` exports to `out/` with `/KENNY` base path and trailing slashes. Use a normal build before `npm run start`; a static export is served by the Pages host instead.

The workflow does not run local browser tests because it does not install system Chromium; browser checks are run separately in the development environment. Verify the deployment run status before assuming a pushed change is live.

## Structure and data honesty

- `src/app`: routes, root layout and styles.
- `src/components`: shared UI, brand, layout and theme behavior.
- `src/features`: landing and design-system features.
- `src/design-tokens`: semantic colors, typography, motion and sizing.
- `src/demo`: explicitly marked presentation fixtures.
- `src/types`, `src/services`, `src/lib`: future typed integration contracts, adapters and utilities.

Static page sections are server components. Small client components handle navigation, theme, preview tabs and motion control. The orb is CSS artwork with finite motion, pause control and reduced-motion/slow-device overrides. No animation library, WebGL or runtime image downloads are required. Fonts are self-hosted and preloaded through Next.js local-font optimization with metric-adjusted fallbacks.

All module capabilities are planned; demo figures and statuses are clearly labeled. Prices and usage limits are not finalized. No account creation, AI execution, payment, file storage or tenant isolation is implemented. See [backend requirements](src/services/README.md), [architecture](docs/ARCHITECTURE.md), [M2 refinement](docs/M2_REFINEMENT.md) and [acceptance report](PHASE_1_ACCEPTANCE.md).

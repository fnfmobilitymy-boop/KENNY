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

## M3 public-deployment audit

The tested M3 application commit is `9a7c5e9fe0c9375b636264b517f3efc7fb514559` on `fnfmobilitymy-boop/KENNY`, branch `main`. Actions run [40281440728](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40281440728) completed build and deploy successfully. Pages deployment `7325739329` records that same SHA and the preview URL above. The M3 application source tree is `b97402260786cbc958a390323fff991cd73dbbd4`.

These GitHub records and the earlier local static-host/browser checks do **not** by themselves prove the response currently served to a public browser. The latest audit initially could not fetch the public URL because the cloud HTTPS proxy denied the `fnfmobilitymy-boop.github.io` destination. The required domain has been saved in the environment configuration draft; public HTML, cache and asset checks remain pending until that network change is applied. The cause of the user's old-page observation is not established.

New deployments write `/KENNY/deployment.json` from the CI commit SHA, so future checks can identify the exact build. This metadata is a revision aid, not a security guarantee. After a successful deployment and with the public host allowed, run:

```sh
python3 scripts/verify-public-deployment.py <full-deployed-commit-sha>
```

The check compares normal/cache-busted HTML, verifies the complete M3 section set, rejects the obsolete M2 marker, checks `/KENNY/_next/` assets and the design-system route, and verifies the public revision metadata. It preserves TLS verification and uses the configured proxy. For browser-cache diagnosis, use a fresh private window and compare the same URL; do not assume a hard refresh resolves a deployment defect. No service worker is registered by this application.

**M4 remains blocked on public M3 verification and user review.**

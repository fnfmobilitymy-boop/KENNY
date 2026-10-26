# Historical M3 deployment audit

This records the earlier M3 investigation; it is not the current milestone status. The user subsequently authorized M4.

## M3 public-deployment audit

The tested M3 application commit is `9a7c5e9fe0c9375b636264b517f3efc7fb514559` on `fnfmobilitymy-boop/KENNY`, branch `main`. Actions run [40281440728](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40281440728) completed build and deploy successfully. Pages deployment `7325739329` records that same SHA and the preview URL above. The M3 application source tree is `b97402260786cbc958a390323fff991cd73dbbd4`.

These GitHub records and the earlier local static-host/browser checks do **not** by themselves prove the response currently served to a public browser. The latest audit initially could not fetch the public URL because the cloud HTTPS proxy denied the `fnfmobilitymy-boop.github.io` destination. The required domain has been saved in the environment configuration draft; public HTML, cache and asset checks remain pending until that network change is applied. The cause of the user's old-page observation is not established.

New deployments write `/KENNY/deployment.json` from the CI commit SHA, so future checks can identify the exact build. This metadata is a revision aid, not a security guarantee. After a successful deployment and with the public host allowed, run:

```sh
python3 scripts/verify-public-deployment.py <full-deployed-commit-sha>
```

The check compares normal/cache-busted HTML, verifies the complete M3 section set, rejects the obsolete M2 marker, checks `/KENNY/_next/` assets and the design-system route, and verifies the public revision metadata. It preserves TLS verification and uses the configured proxy. For browser-cache diagnosis, use a fresh private window and compare the same URL; do not assume a hard refresh resolves a deployment defect. No service worker is registered by this application.

**M4 remains blocked on public M3 verification and user review.**

### Verification deployment result

The revision-metadata/audit release `85b219c460a5e82cec3624a9a5a9f00848855ea6` completed successfully in [Actions run 40282247615](https://github.com/fnfmobilitymy-boop/KENNY/actions/runs/40282247615), Pages deployment `7325845967`. Its application source, public files, configuration, dependency files and tests are identical to the tested M3 commit above. A subsequent public URL retry still failed at the cloud proxy CONNECT stage, before contacting Pages. Public content/caching verification remains blocked, not passed. Documentation-only follow-up commits may update the release SHA; use the latest successful Pages record and public `deployment.json` when access is restored.

import test from "node:test";
import assert from "node:assert/strict";
import { searchPages, normalizeAppPath } from "../src/lib/app-navigation.ts";
import {
  plannedModules,
  demoTasks,
  demoApprovals,
  demoProjects,
  demoWorkspaces,
} from "../src/demo/dashboard.ts";
const entries = plannedModules.map((m) => ({
  name: m.name,
  href: `/app/${m.slug}`,
  description: m.description,
  group: m.group,
}));
test("module catalog has the requested static routes and every fixture points to one", () => {
  const expected = [
    "workspace",
    "website-builder",
    "image-studio",
    "video-studio",
    "marketing",
    "seo-ads",
    "sales",
    "crm",
    "documents",
    "booking",
    "ecommerce",
    "automations",
    "analytics",
    "billing",
    "settings",
  ];
  assert.deepEqual(plannedModules.map((m) => m.slug).sort(), expected.sort());
  assert.equal(new Set(plannedModules.map((m) => m.slug)).size, 15);
  for (const row of [...demoTasks, ...demoApprovals, ...demoProjects])
    assert.ok(expected.includes(row.module), row.module);
  assert.equal(demoWorkspaces.filter((w) => w.empty).length, 1);
});
test("page search combines case-insensitive terms and groups and handles no results", () => {
  assert.equal(
    searchPages("  WEBSITE   BUILD ", entries)[0].href,
    "/app/website-builder",
  );
  assert.equal(
    searchPages("create image", entries)[0].href,
    "/app/image-studio",
  );
  assert.deepEqual(searchPages("unavailable-module-xyz", entries), []);
  assert.equal(searchPages("   ", entries).length, 15);
});
test("active navigation normalizes Pages base paths and trailing slashes without matching unrelated routes", () => {
  assert.equal(normalizeAppPath("/KENNY/app/workspace/"), "/app/workspace");
  assert.equal(normalizeAppPath("/app/"), "/app");
  assert.equal(normalizeAppPath("/KENNY-other/app/"), "/KENNY-other/app");
  assert.notEqual(
    normalizeAppPath("/app/website-builder"),
    normalizeAppPath("/app/workspace"),
  );
});

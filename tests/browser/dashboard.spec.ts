import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const artifacts = "/workspace/artifacts/kenny-m5";
const slugs = [
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
for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920])
  test(`dashboard layout, themes and accessibility at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/app");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "A little clarity.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator(
          ".app-topbar button,.app-topbar .app-dropdown-trigger,.metric-card,.card,.quick-action-card",
        )
        .evaluateAll((els) =>
          els
            .filter((el) => el.getClientRects().length)
            .every((el) => {
              const r = el.getBoundingClientRect();
              return r.left >= -1 && r.right <= innerWidth + 1;
            }),
        ),
    ).toBe(true);
    await expect(
      page.getByText("No AI agents are running.", { exact: false }),
    ).toBeVisible();
    for (const theme of ["dark", "light"]) {
      if (theme === "light")
        await page
          .getByRole("button", { name: "Switch to light theme" })
          .click();
      if ([320, 768, 1440, 1920].includes(width)) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(result.violations).toEqual([]);
      }
      if ([375, 1440, 1920].includes(width))
        await page.screenshot({
          path: `${artifacts}/dashboard-${width}-${theme}.png`,
          fullPage: true,
          animations: "disabled",
        });
    }
    if (width === 320) {
      await page
        .locator(".dashboard-header h1")
        .evaluate(
          (el) =>
            (el.textContent =
              "A long workspace headline that should wrap thoughtfully on a very small device"),
        );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });

test("desktop sidebar collapse persists across routes, every planned route resolves and active links match", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app");
  await page
    .getByRole("button", { name: "Collapse sidebar", exact: true })
    .click();
  await expect(page.locator(".app-shell")).toHaveAttribute(
    "data-collapsed",
    "true",
  );
  await page
    .getByRole("navigation", { name: "Studio navigation" })
    .getByRole("link", { name: "AI Workspace · Demo", exact: true })
    .click();
  await expect(page).toHaveURL(/\/app\/workspace$/);
  await expect(
    page.getByRole("button", { name: "Expand sidebar" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand sidebar" }).click();
  for (const slug of slugs) {
    const response = await page.goto(`/app/${slug}`);
    expect(response?.status()).toBe(200);
    if (slug === "workspace")
      await expect(
        page.getByRole("heading", { name: "AI Workspace", exact: true }),
      ).toBeVisible();
    else
      await expect(
        page.getByText("DEMO · Frontend prototype", { exact: true }),
      ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Studio navigation" })
        .locator('[aria-current="page"]'),
    ).toHaveAttribute("href", `/app/${slug}`);
  }
  await page.setViewportSize({ width: 320, height: 850 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `${artifacts}/module-mobile.png`,
    fullPage: true,
  });
});

test("mobile drawer supports Escape, focus containment, navigation and expanded state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/app");
  const open = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await open.click();
  const drawer = page.getByRole("dialog", { name: "Studio navigation drawer" });
  await expect(drawer).toBeVisible();
  await expect(open).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Shift+Tab");
  expect(
    await drawer.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
  await expect(open).toHaveAttribute("aria-expanded", "false");
  await open.click();
  await drawer
    .getByRole("link", { name: "AI Image Studio · Demo", exact: true })
    .click();
  await expect(page).toHaveURL(/\/app\/image-studio$/);
  await expect(drawer).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AI Image Studio", exact: true }),
  ).toBeVisible();
});

test("workspace menu keyboard behavior, empty demo data and memory-only switching", async ({
  page,
}) => {
  await page.goto("/app");
  const trigger = page.getByRole("button", { name: /Switch demo workspace/ });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("option", { name: /Blank workspace/ }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".dashboard-intro")).toContainText(
    "Blank workspace",
  );
  await expect(
    page.getByText("Nothing waiting for review.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".metric-card").first()).toContainText("00");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("option", { name: /Kenny Studio/ }).click();
  await expect(page.locator(".dashboard-intro")).toContainText("Kenny Studio");
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toMatch(/kenny-demo|blank-demo/);
});

test("global command search shortcut, keyboard results, no-results state and planned module navigation", async ({
  page,
}) => {
  await page.goto("/app");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Search your studio." });
  await expect(dialog).toBeVisible();
  const input = page.getByRole("searchbox", { name: "Find a page or module" });
  await expect(input).toBeFocused();
  await input.fill("no-such-module-xyz");
  await expect(
    page.getByRole("heading", { name: "No matching pages." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await input.fill("image");
  await input.press("ArrowDown");
  await expect(
    dialog.getByRole("link", { name: /AI Image Studio/ }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/app\/image-studio$/);
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Search pages and modules" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Search pages and modules" }),
  ).toBeFocused();
});

test("notification/user menus close correctly and never imply a signed-in session", async ({
  page,
}) => {
  await page.goto("/app");
  const notifications = page.getByRole("button", {
    name: "Notifications",
    exact: true,
  });
  await notifications.click();
  const menu = page.getByRole("menu", { name: "Notifications" });
  await expect(menu).toContainText("No live notifications");
  await page.keyboard.press("End");
  await expect(
    menu.getByRole("menuitem", { name: "Clear preview notifications" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await notifications.click();
  await expect(menu).toContainText("No demo notifications");
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menu).not.toBeVisible();
  await page.getByRole("button", { name: "Demo visitor menu" }).click();
  await expect(
    page.getByRole("menu", { name: "Demo visitor menu" }),
  ).toContainText("No signed-in session");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Demo visitor menu" }),
  ).toBeFocused();
});

test("approval preview and checklist operate locally; loading/error previews are explicit and recoverable", async ({
  page,
}) => {
  await page.goto("/app");
  await page
    .getByRole("button", { name: "Inspect preview", exact: true })
    .first()
    .click();
  const dialog = page.getByRole("dialog", { name: "Campaign brief concept" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("No real approval or task is updated");
  await page.getByRole("button", { name: "Mark reviewed · Demo" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View preview", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Review your organization blueprint" })
    .check();
  await expect(
    page.getByRole("status").filter({ hasText: "1 of 3 explored" }),
  ).toBeVisible();
  await page
    .getByLabel("Preview state", { exact: true })
    .selectOption("loading");
  await expect(
    page.getByRole("status", { name: /Loading layout preview/ }),
  ).toBeVisible();
  await page.screenshot({
    path: `${artifacts}/loading-preview.png`,
    fullPage: true,
  });
  await page.getByLabel("Preview state", { exact: true }).selectOption("error");
  await expect(
    page.getByRole("alert", { name: "Dashboard error preview" }),
  ).toContainText("No service request failed");
  await page.getByRole("button", { name: "Return to demo data" }).click();
  await expect(page.locator(".tools-overview")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("checkbox", { name: "Review your organization blueprint" }),
  ).not.toBeChecked();
  await expect(
    page.getByRole("button", { name: "Inspect preview", exact: true }),
  ).toHaveCount(2);
});

test("dashboard overlays, empty and error states pass accessibility checks", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/app");
  await page.getByRole("button", { name: "Search pages and modules" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Inspect preview", exact: true })
    .first()
    .click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /Switch demo workspace/ }).click();
  await page.getByRole("option", { name: /Blank workspace/ }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByLabel("Preview state", { exact: true }).selectOption("error");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("small-screen menus stay within the viewport and expose their full content", async ({
  page,
}) => {
  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/app");
    for (const name of [
      /Switch demo workspace/,
      /^Notifications$/,
      /Demo visitor menu/,
    ]) {
      await page.getByRole("button", { name }).click();
      const panel = page.locator(".app-dropdown-panel");
      await expect(panel).toBeVisible();
      expect(
        await panel.evaluate((el) => {
          const r = el.getBoundingClientRect();
          return r.left >= 0 && r.right <= innerWidth;
        }),
      ).toBe(true);
      await page.keyboard.press("Escape");
    }
  }
});

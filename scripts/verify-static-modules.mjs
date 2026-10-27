/** Internal QA only: serve a fresh Pages export at the supplied /KENNY/ URL first. */
import { chromium, expect } from "@playwright/test";
const root = process.argv[2] || "http://127.0.0.1:3104/KENNY/";
const slugs = [
  "website-builder",
  "image-studio",
  "video-studio",
  "documents",
  "marketing",
  "seo-ads",
  "sales",
  "crm",
  "booking",
  "ecommerce",
  "automations",
  "analytics",
  "billing",
  "settings",
];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    env: {
      ...process.env,
      XDG_CONFIG_HOME: "/tmp/kenny-browser-config",
      XDG_CACHE_HOME: "/tmp/kenny-browser-cache",
    },
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      colorScheme: "dark",
      reducedMotion: "reduce",
    });
    const errors = [],
      failed = [],
      external = [];
    const origin = new URL(root).origin;
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== origin) external.push(r.url());
    });
    for (const slug of slugs) {
      const response = await page.goto(root + `app/${slug}/`);
      expect(response.status()).toBe(200);
      await expect(page.locator(`[data-module="${slug}"] h1`)).toBeVisible();
      await expect(
        page.getByText("DEMO · Frontend prototype", { exact: true }),
      ).toBeVisible();
      const hrefs = await page
        .locator(".module-related a")
        .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
      expect(hrefs.every((h) => h.startsWith("/KENNY/app"))).toBe(true);
    }
    await page.goto(root + "app/website-builder/");
    await page
      .getByLabel("Preview viewport", { exact: true })
      .selectOption("Mobile");
    await expect(page.locator(".website-preview")).toHaveAttribute(
      "data-viewport",
      "Mobile",
    );
    await page
      .getByRole("button", { name: "New project demo", exact: true })
      .click();
    const project = page.getByRole("dialog", { name: "Name a local concept" });
    await project.getByLabel("Project name").fill("Static export concept");
    await project
      .getByRole("button", { name: "Add local concept", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "A new concept, ready for direction.",
      }),
    ).toBeVisible();
    await page.goto(root + "app/image-studio/");
    await page
      .getByRole("button", { name: "Add local favorite", exact: true })
      .click();
    await page
      .getByLabel("Gallery filter", { exact: true })
      .selectOption("Favorites");
    await expect(page.locator(".image-tile")).toHaveCount(1);
    await page.goto(root + "app/documents/");
    await page
      .getByLabel("Document subject", { exact: true })
      .fill("Static export local draft");
    await expect(
      page.getByRole("article", { name: "Local document preview" }),
    ).toContainText("Static export local draft");
    await page.goto(root + "app/marketing/");
    await page
      .getByRole("button", { name: "Preview local schedule", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Apply local schedule label", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "Not scheduled on any service",
    );
    await page.goto(root + "app/crm/");
    await page
      .getByLabel("Selected lead stage", { exact: true })
      .selectOption("Proposal");
    await expect(page.getByRole("status")).toContainText("No record was saved");
    await page.goto(root + "app/automations/");
    await page
      .getByRole("button", { name: "Show sample log · Demo only", exact: true })
      .click();
    await expect(
      page.getByRole("region", { name: "Sample execution log" }),
    ).toContainText("SIMULATED");
    await page.goto(root + "app/billing/");
    await expect(
      page.getByRole("button", {
        name: "Upgrade plan · Not connected",
        exact: true,
      }),
    ).toBeDisabled();
    await expect(page.locator(".module-demo input")).toHaveCount(0);
    await page.setViewportSize({ width: 320, height: 850 });
    await page.goto(root + "app/settings/");
    await page
      .getByRole("tab", { name: "Team and roles", exact: true })
      .click();
    await page
      .getByLabel("Morgan role concept", { exact: true })
      .selectOption("Viewer concept");
    await expect(page.getByRole("table")).toContainText("Viewer concept");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await page
      .getByRole("dialog", { name: "Studio navigation drawer" })
      .getByRole("link", { name: "AI Documents · Demo", exact: true })
      .click();
    await expect(page).toHaveURL(/\/KENNY\/app\/documents\/$/);
    const preserved = [
      "",
      "design-system/",
      "login/",
      "signup/",
      "forgot-password/",
      "verify-email/",
      "onboarding/",
      "terms/",
      "privacy/",
      "app/",
      "app/workspace/",
    ];
    for (const path of preserved) {
      const response = await page.goto(root + path);
      expect(response.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    }
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
    expect(external).toEqual([]);
    console.log(
      JSON.stringify(
        {
          basePath: "/KENNY",
          moduleRoutes: slugs.length,
          preservedRoutes: preserved.length,
          representativeInteractions: "passed",
          mobileDrawerAndNavigation: "passed",
          pageErrors: errors,
          failedHttp: failed,
          externalRequests: external,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

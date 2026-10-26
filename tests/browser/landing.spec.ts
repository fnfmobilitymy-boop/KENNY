import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const artifacts = "/workspace/artifacts/kenny-m3";

test("desktop landing, tab interactions, FAQ, theme persistence and accessibility", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "business studio.",
  );
  await expect(
    page.getByRole("link", { name: "Kenny AI Business Studio home" }),
  ).toHaveCount(2);
  await expect(page.locator(".module-card")).toHaveCount(12);
  await page
    .getByRole("link", { name: "Explore the studio", exact: true })
    .click();
  await expect(page).toHaveURL(/#product-preview$/);
  const overview = page.getByRole("tab", { name: "Overview", exact: true });
  await overview.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Creative studio", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("From a spark");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText(
    "No agents or automations",
  );
  await page.keyboard.press("Home");
  await expect(overview).toBeFocused();
  const question = page
    .locator("summary")
    .filter({ hasText: "How much will it cost?" });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("Pricing, usage allowances, currencies"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
    await page.screenshot({
      path: `${artifacts}/landing-desktop-${theme}.png`,
      fullPage: true,
    });
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => {
      const families = [document.body, document.querySelector("h1")!].map(
        (el) =>
          getComputedStyle(el)
            .fontFamily.split(",")[0]
            .replaceAll('"', "")
            .trim(),
      );
      return (
        families[0] !== families[1] &&
        families.every((family) =>
          Array.from(document.fonts).some(
            (font) => font.family === family && font.status === "loaded",
          ),
        )
      );
    }),
  ).toBe(true);
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(
    page.getByRole("button", { name: "Play motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(errors).toEqual([]);
});

test("mobile menu, Escape, outside dismissal, responsive layout and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeHidden();
  const menu = page.getByRole("button", { name: /Menu/ });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Modules", exact: true })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#modules$/);
  await menu.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page
      .locator(".orb-node")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.screenshot({
    path: `${artifacts}/landing-mobile-dark.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({
    path: `${artifacts}/landing-mobile-light.png`,
    fullPage: true,
  });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
  await page
    .locator(".module-card h3")
    .first()
    .evaluate(
      (el) =>
        (el.textContent =
          "An unusually long module title for checking responsive layouts and sensible text wrapping"),
    );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("existing design system: modal focus, keyboard tabs, empty state, form validation and both themes", async ({
  page,
}) => {
  await page.goto("/design-system");
  const trigger = page.getByRole("button", { name: "Open demo dialog" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close preview" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close preview" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByRole("tab", { name: "Overview", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tabpanel")).toContainText("Nothing here yet.");
  await expect(
    page.getByRole("tab", { name: "Activity", exact: true }),
  ).toBeFocused();
  const email = page.getByLabel("Work email");
  await email.fill("invalid");
  await page.getByRole("button", { name: "Validate demo form" }).click();
  expect(
    await email.evaluate(
      (el) => (el as HTMLInputElement).validity.typeMismatch,
    ),
  ).toBe(true);
  await email.fill("demo@example.com");
  await page.getByRole("button", { name: "Validate demo form" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "No account was created." }),
  ).toBeVisible();
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Switch to light theme" }).click();
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
  }
  await page.setViewportSize({ width: 320, height: 800 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `${artifacts}/design-system-mobile-light.png`,
    fullPage: true,
  });
});

test("font fallback keeps navigation and content usable when fonts fail", async ({
  page,
}) => {
  await page.route("**/*.woff2", (route) => route.abort());
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "business studio.",
  );
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.setViewportSize({ width: 320, height: 800 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

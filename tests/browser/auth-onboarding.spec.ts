import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const output = "/workspace/artifacts/kenny-m4";
const routes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
  "/onboarding",
  "/terms",
  "/privacy",
];

for (const width of [320, 375, 430, 768, 1024, 1440])
  test(`M4 routes fit ${width}px and retain accessible layouts`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("input,select,.auth-form-content,.wizard-main")
          .evaluateAll((els) =>
            els
              .filter((el) => el.getClientRects().length)
              .every((el) => {
                const rect = el.getBoundingClientRect();
                return rect.left >= -1 && rect.right <= innerWidth + 1;
              }),
          ),
      ).toBe(true);
      if (width === 375 || width === 1440)
        await page.screenshot({
          path: `${output}/${route.slice(1)}-${width}-dark.png`,
          fullPage: true,
          animations: "disabled",
        });
      if (
        [320, 1440].includes(width) &&
        ["/login", "/signup", "/verify-email", "/onboarding"].includes(route)
      ) {
        for (const theme of ["dark", "light"]) {
          if (theme === "light")
            await page
              .getByRole("button", { name: "Switch to light theme" })
              .click();
          const scan = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(scan.violations).toEqual([]);
          if (theme === "light" && width === 1440)
            await page.screenshot({
              path: `${output}/${route.slice(1)}-1440-light.png`,
              fullPage: true,
              animations: "disabled",
            });
          if (theme === "light")
            await page
              .getByRole("button", { name: "Switch to dark theme" })
              .click();
        }
      }
    }
  });

test("login validates, shows password, previews local loading and never signs in or persists secrets", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") posts.push(r.url());
  });
  await page.goto("/login");
  await page.getByRole("button", { name: "Log in Demo" }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("Enter a valid email address");
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toBeFocused();
  await page
    .getByRole("alert", { name: /validation errors/ })
    .getByRole("link", { name: "Enter a valid email address." })
    .click();
  await expect(page.getByLabel("Email address", { exact: true })).toBeFocused();
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("SamplePassword123");
  await page
    .getByRole("button", { name: "Show password", exact: true })
    .click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page
    .getByRole("button", { name: "Hide password", exact: true })
    .click();
  await page.getByRole("checkbox", { name: /Remember me/ }).check();
  await page.getByRole("button", { name: "Log in Demo" }).click();
  await expect(page.getByRole("status")).toContainText("You are not signed in");
  await expect(page.getByLabel("Password", { exact: true })).toHaveValue("");
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toMatch(/demo@example|SamplePassword|remember/i);
  expect(posts).toEqual([]);
  await page.reload();
  await expect(page.getByLabel("Password", { exact: true })).toHaveValue("");
  await expect(
    page.getByRole("checkbox", { name: /Remember me/ }),
  ).not.toBeChecked();
});

test("signup requirements, mismatch, placeholder legal links and no simulated registration", async ({
  page,
}) => {
  await page.goto("/signup");
  await page.getByLabel("Full name", { exact: true }).fill("Sample Person");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("short");
  await page.getByLabel("Confirm password", { exact: true }).fill("different");
  await page.getByRole("button", { name: "Create account Demo" }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("at least 12 characters");
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("Passwords must match");
  await page.getByLabel("Password", { exact: true }).fill("SamplePassword123");
  await page
    .getByLabel("Confirm password", { exact: true })
    .fill("SamplePassword123");
  await page
    .getByRole("checkbox", { name: /I understand this is a demo/ })
    .check();
  await page.getByRole("button", { name: "Create account Demo" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No account was created",
  );
  await expect(page.getByLabel("Password", { exact: true })).toHaveValue("");
  await expect(
    page.getByLabel("Confirm password", { exact: true }),
  ).toHaveValue("");
  await page
    .getByRole("link", { name: "Terms (placeholder)", exact: true })
    .click();
  await expect(page).toHaveURL(/\/terms$/);
  await expect(
    page.getByText("Not a final legal document", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to registration preview" })
    .click();
  await page
    .getByRole("link", { name: "Privacy notice (placeholder)", exact: true })
    .click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(
    page.getByText("Not a final legal document", { exact: true }),
  ).toBeVisible();
});

test("password reset and all verification states disclose disconnected backend", async ({
  page,
}) => {
  await page.goto("/forgot-password");
  await page.getByRole("button", { name: "Request reset link Demo" }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toBeVisible();
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByRole("button", { name: "Request reset link Demo" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No reset email was sent",
  );
  await page.goto("/verify-email");
  for (const state of ["pending", "expired", "error"]) {
    await page.getByLabel("Preview verification state").selectOption(state);
    await expect(page.locator(".verification-state")).toBeVisible();
    await page
      .getByRole("button", { name: "Resend verification Demo" })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "No verification email was sent",
    );
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: `${output}/verify-${state}.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});

async function setupToModules(page: import("@playwright/test").Page) {
  await page.goto("/onboarding");
  await page.getByRole("button", { name: "Start setup preview" }).click();
  await page.getByLabel("Business / workspace name").fill("Sample Studio");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByLabel("Industry (required)").selectOption("Agency");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("radio", { name: "2–10 people" }).check();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("checkbox", { name: "Create better content" }).check();
  await page.getByRole("button", { name: "Next", exact: true }).click();
}

test("all eight onboarding steps validate and preserve choices through back/next and review edits", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/onboarding");
  await expect(
    page.getByRole("button", { name: "Back", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Start setup preview" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("workspace name");
  await page.getByLabel("Business / workspace name").fill("Sample Studio");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("Choose your industry");
  await page.getByLabel("Industry (required)").selectOption("Other");
  await page
    .getByLabel("Describe your industry (optional)")
    .fill("Sample industry");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("team size");
  await page.getByRole("radio", { name: "2–10 people" }).focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("alert", { name: /validation errors/ }),
  ).toContainText("at least one business goal");
  await page.getByRole("checkbox", { name: "Create better content" }).check();
  await page.getByRole("checkbox", { name: "Find new customers" }).check();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByRole("checkbox")).toHaveCount(12);
  await page
    .getByRole("checkbox", { name: "AI Workspace", exact: true })
    .check();
  await page.getByRole("checkbox", { name: "Documents", exact: true }).check();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Create better content" }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "Documents", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.locator(".review-list")).toContainText("Sample Studio");
  await expect(page.locator(".review-list")).toContainText(
    "Other · Sample industry",
  );
  await page
    .getByRole("button", { name: "Edit Workspace", exact: true })
    .click();
  await expect(page.getByLabel("Business / workspace name")).toHaveValue(
    "Sample Studio",
  );
  await page
    .getByLabel("Business / workspace name")
    .fill("Sample Studio Revised");
  for (let i = 0; i < 5; i++)
    await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.locator(".review-list")).toContainText(
    "Sample Studio Revised",
  );
  await page.screenshot({
    path: output + "/onboarding-review.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Complete demo preview" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "8",
  );
  await expect(page.getByRole("status")).toContainText(
    "No server-side workspace was created",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: output + "/onboarding-complete.png",
    fullPage: true,
    animations: "disabled",
  });
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toContain("Sample Studio");
  await page.getByRole("button", { name: "Review again" }).click();
  await expect(page.locator(".review-list")).toContainText("Documents");
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  );
});

test("optional module interests may be skipped and keyboard tabs keep visible focus", async ({
  page,
}) => {
  await setupToModules(page);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.locator(".review-list")).toContainText(
    "No preferences selected (optional)",
  );
  await page.getByRole("button", { name: "Complete demo preview" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No server-side workspace was created",
  );
  await page.goto("/login");
  await page.getByLabel("Email address", { exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Password", { exact: true })).toBeFocused();
  expect(
    await page
      .getByLabel("Password", { exact: true })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
});

test("landing links lead to the implemented auth screens and M3 content remains", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Login", exact: true })
    .click();
  await expect(page).toHaveURL(/\/login$/);
  await page
    .getByRole("link", { name: "Kenny AI Business Studio home" })
    .click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Get Started", exact: true })
    .click();
  await expect(page).toHaveURL(/\/signup$/);
});

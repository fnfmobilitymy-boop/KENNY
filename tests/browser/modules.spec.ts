import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const artifact = "/workspace/artifacts/kenny-m7";
test("Creative: website projects, structure, viewport, style and honest states", async ({
  page,
}) => {
  await page.goto("/app/website-builder");
  await expect(
    page.getByRole("heading", { level: 1, name: "AI Website Builder" }),
  ).toBeVisible();
  await page
    .getByLabel("Website brief", { exact: true })
    .fill("A local draft, never generated");
  await page
    .getByLabel("Preview viewport", { exact: true })
    .selectOption("Mobile");
  await expect(page.locator(".website-preview")).toHaveAttribute(
    "data-viewport",
    "Mobile",
  );
  await page
    .getByLabel("Page structure", { exact: true })
    .selectOption("About");
  await expect(page.locator(".website-preview h3")).toContainText("intention");
  await page.getByLabel("Sample style", { exact: true }).selectOption("Violet");
  await expect(page.locator(".website-preview")).toHaveAttribute(
    "data-style",
    "Violet",
  );
  await page
    .getByRole("button", { name: "New project demo", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Name a local concept" });
  await dialog
    .getByRole("button", { name: "Add local concept", exact: true })
    .click();
  await expect(dialog.getByLabel("Project name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await dialog.getByLabel("Project name").fill("Local concept");
  await dialog
    .getByRole("button", { name: "Add local concept", exact: true })
    .click();
  await expect(
    page.getByText("This local project has no generated website.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "New project demo", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Publish · Not connected", exact: true }),
  ).toBeDisabled();
  for (const state of ["empty", "loading", "error"]) {
    await page
      .getByLabel("Prototype state", { exact: true })
      .selectOption(state);
    await expect(
      page.getByRole("region", { name: "Prototype state example" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Restore sample view", exact: true })
      .click();
  }
});
test("Creative: fixed image assets, favorites and settings do not fabricate generation", async ({
  page,
}) => {
  await page.goto("/app/image-studio");
  await page
    .getByLabel("Image prompt", { exact: true })
    .fill("Not sent to an image model");
  await page.getByLabel("Aspect ratio", { exact: true }).selectOption("9:16");
  await page.getByLabel("Output quantity", { exact: true }).selectOption("4");
  await page
    .getByLabel("Gallery filter", { exact: true })
    .selectOption("Favorites");
  await expect(
    page.getByRole("heading", { name: "No favorite samples yet." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all samples", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Quiet architecture · Fixed sample" })
    .click();
  await page
    .getByRole("button", { name: "Add local favorite", exact: true })
    .click();
  await page
    .getByLabel("Gallery filter", { exact: true })
    .selectOption("Favorites");
  await expect(page.locator(".image-tile")).toHaveCount(1);
  await expect(
    page.getByRole("button", {
      name: "Generate images · Not connected",
      exact: true,
    }),
  ).toBeDisabled();
  await expect(
    page.getByRole("status").filter({ hasText: "local favorites" }),
  ).toContainText("1 local favorites");
});
test("Creative: video storyboard inspection, subtitle drafts and disconnected export", async ({
  page,
}) => {
  await page.goto("/app/video-studio");
  await page
    .getByRole("button", { name: "Product moment 6–12s · Fixed storyboard" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Product moment", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Subtitles", exact: true }).click();
  await page
    .getByLabel("Local caption draft", { exact: true })
    .fill("A local caption");
  await expect(page.locator(".tool-preview-copy")).toHaveText(
    "A local caption",
  );
  await page.getByRole("tab", { name: "Audio", exact: true }).click();
  await expect(page.getByRole("tabpanel", { name: "Audio" })).toContainText(
    "No audio source connected",
  );
  await expect(
    page.getByRole("button", {
      name: "Export video · Not connected",
      exact: true,
    }),
  ).toBeDisabled();
});
test("Creative: all document templates, local preview calculation and no PDF issuance", async ({
  page,
}) => {
  await page.goto("/app/documents");
  for (const value of [
    "Quotation",
    "Invoice",
    "Proposal",
    "Letter",
    "Report",
  ]) {
    await page
      .getByLabel("Document template", { exact: true })
      .selectOption(value);
    await expect(
      page
        .getByRole("article", { name: "Local document preview" })
        .getByRole("heading", { name: value, exact: true }),
    ).toBeVisible();
  }
  await page
    .getByLabel("Document template", { exact: true })
    .selectOption("Invoice");
  await page
    .getByLabel("Recipient label", { exact: true })
    .fill("A fictional sample recipient");
  await page.getByLabel("Illustrative quantity", { exact: true }).fill("3");
  await page.getByLabel("Sample unit amount", { exact: true }).fill("12.50");
  await expect(
    page.getByRole("article", { name: "Local document preview" }),
  ).toContainText("37.50 demo units");
  await expect(
    page.getByRole("article", { name: "Local document preview" }),
  ).toContainText("A fictional sample recipient");
  await expect(
    page.getByRole("button", {
      name: "Export PDF · Not connected",
      exact: true,
    }),
  ).toBeDisabled();
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toContain("fictional sample recipient");
  await page.reload();
  await expect(page.getByLabel("Recipient label", { exact: true })).toHaveValue(
    "Fictional client",
  );
});

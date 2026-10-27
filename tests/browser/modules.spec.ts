import { test, expect } from "@playwright/test";
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

test("Growth: campaign calendar, channel draft, checklist and local schedule disclose no publishing", async ({
  page,
}) => {
  await page.goto("/app/marketing");
  await page
    .getByRole("button", { name: "Wed 4 Sample draft", exact: true })
    .click();
  await expect(
    page.getByText("Wed 4 selected · Calendar is a local planning view."),
  ).toBeVisible();
  await page
    .getByLabel("Content channel", { exact: true })
    .selectOption("Email");
  await page
    .getByLabel("Post draft", { exact: true })
    .fill("A fictional local post");
  await expect(page.locator(".content-post-preview")).toContainText(
    "A fictional local post",
  );
  await page
    .getByRole("checkbox", { name: "Define the intended audience" })
    .check();
  await page
    .getByRole("button", { name: "Preview local schedule", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Local scheduling preview" });
  await dialog.getByLabel("Preview date", { exact: true }).fill("2026-11-04");
  await dialog
    .getByRole("button", { name: "Apply local schedule label" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Not scheduled on any service",
  );
  await expect(
    page.getByRole("button", { name: "Publish post · Not connected" }),
  ).toBeDisabled();
});
test("Growth: SEO samples, local content and illustrative Ads estimates never crawl or connect", async ({
  page,
}) => {
  await page.goto("/app/seo-ads");
  await page
    .getByLabel("Website address", { exact: true })
    .fill("https://example.invalid");
  await expect(
    page.getByRole("button", { name: "Run website audit · Not connected" }),
  ).toBeDisabled();
  await page
    .getByLabel("Filter sample keywords", { exact: true })
    .fill("brief");
  await expect(
    page.getByRole("cell", { name: "creative studio brief", exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Filter sample keywords", { exact: true })
    .fill("no-match");
  await expect(
    page.getByText("No sample keywords match.", { exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Illustrative daily budget units", { exact: true })
    .fill("12");
  await page.getByLabel("Planning days", { exact: true }).fill("7");
  await expect(
    page.getByRole("region", { name: "Google Ads draft" }).getByRole("status"),
  ).toContainText("84 demo units");
  await page.getByLabel("Planning days", { exact: true }).fill("0");
  await expect(
    page.getByRole("region", { name: "Google Ads draft" }).getByRole("status"),
  ).toContainText("1–90 days");
  await page
    .getByLabel("Content draft", { exact: true })
    .fill("Three sample words");
  await expect(page.getByText("3 local words", { exact: false })).toBeVisible();
});
test("Growth: sales inbox, templates, behavior and local human review never send a response", async ({
  page,
}) => {
  await page.goto("/app/sales");
  await page.getByRole("button", { name: /Harbor sample inquiry/ }).click();
  await expect(page.locator(".sales-conversation")).toContainText(
    "initial brief",
  );
  await page
    .getByLabel("Response template", { exact: true })
    .selectOption("brief");
  await expect(page.locator(".tool-preview-copy")).toContainText("SAMPLE");
  await page
    .getByRole("button", {
      name: "Approve sample response · Local",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Approved-preview · Local only", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("No response was sent");
  await page.getByRole("button", { name: "Reset local review" }).click();
  await page
    .getByRole("button", {
      name: "Reject sample response · Local",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Rejected-preview · Local only", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Preview human handoff" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No person was notified",
  );
  await expect(
    page.getByRole("button", { name: "Send response · Not connected" }),
  ).toBeDisabled();
});
test("Growth: CRM search/filter/sort, keyboard tabs, pipeline and local stages remain unsaved", async ({
  page,
}) => {
  await page.goto("/app/crm");
  await page.getByLabel("Search sample leads", { exact: true }).fill("Cedar");
  await expect(
    page.getByRole("rowheader", { name: "Cedar Example", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Inspect Cedar Example", exact: true })
    .click();
  await page
    .getByLabel("Selected lead stage", { exact: true })
    .selectOption("Proposal");
  await expect(page.getByRole("status")).toContainText("No record was saved");
  await page.getByLabel("Search sample leads", { exact: true }).fill("");
  await page
    .getByLabel("Filter lead stage", { exact: true })
    .selectOption("Proposal");
  await expect(page.getByRole("table")).toContainText("2 fictional leads");
  await page.getByRole("tab", { name: "Customer list", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Sales pipeline", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("region", { name: "Proposal pipeline" }),
  ).toContainText("Cedar Example");
  await page
    .getByLabel("Search sample leads", { exact: true })
    .fill("xyz-none");
  await expect(
    page.getByRole("status").filter({ hasText: "No fictional leads" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByLabel("Selected lead stage", { exact: true }),
  ).toHaveValue("New");
});

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const output = "/workspace/artifacts/kenny-m6";
async function history(page: Page) {
  if (!(await page.locator(".workspace-history-inline").isVisible()))
    await page
      .getByRole("button", { name: "Conversation history", exact: true })
      .click();
  return page.locator(".conversation-history:visible");
}
async function inspector(page: Page) {
  if (!(await page.locator(".workspace-inspector-inline").isVisible()))
    await page
      .getByRole("button", { name: "Task inspector", exact: true })
      .click();
  return page.locator(".task-inspector:visible");
}
async function pauseClock(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install({ time: new Date("2026-10-26T10:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-26T10:00:01Z"));
}
for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920])
  test(`workspace panels, themes and reduced motion at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/app/workspace");
    await expect(
      page.getByRole("heading", { level: 1, name: "AI Workspace" }),
    ).toBeVisible();
    await expect(page.getByText("DEMO MODE", { exact: true })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator(
          ".workspace-chat-panel,.workspace-toolbar button,.workspace-composer textarea,.workspace-scenario-controls select",
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
    for (const theme of ["dark", "light"]) {
      if (theme === "light")
        await page
          .getByRole("button", { name: "Switch to light theme" })
          .click();
      if ([320, 768, 1440, 1920].includes(width))
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
      if ([375, 1440, 1920].includes(width))
        await page.screenshot({
          path: `${output}/workspace-${width}-${theme}.png`,
          fullPage: true,
          animations: "disabled",
        });
    }
    if (width < 1280) {
      await history(page);
      await expect(
        page.getByRole("dialog", { name: "Conversation history drawer" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Conversation history", exact: true }),
      ).toBeFocused();
      await inspector(page);
      await expect(
        page.getByRole("dialog", { name: "Task inspector drawer" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Task inspector", exact: true }),
      ).toBeFocused();
    } else {
      await page
        .getByRole("button", { name: "Conversation history", exact: true })
        .click();
      await expect(page.locator(".workspace-history-inline")).toBeHidden();
      await page
        .getByRole("button", { name: "Task inspector", exact: true })
        .click();
      await expect(page.locator(".workspace-inspector-inline")).toBeHidden();
      await page
        .getByRole("button", { name: "Conversation history", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Task inspector", exact: true })
        .click();
    }
  });

test("new conversation, search, switching, rename/delete confirmations and reset stay local", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Your prompt" }),
  ).toBeFocused();
  await expect(
    page.getByRole("heading", { name: "What would you like to explore?" }),
  ).toBeVisible();
  const panel = await history(page);
  await panel
    .getByRole("searchbox", { name: "Search conversations" })
    .fill("no-match-xyz");
  await expect(
    panel.getByRole("heading", { name: "No matching conversations." }),
  ).toBeVisible();
  await panel
    .getByRole("button", { name: "Clear conversation search" })
    .click();
  await panel
    .getByRole("button", {
      name: "Conversation options: Untitled conversation",
      exact: true,
    })
    .click();
  await page
    .getByRole("menuitem", { name: "Rename conversation", exact: true })
    .click();
  const rename = page.getByRole("dialog", {
    name: "Rename conversation",
    exact: true,
  });
  await expect(
    rename.getByRole("textbox", { name: "Conversation title" }),
  ).toBeFocused();
  await rename.getByRole("textbox", { name: "Conversation title" }).fill("");
  await rename.getByRole("button", { name: "Save title · Local" }).click();
  await expect(
    rename.getByRole("textbox", { name: "Conversation title" }),
  ).toHaveAttribute("aria-invalid", "true");
  await rename
    .getByRole("textbox", { name: "Conversation title" })
    .fill("Renamed locally");
  await rename.getByRole("button", { name: "Save title · Local" }).click();
  await expect(page.locator(".workspace-chat-header h2")).toHaveText(
    "Renamed locally",
  );
  await expect(
    panel.getByRole("button", {
      name: "Conversation options: Renamed locally",
      exact: true,
    }),
  ).toBeFocused();
  await panel.getByRole("button", { name: /^Website brief, before/ }).click();
  await expect(
    page
      .getByRole("region", { name: "Conversation messages" })
      .locator(".sample-content pre"),
  ).toContainText("Home");
  await panel.getByRole("button", { name: /^Renamed locally/ }).click();
  await panel
    .getByRole("button", {
      name: "Conversation options: Renamed locally",
      exact: true,
    })
    .click();
  await page
    .getByRole("menuitem", { name: "Delete conversation", exact: true })
    .click();
  const remove = page.getByRole("dialog", {
    name: "Delete this conversation?",
  });
  await remove.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.locator(".workspace-chat-header h2")).toHaveText(
    "Renamed locally",
  );
  await panel
    .getByRole("button", {
      name: "Conversation options: Renamed locally",
      exact: true,
    })
    .click();
  await page
    .getByRole("menuitem", { name: "Delete conversation", exact: true })
    .click();
  await remove
    .getByRole("button", { name: "Delete conversation · Local" })
    .click();
  await expect(
    panel
      .locator(".conversation-select")
      .filter({ hasText: "Renamed locally" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Reset workspace preview" }).click();
  await page
    .getByRole("dialog", { name: "Reset the workspace preview?" })
    .getByRole("button", { name: "Reset preview · Local" })
    .click();
  await expect(panel.locator(".conversation-select")).toHaveCount(3);
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toContain("Renamed locally");
});

test("Shift+Enter, duplicate prevention, cancel/stale timers, retry, failure and completion are honest", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await pauseClock(page);
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  const prompt = page.getByRole("textbox", { name: "Your prompt" });
  await expect(
    page.getByRole("button", { name: "Send preview", exact: true }),
  ).toBeDisabled();
  await prompt.fill("Local first line");
  await prompt.press("Shift+Enter");
  await prompt.press("x");
  await expect(prompt).toHaveValue("Local first line\nx");
  await page
    .getByRole("form", { name: "Demo prompt composer" })
    .evaluate((form) => {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    });
  await expect(
    page.getByRole("article", { name: "User message", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("queued-preview");
  await page.clock.fastForward(350);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("running-preview");
  await page.getByRole("button", { name: "Stop preview", exact: true }).click();
  await page.clock.fastForward(3000);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("canceled-preview");
  await expect(
    page.getByRole("article", {
      name: "Sample assistant message",
      exact: true,
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Retry sample preview" }).click();
  await page.clock.fastForward(2000);
  await expect(
    page.getByRole("article", {
      name: "Sample assistant message",
      exact: true,
    }),
  ).toHaveCount(1);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("complete-preview");
  await page
    .getByLabel("Preview outcome", { exact: true })
    .selectOption("failure");
  await prompt.fill("Demonstrate a failure state");
  await prompt.press("Enter");
  await page.clock.fastForward(2000);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("failed-preview");
  await expect(
    page.getByText("Sample task failure", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Retry sample preview" }).click();
  await page.clock.fastForward(2000);
  await expect(
    page.locator(".workspace-chat-header .workspace-status"),
  ).toHaveText("complete-preview");
  expect(
    await page.evaluate(() => JSON.stringify({ ...localStorage })),
  ).not.toContain("Local first line");
});

test("all six scenarios produce only deterministic samples; inspector keyboard tabs and local decisions work", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await pauseClock(page);
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  for (const scenario of [
    "marketing",
    "website",
    "follow-up",
    "seo",
    "translation",
    "summary",
  ]) {
    await page
      .getByLabel("Sample scenario", { exact: true })
      .selectOption(scenario);
    await page
      .getByRole("textbox", { name: "Your prompt" })
      .fill("Unrelated input; show the fixed sample only.");
    await page
      .getByRole("button", { name: "Send preview", exact: true })
      .click();
    await page.clock.fastForward(2000);
    await expect(
      page.locator(".workspace-chat-header .workspace-status"),
    ).toHaveText("complete-preview");
    const panel = await inspector(page);
    await panel.getByRole("tab", { name: "RESULTS", exact: true }).click();
    await expect(panel.getByRole("tabpanel")).toContainText("SAMPLE");
    await expect(panel.locator(".artifact-shell")).toContainText(
      "No file was generated",
    );
  }
  const panel = await inspector(page);
  await panel.getByRole("tab", { name: "OVERVIEW", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(
    panel.getByRole("tab", { name: "APPROVALS", exact: true }),
  ).toBeFocused();
  await expect(
    panel.getByRole("heading", { name: "No active approval." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset workspace preview" }).click();
  await page
    .getByRole("dialog", { name: "Reset the workspace preview?" })
    .getByRole("button", { name: "Reset preview · Local" })
    .click();
  await panel.getByRole("tab", { name: "APPROVALS", exact: true }).click();
  await panel.getByRole("button", { name: "Approve sample · Local" }).click();
  await expect(panel.getByRole("tabpanel")).toContainText("approved-preview");
  await page.getByRole("button", { name: "Reset workspace preview" }).click();
  await page
    .getByRole("dialog", { name: "Reset the workspace preview?" })
    .getByRole("button", { name: "Reset preview · Local" })
    .click();
  await panel.getByRole("tab", { name: "APPROVALS", exact: true }).click();
  await panel.getByRole("button", { name: "Reject sample · Local" }).click();
  await expect(panel.getByRole("tabpanel")).toContainText("rejected-preview");
  await panel.getByRole("tab", { name: "STEPS", exact: true }).click();
  await panel.locator("summary").click();
  for (const label of [
    "Pending",
    "Queued-preview",
    "Running-preview",
    "Complete-preview",
    "Failed-preview",
    "Canceled-preview",
  ])
    await expect(panel.getByText(label, { exact: true })).toBeVisible();
});

test("attachments disclose metadata only, reject unsupported types, remove safely and preserve wrapping", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/app/workspace");
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  const file = page.locator("input[type=file]");
  await file.setInputFiles({
    name: "unsupported.exe",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("not processed"),
  });
  await expect(
    page.getByRole("alert", { name: "Attachment notice" }),
  ).toContainText("Unsupported file type");
  const longName = "a".repeat(180) + "-sample.pdf";
  await file.setInputFiles({
    name: longName,
    mimeType: "application/pdf",
    buffer: Buffer.from("contents not read"),
  });
  await expect(page.locator(".local-attachments")).toContainText(longName);
  await expect(page.locator(".composer-disclosure")).toContainText(
    "never read, uploaded or processed",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: `Remove attachment ${longName}`, exact: true })
    .click();
  await expect(page.locator(".local-attachments")).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Your prompt" })
    .fill("x".repeat(4000));
  await expect(page.locator(".composer-count")).toContainText("Limit reached");
  await page.screenshot({
    path: `${output}/mobile-long-input.png`,
    fullPage: true,
    animations: "disabled",
  });
});

test("empty workspace/conversation, templates and switching busy conversations stay local", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await pauseClock(page);
  await page.getByRole("button", { name: /Switch demo workspace/ }).click();
  await page.getByRole("option", { name: /Blank workspace/ }).click();
  await expect(
    page.getByRole("heading", { name: "No conversations here yet." }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Your prompt" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Start a new chat", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Translation request", exact: true })
    .click();
  await expect(page.getByRole("textbox", { name: "Your prompt" })).toHaveValue(
    /fixed translation/,
  );
  await page.getByRole("button", { name: "Send preview", exact: true }).click();
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  await page.clock.fastForward(4000);
  await expect(
    page.getByRole("article", {
      name: "Sample assistant message",
      exact: true,
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Reset workspace preview" }).click();
  await page
    .getByRole("dialog", { name: "Reset the workspace preview?" })
    .getByRole("button", { name: "Reset preview · Local" })
    .click();
  await expect(
    page.getByRole("heading", { name: "No conversations here yet." }),
  ).toBeVisible();
});

test("safe text, copy fallback and page refresh never persist chat input", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.reject(new Error("Unavailable in test")),
      },
      configurable: true,
    });
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await pauseClock(page);
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  const text = '<img src=x onerror="window.UNSAFE=true"> local demo';
  await page.getByRole("textbox", { name: "Your prompt" }).fill(text);
  await page.getByRole("button", { name: "Send preview", exact: true }).click();
  await page.clock.fastForward(2000);
  await expect(page.locator(".workspace-messages img")).toHaveCount(0);
  await expect(page.locator(".user-message-text")).toHaveText(text);
  await page
    .getByRole("button", { name: "Copy user message", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Copy message text manually" }),
  ).toHaveValue(text);
  expect(
    await page.evaluate(
      () =>
        JSON.stringify({ ...localStorage }) +
        JSON.stringify({ ...sessionStorage }),
    ),
  ).not.toContain("local demo");
  await page.reload();
  await expect(page.locator(".workspace-messages")).not.toContainText(text);
});

test("message scrolling respects a reader away from the bottom and supports jumping to new samples", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await pauseClock(page);
  await page.getByRole("button", { name: "New chat", exact: true }).click();
  for (let i = 0; i < 4; i++) {
    await page
      .getByRole("textbox", { name: "Your prompt" })
      .fill("A long local paragraph for scroll testing.\n".repeat(18));
    await page
      .getByRole("button", { name: "Send preview", exact: true })
      .click();
    await page.clock.fastForward(2000);
  }
  const scroller = page.getByRole("region", { name: "Conversation messages" });
  await scroller.evaluate((el) => {
    el.scrollTop = 0;
    el.dispatchEvent(new Event("scroll", { bubbles: true }));
  });
  await page
    .getByRole("textbox", { name: "Your prompt" })
    .fill("Another fixed sample preview");
  await page.getByRole("button", { name: "Send preview", exact: true }).click();
  await page.clock.fastForward(2000);
  expect(await scroller.evaluate((el) => el.scrollTop)).toBeLessThan(50);
  await page.getByRole("button", { name: "New sample below" }).click();
  expect(
    await scroller.evaluate(
      (el) => el.scrollHeight - el.scrollTop - el.clientHeight,
    ),
  ).toBeLessThan(5);
});

test("mobile panels, confirmations and inspector overlays retain accessible focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/app/workspace");
  const panel = await history(page);
  await expect(
    panel.getByRole("searchbox", { name: "Search conversations" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page
      .getByRole("dialog", { name: "Conversation history drawer" })
      .evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Conversation history", exact: true }),
  ).toBeFocused();
  const right = await inspector(page);
  await right.getByRole("tab", { name: "APPROVALS", exact: true }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Task inspector", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Reset workspace preview" }).click();
  const confirm = page.getByRole("dialog", {
    name: "Reset the workspace preview?",
  });
  await expect(confirm).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Reset workspace preview" }),
  ).toBeFocused();
});

test("copy uses the clipboard only after an explicit user action", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: "http://127.0.0.1:3100",
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/app/workspace");
  await page
    .getByRole("button", { name: "Copy sample assistant message", exact: true })
    .click();
  await expect(page.locator(".workspace-live-status")).toContainText(
    "Message copied to clipboard.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "SAMPLE — Marketing plan",
  );
});

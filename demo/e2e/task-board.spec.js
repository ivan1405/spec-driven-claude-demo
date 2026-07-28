import { test, expect } from "@playwright/test";

function column(page, label) {
  return page.locator(".column").filter({ has: page.getByRole("heading", { name: label }) });
}

async function createTask(page, title, priority) {
  await page.getByLabel("New task").fill(title);
  await page.getByLabel("Priority", { exact: true }).selectOption(priority);
  await page.getByRole("button", { name: "Add task" }).click();
}

test.describe("task board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("creates a task and shows it in the To do column", async ({ page }) => {
    const title = "Playwright: buy oat milk";
    await createTask(page, title, "high");

    const todo = column(page, /^To do/);
    await expect(todo.getByText(title, { exact: true })).toBeVisible();
    await expect(todo.locator("li", { hasText: title }).getByText("high")).toBeVisible();
  });

  test("rejects an empty title without creating a task", async ({ page }) => {
    await page.getByRole("button", { name: "Add task" }).click();

    await expect(page.getByText("Give the task a title.")).toBeVisible();
  });

  test("moving a task's status moves it to the matching column", async ({ page }) => {
    const title = "Playwright: move to in progress";
    await createTask(page, title, "medium");

    await page.getByLabel(`Status for ${title}`).selectOption("doing");

    const inProgress = column(page, /^In progress/);
    await expect(inProgress.getByText(title, { exact: true })).toBeVisible();
    await expect(column(page, /^To do/).getByText(title, { exact: true })).toHaveCount(0);
  });

  test("deletes a task", async ({ page }) => {
    const title = "Playwright: delete me";
    await createTask(page, title, "low");
    await expect(page.getByText(title, { exact: true })).toBeVisible();

    await page.getByRole("button", { name: `Delete ${title}` }).click();

    await expect(page.getByText(title, { exact: true })).toHaveCount(0);
  });

  test("filtering by priority hides tasks of other priorities", async ({ page }) => {
    const highTitle = "Playwright: filter high priority";
    const lowTitle = "Playwright: filter low priority";
    await createTask(page, highTitle, "high");
    await createTask(page, lowTitle, "low");

    const filterGroup = page.getByRole("group", { name: "Filter by priority" });
    await filterGroup.getByRole("button", { name: "high", exact: true }).click();

    await expect(page.getByText(highTitle, { exact: true })).toBeVisible();
    await expect(page.getByText(lowTitle, { exact: true })).toHaveCount(0);

    await filterGroup.getByRole("button", { name: "all", exact: true }).click();
    await expect(page.getByText(lowTitle, { exact: true })).toBeVisible();
  });

  test("theme toggle switches the app to dark mode and back, and a reload resets to light mode (REQ-002, REQ-003, REQ-004, REQ-005, REQ-006)", async ({ page }) => {
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
    const toggle = page.getByRole("button", { name: "Switch to dark mode" });
    await expect(toggle.locator('svg[data-icon="sun"]')).toBeVisible();

    await toggle.click();

    await expect(page.locator(".app")).toHaveAttribute("data-theme", "dark");
    const toggleAfterSwitch = page.getByRole("button", { name: "Switch to light mode" });
    await expect(toggleAfterSwitch.locator('svg[data-icon="moon"]')).toBeVisible();

    await toggleAfterSwitch.click();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();

    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "dark");

    await page.reload();

    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // REQ-001, REQ-002: header renders a single toggle with an accessible
  // name, and the app is in light mode on a fresh load.
  test("renders a light-mode toggle in the header on first load (REQ-001, REQ-002)", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });

  // REQ-004, REQ-005: clicking the toggle flips the active theme in either
  // direction and swaps the sun/moon icon (surfaced via the button's
  // accessible name, which is computed from the current theme).
  test("clicking the toggle switches the theme and icon in either direction (REQ-004, REQ-005)", async ({ page }) => {
    const toDark = page.getByRole("button", { name: "Switch to dark mode" });
    await toDark.click();

    const toLight = page.getByRole("button", { name: "Switch to light mode" });
    await expect(toLight).toBeVisible();

    await toLight.click();
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });

  // REQ-006: dark mode restyles the whole app (not just the header) and
  // task operations still work identically while dark mode is active.
  test("dark mode restyles the task board and task creation still works (REQ-006)", async ({ page }) => {
    await page.getByRole("button", { name: "Switch to dark mode" }).click();

    const columnBg = await page
      .locator(".column")
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(columnBg).toBe("rgb(29, 29, 41)"); // --surface in dark mode: #1d1d29

    const title = "Playwright: dark mode task";
    await page.getByLabel("New task").fill(title);
    await page.getByLabel("Priority", { exact: true }).selectOption("high");
    await page.getByRole("button", { name: "Add task" }).click();

    await expect(page.getByText(title, { exact: true })).toBeVisible();
  });

  // REQ-003: theme selection is never persisted across a reload.
  test("a reload after switching to dark mode resets to light mode (REQ-003)", async ({ page }) => {
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();

    await page.reload();

    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });
});

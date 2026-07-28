import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("REQ-002: light mode is active on load", async ({ page }) => {
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });

  test("REQ-004: clicking the toggle switches to dark mode and back", async ({ page }) => {
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
  });

  test("REQ-003: reloading after switching to dark mode resets to light mode", async ({ page }) => {
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator(".app")).toHaveAttribute("data-theme", "dark");

    await page.reload();

    await expect(page.locator(".app")).toHaveAttribute("data-theme", "light");
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible();
  });
});

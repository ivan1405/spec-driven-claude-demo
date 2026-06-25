import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeToggle", () => {
  it("initial data-theme is 'dark' and toggle says 'Switch to light mode'", () => {
    render(<App />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });

  it("one click sets data-theme to 'light' and updates accessible name", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /switch to light mode/i });
    await user.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it("second click returns data-theme to 'dark'", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /switch to light mode/i });
    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: /switch to dark mode/i }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });
});

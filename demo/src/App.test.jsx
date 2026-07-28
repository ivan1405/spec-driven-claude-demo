import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";
import { _resetForTests } from "./api/tasks.js";

describe("App theme", () => {
  beforeEach(() => _resetForTests());

  it("REQ-002: renders in light mode on first load", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".app")).toHaveAttribute("data-theme", "light");
  });

  it("REQ-003: does not persist the theme across a reload", () => {
    const { container, unmount } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(container.querySelector(".app")).toHaveAttribute("data-theme", "dark");

    unmount(); // simulates the page going away on reload
    const reloaded = render(<App />);
    expect(reloaded.container.querySelector(".app")).toHaveAttribute("data-theme", "light");
  });
});

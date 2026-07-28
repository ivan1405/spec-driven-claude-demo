import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "./App.jsx";
import { _resetForTests } from "./api/tasks.js";

describe("App theme persistence", () => {
  beforeEach(() => _resetForTests());

  it("resets to light mode on a fresh mount after switching to dark mode, simulating a reload (REQ-003)", () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();

    unmount();
    cleanup();
    render(<App />);

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });
});

describe("App dark theme styling (REQ-006)", () => {
  beforeEach(() => _resetForTests());

  it("applies data-theme='dark' to the app root once the toggle is switched, so dark colors reach the whole app", () => {
    const { container } = render(<App />);

    expect(container.querySelector(".app")).toHaveAttribute("data-theme", "light");

    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    expect(container.querySelector(".app")).toHaveAttribute("data-theme", "dark");
  });

  it("still creates a task while dark mode is active, unaffected by the theme", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    fireEvent.change(screen.getByLabelText(/new task/i), {
      target: { value: "Dark mode task" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Dark mode task")).toBeInTheDocument();
  });
});

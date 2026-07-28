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

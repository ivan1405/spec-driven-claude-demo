import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App theme", () => {
  // REQ-002: the app renders in light mode on every fresh load, before any
  // interaction with the toggle.
  it("renders in light mode on first render (REQ-002)", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  // REQ-003: theme selection is never persisted — switching to dark mode
  // and remounting App (simulating a reload) must reset to light mode.
  it("resets to light mode after remounting App, simulating a reload (REQ-003)", () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
    unmount();

    render(<App />);
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });
});

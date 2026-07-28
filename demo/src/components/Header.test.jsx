import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the brand name as 'My Spec Driven Board'", () => {
    render(<Header count={0} />);
    expect(screen.getByText("My Spec Driven Board")).toBeInTheDocument();
  });

  // REQ-001: header renders a single theme toggle control with an
  // accessible name describing the action (not a bare icon).
  it("renders a theme toggle control with a non-empty accessible name (REQ-001)", () => {
    render(<Header count={0} theme="light" onToggle={() => {}} />);
    const toggle = screen.getByRole("button", { name: "Switch to dark mode" });
    expect(toggle).toBeInTheDocument();
  });

  // REQ-005: toggle shows a sun icon in light mode, a moon icon in dark
  // mode, mutually exclusive.
  it("shows the sun icon in light mode and the moon icon in dark mode (REQ-005)", () => {
    const { rerender } = render(<Header count={0} theme="light" onToggle={() => {}} />);
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-moon")).not.toBeInTheDocument();

    rerender(<Header count={0} theme="dark" onToggle={() => {}} />);
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-sun")).not.toBeInTheDocument();
  });
});

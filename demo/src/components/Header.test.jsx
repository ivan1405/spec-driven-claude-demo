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
});

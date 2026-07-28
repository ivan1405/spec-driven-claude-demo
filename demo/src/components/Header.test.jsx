import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the brand name as 'My Spec Driven Board'", () => {
    render(<Header count={0} theme="light" onToggle={() => {}} />);
    expect(screen.getByText("My Spec Driven Board")).toBeInTheDocument();
  });

  it("renders a theme toggle control with a non-empty accessible name (REQ-001)", () => {
    render(<Header count={0} theme="light" onToggle={() => {}} />);

    const toggle = screen.getByRole("button", { name: /switch to (dark|light) mode/i });
    expect(toggle).toBeInTheDocument();
  });

  it("describes switching to dark mode when the light theme is active, matching the light default (REQ-002)", () => {
    render(<Header count={0} theme="light" onToggle={() => {}} />);

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  it("describes switching to light mode when the dark theme is active", () => {
    render(<Header count={0} theme="dark" onToggle={() => {}} />);

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
  });

  it("calls onToggle when the toggle control is clicked (REQ-004)", () => {
    const onToggle = vi.fn();
    render(<Header count={0} theme="light" onToggle={onToggle} />);

    screen.getByRole("button", { name: "Switch to dark mode" }).click();

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

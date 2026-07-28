import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the brand name as 'My Spec Driven Board'", () => {
    render(<Header count={0} theme="light" onToggleTheme={() => {}} />);
    expect(screen.getByText("My Spec Driven Board")).toBeInTheDocument();
  });

  it("REQ-001: renders a theme toggle button with an accessible name", () => {
    render(<Header count={0} theme="light" onToggleTheme={() => {}} />);
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it("REQ-004: calls onToggleTheme when the toggle is clicked", () => {
    const onToggleTheme = vi.fn();
    render(<Header count={0} theme="light" onToggleTheme={onToggleTheme} />);
    fireEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("REQ-004: labels the toggle for switching back to light mode when dark is active", () => {
    render(<Header count={0} theme="dark" onToggleTheme={() => {}} />);
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });
});

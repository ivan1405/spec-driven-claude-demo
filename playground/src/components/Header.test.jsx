import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the brand name as 'My Spec Driven Board'", () => {
    render(<Header count={0} />);
    expect(screen.getByText("My Spec Driven Board")).toBeInTheDocument();
  });

  it("renders toggle button with label '☀ Light' when isDark is true", () => {
    render(<Header count={0} isDark={true} onToggleTheme={vi.fn()} />);
    expect(screen.getByRole("button", { name: /toggle colour theme/i })).toHaveTextContent("☀ Light");
  });

  it("renders toggle button with label '☾ Dark' when isDark is false", () => {
    render(<Header count={0} isDark={false} onToggleTheme={vi.fn()} />);
    expect(screen.getByRole("button", { name: /toggle colour theme/i })).toHaveTextContent("☾ Dark");
  });

  it("clicking the toggle button calls onToggleTheme once", () => {
    const onToggleTheme = vi.fn();
    render(<Header count={0} isDark={true} onToggleTheme={onToggleTheme} />);
    fireEvent.click(screen.getByRole("button", { name: /toggle colour theme/i }));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });
});

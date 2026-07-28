import { render, screen } from "@testing-library/react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

describe(".badge-high CSS rule", () => {
  it("renders a badge-high element with the correct text", () => {
    render(<span className="badge badge-high">High</span>);
    const badge = screen.getByText("High");
    expect(badge).toHaveClass("badge-high");
  });

  it("index.css defines .badge-high background as #ef4444 (not var(--p-high))", () => {
    const cssPath = resolve(__dirname, "../index.css");
    const css = readFileSync(cssPath, "utf-8");

    // Extract the .badge-high rule block
    const match = css.match(/\.badge-high\s*\{([^}]*)\}/);
    expect(match).not.toBeNull();

    const ruleBody = match[1];
    expect(ruleBody).toContain("#ef4444");
    expect(ruleBody).not.toContain("var(--p-high)");
  });
});

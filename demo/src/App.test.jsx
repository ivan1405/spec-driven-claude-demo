import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

describe("App theme", () => {
  // REQ-002: the app renders in light mode on every fresh load, before any
  // interaction with the toggle.
  it("renders in light mode on first render (REQ-002)", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });
});

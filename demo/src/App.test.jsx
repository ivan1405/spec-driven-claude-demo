import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";
import { _resetForTests } from "./api/tasks.js";

describe("App theme", () => {
  beforeEach(() => _resetForTests());

  it("REQ-002: renders in light mode on first load", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".app")).toHaveAttribute("data-theme", "light");
  });
});

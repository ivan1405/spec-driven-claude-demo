import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the brand name as 'My Spec Driven Board'", () => {
    render(<Header count={0} />);
    expect(screen.getByText("My Spec Driven Board")).toBeInTheDocument();
  });
});

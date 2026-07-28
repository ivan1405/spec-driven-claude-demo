import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm.jsx";

describe("TaskForm", () => {
  it("calls onCreate with the trimmed title and priority", () => {
    const onCreate = vi.fn();
    render(<TaskForm onCreate={onCreate} />);

    fireEvent.change(screen.getByLabelText(/new task/i), {
      target: { value: "  Add due dates  " },
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "high" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onCreate).toHaveBeenCalledWith({ title: "Add due dates", priority: "high" });
  });

  it("shows an error and does not submit when the title is empty", () => {
    const onCreate = vi.fn();
    render(<TaskForm onCreate={onCreate} />);

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onCreate).not.toHaveBeenCalled();
    expect(screen.getByText(/give the task a title/i)).toBeInTheDocument();
  });
});

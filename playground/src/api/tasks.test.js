import { describe, it, expect, beforeEach } from "vitest";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  _resetForTests,
} from "./tasks.js";

describe("tasks api", () => {
  beforeEach(() => _resetForTests());

  it("seeds with starter tasks", () => {
    expect(getTasks().length).toBeGreaterThan(0);
  });

  it("creates a task with defaults", () => {
    _resetForTests();
    const before = getTasks().length;
    const task = createTask({ title: "  Ship it  " });
    expect(task.title).toBe("Ship it");
    expect(task.priority).toBe("medium");
    expect(task.status).toBe("todo");
    expect(getTasks().length).toBe(before + 1);
  });

  it("rejects an empty title", () => {
    expect(() => createTask({ title: "   " })).toThrow(/title is required/);
  });

  it("rejects an invalid priority", () => {
    expect(() => createTask({ title: "x", priority: "urgent" })).toThrow(/invalid priority/);
  });

  it("updates status", () => {
    const task = createTask({ title: "move me" });
    const updated = updateTask(task.id, { status: "done" });
    expect(updated.status).toBe("done");
  });

  it("rejects an invalid status", () => {
    const task = createTask({ title: "x" });
    expect(() => updateTask(task.id, { status: "archived" })).toThrow(/invalid status/);
  });

  it("deletes a task", () => {
    const task = createTask({ title: "temp" });
    deleteTask(task.id);
    expect(getTasks().find((t) => t.id === task.id)).toBeUndefined();
  });
});

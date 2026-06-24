import { useState } from "react";
import { PRIORITIES } from "../api/tasks.js";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) {
      setError("Give the task a title.");
      return;
    }
    onCreate({ title: clean, priority });
    setTitle("");
    setPriority("medium");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={submit} noValidate>
      <div className="field grow">
        <label htmlFor="task-title">New task</label>
        <input
          id="task-title"
          type="text"
          placeholder="e.g. Add a due date to tasks"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-title-error" : undefined}
        />
        {error && (
          <p className="field-error" id="task-title-error">
            {error}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn primary">
        Add task
      </button>
    </form>
  );
}

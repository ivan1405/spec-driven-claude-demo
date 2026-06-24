import { STATUSES, STATUS_LABELS } from "../api/tasks.js";

export default function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <li className={`task priority-${task.priority}`}>
      <div className="task-head">
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
        <span className="task-id mono">#{task.id}</span>
      </div>

      <p className="task-title">{task.title}</p>

      <div className="task-actions">
        <label className="sr-only" htmlFor={`status-${task.id}`}>
          Status for {task.title}
        </label>
        <select
          id={`status-${task.id}`}
          className="status-select"
          value={task.status}
          onChange={(e) => onUpdate(task.id, { status: e.target.value })}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn ghost"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

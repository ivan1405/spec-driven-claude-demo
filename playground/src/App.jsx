import { useMemo, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  STATUSES,
  STATUS_LABELS,
} from "./api/tasks.js";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskItem from "./components/TaskItem.jsx";

export default function App() {
  const [tasks, setTasks] = useState(() => getTasks());
  const [priorityFilter, setPriorityFilter] = useState("all");

  const refresh = () => setTasks(getTasks());

  const handleCreate = (input) => {
    createTask(input);
    refresh();
  };

  const handleUpdate = (id, patch) => {
    updateTask(id, patch);
    refresh();
  };

  const handleDelete = (id) => {
    deleteTask(id);
    refresh();
  };

  const visible = useMemo(
    () =>
      priorityFilter === "all"
        ? tasks
        : tasks.filter((t) => t.priority === priorityFilter),
    [tasks, priorityFilter]
  );

  return (
    <div className="app">
      <Header count={tasks.length} />

      <main className="container">
        <TaskForm onCreate={handleCreate} />
        <FilterBar value={priorityFilter} onChange={setPriorityFilter} />

        <section className="board" aria-label="Task board">
          {STATUSES.map((status) => {
            const column = visible.filter((t) => t.status === status);
            return (
              <div className="column" key={status}>
                <h2 className="column-title">
                  {STATUS_LABELS[status]}
                  <span className="column-count">{column.length}</span>
                </h2>
                <ul className="task-list">
                  {column.length === 0 ? (
                    <li className="empty">Nothing here yet.</li>
                  ) : (
                    column.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

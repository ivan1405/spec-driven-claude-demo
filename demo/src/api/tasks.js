// Data-access layer for the task board.
//
// This is the "backend" boundary of the playground. The UI never touches storage
// directly — it calls these functions. Today they persist to localStorage; swapping in a
// real HTTP API later means changing only this file. The backend-dev agent owns it.

const STORAGE_KEY = "spec-workflow.tasks";

/** @typedef {"low"|"medium"|"high"} Priority */
/** @typedef {"todo"|"doing"|"done"} Status */
/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {Priority} priority
 * @property {Status} status
 * @property {number} createdAt  epoch ms
 */

export const PRIORITIES = /** @type {Priority[]} */ (["low", "medium", "high"]);
export const STATUSES = /** @type {Status[]} */ (["todo", "doing", "done"]);
export const STATUS_LABELS = { todo: "To do", doing: "In progress", done: "Done" };

// In-memory fallback so the module also works in environments without localStorage.
let memory = null;

function read() {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through to memory/seed */
  }
  if (memory) return memory;
  return seed();
}

function write(tasks) {
  memory = tasks;
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* memory already holds it */
  }
  return tasks;
}

function seed() {
  const now = Date.now();
  const tasks = [
    { id: id(), title: "Read the README and run the playground", priority: "high", status: "doing", createdAt: now - 3000 },
    { id: id(), title: "File a Jira/Trello ticket, then run /ticket <url>", priority: "high", status: "todo", createdAt: now - 2000 },
    { id: id(), title: "Watch the tech-lead gate, then a PR appear", priority: "medium", status: "todo", createdAt: now - 1000 },
  ];
  return write(tasks);
}

function id() {
  return Math.random().toString(36).slice(2, 9);
}

/** @returns {Task[]} newest-first by creation */
export function getTasks() {
  return [...read()].sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * @param {{title:string, priority?:Priority}} input
 * @returns {Task}
 */
export function createTask({ title, priority = "medium" }) {
  const clean = String(title ?? "").trim();
  if (!clean) throw new Error("title is required");
  if (!PRIORITIES.includes(priority)) throw new Error(`invalid priority: ${priority}`);
  const task = { id: id(), title: clean, priority, status: "todo", createdAt: Date.now() };
  write([...read(), task]);
  return task;
}

/**
 * @param {string} taskId
 * @param {Partial<Pick<Task,"title"|"priority"|"status">>} patch
 * @returns {Task}
 */
export function updateTask(taskId, patch) {
  const tasks = read();
  const i = tasks.findIndex((t) => t.id === taskId);
  if (i === -1) throw new Error(`task not found: ${taskId}`);
  if (patch.status && !STATUSES.includes(patch.status)) throw new Error(`invalid status: ${patch.status}`);
  if (patch.priority && !PRIORITIES.includes(patch.priority)) throw new Error(`invalid priority: ${patch.priority}`);
  if (patch.title !== undefined) {
    const clean = String(patch.title).trim();
    if (!clean) throw new Error("title cannot be empty");
    patch = { ...patch, title: clean };
  }
  const updated = { ...tasks[i], ...patch };
  tasks[i] = updated;
  write(tasks);
  return updated;
}

/** @param {string} taskId */
export function deleteTask(taskId) {
  write(read().filter((t) => t.id !== taskId));
}

/** Test helper: wipe state. */
export function _resetForTests() {
  memory = null;
  try {
    globalThis.localStorage?.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

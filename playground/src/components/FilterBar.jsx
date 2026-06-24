import { PRIORITIES } from "../api/tasks.js";

export default function FilterBar({ value, onChange }) {
  const options = ["all", ...PRIORITIES];
  return (
    <div className="filter-bar" role="group" aria-label="Filter by priority">
      <span className="filter-label">Priority</span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`chip ${value === opt ? "chip-active" : ""}`}
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

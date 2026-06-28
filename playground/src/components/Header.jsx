export default function Header({ count, isDark, onToggleTheme }) {
  return (
    <header className="masthead">
      <div className="container masthead-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            ▟▙
          </span>
          <span className="brand-name">My Spec Driven Board</span>
        </div>
        <p className="masthead-sub">
          A playground for the spec-driven ticket workflow ·{" "}
          <span className="mono">{count} tasks</span>
        </p>
        <button
          aria-label="Toggle colour theme"
          onClick={onToggleTheme}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "1px solid var(--line)",
            color: "var(--muted)",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius)",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          {isDark ? "☀ Light" : "☾ Dark"}
        </button>
      </div>
    </header>
  );
}

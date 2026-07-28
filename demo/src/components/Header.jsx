export default function Header({ count, theme = "light", onToggleTheme }) {
  const isDark = theme === "dark";
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
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
        </button>
      </div>
    </header>
  );
}

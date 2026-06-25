import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ count, theme, onToggleTheme }) {
  return (
    <header className="masthead">
      <div className="container masthead-inner">
        <div className="masthead-row">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              ▟▙
            </span>
            <span className="brand-name">My Spec Driven Board</span>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <p className="masthead-sub">
          A playground for the spec-driven ticket workflow ·{" "}
          <span className="mono">{count} tasks</span>
        </p>
      </div>
    </header>
  );
}

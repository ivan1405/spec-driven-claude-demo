import { SunIcon, MoonIcon } from "./ThemeIcons.jsx";

export default function Header({ count, theme, onToggle }) {
  const nextTheme = theme === "dark" ? "light" : "dark";

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
          onClick={onToggle}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}

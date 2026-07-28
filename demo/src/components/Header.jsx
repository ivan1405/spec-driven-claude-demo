export default function Header({ count, theme, onToggle }) {
  const isDark = theme === "dark";
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

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
          aria-label={toggleLabel}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-icon="sun"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      data-icon="moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

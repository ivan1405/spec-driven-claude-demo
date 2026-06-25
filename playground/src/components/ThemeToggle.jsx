function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="3.5" />
      <line x1="9" y1="1" x2="9" y2="3" />
      <line x1="9" y1="15" x2="9" y2="17" />
      <line x1="1" y1="9" x2="3" y2="9" />
      <line x1="15" y1="9" x2="17" y2="9" />
      <line x1="3.22" y1="3.22" x2="4.64" y2="4.64" />
      <line x1="13.36" y1="13.36" x2="14.78" y2="14.78" />
      <line x1="14.78" y1="3.22" x2="13.36" y2="4.64" />
      <line x1="4.64" y1="13.36" x2="3.22" y2="14.78" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15.5 11.5A7 7 0 0 1 6.5 2.5a7 7 0 1 0 9 9z" />
    </svg>
  );
}

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className="btn ghost theme-toggle"
      aria-label={label}
      title={label}
      aria-pressed={!isDark}
      onClick={onToggle}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

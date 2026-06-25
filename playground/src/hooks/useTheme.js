import { useCallback, useEffect, useState } from "react";

const DARK = "dark";
const LIGHT = "light";

export function useTheme() {
  const [theme, setTheme] = useState(DARK);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === DARK ? LIGHT : DARK));
  }, []);

  return { theme, toggle };
}

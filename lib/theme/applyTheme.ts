export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "ailabelremove-theme";
const LIGHT_COLOR = "#ffffff";
const DARK_COLOR = "#030712";

export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

export function setStoredTheme(theme: ThemePreference) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function resolveTheme(theme: ThemePreference): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

function updateThemeColorMeta(resolved: "light" | "dark") {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", resolved === "dark" ? DARK_COLOR : LIGHT_COLOR);
  }
}

export function applyTheme(theme: ThemePreference) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  updateThemeColorMeta(resolved);
}

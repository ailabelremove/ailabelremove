"use client";

import { useEffect, useState } from "react";
import {
  ThemePreference,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
} from "@/lib/theme/applyTheme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  function handleChange(next: ThemePreference) {
    setTheme(next);
    setStoredTheme(next);
    applyTheme(next);
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-gray-300 p-0.5 text-xs dark:border-gray-600">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleChange(opt.value)}
          aria-pressed={theme === opt.value}
          className={`rounded px-2 py-1 ${
            theme === opt.value
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
  }

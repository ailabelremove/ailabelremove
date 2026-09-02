"use client";

import type { CleaningMode } from "@/types/cleaning";

interface CleaningModeSelectorProps {
  mode: CleaningMode;
  onChange: (mode: CleaningMode) => void;
}

export default function CleaningModeSelector({
  mode,
  onChange,
}: CleaningModeSelectorProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Cleaning mode">
      <button
        type="button"
        role="radio"
        aria-checked={mode === "maximum"}
        onClick={() => onChange("maximum")}
        className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${
          mode === "maximum"
            ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
            : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
        }`}
      >
        Maximum Privacy
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === "custom"}
        onClick={() => onChange("custom")}
        className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${
          mode === "custom"
            ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
            : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
        }`}
      >
        Custom
      </button>
    </div>
  );
}

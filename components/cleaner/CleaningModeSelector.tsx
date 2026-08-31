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
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("maximum")}
        className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${
          mode === "maximum"
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 text-gray-700"
        }`}
      >
        Maximum Privacy
      </button>
      <button
        type="button"
        onClick={() => onChange("custom")}
        className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${
          mode === "custom"
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 text-gray-700"
        }`}
      >
        Custom
      </button>
    </div>
  );
}

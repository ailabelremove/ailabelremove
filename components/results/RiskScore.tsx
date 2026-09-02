"use client";

import { useState } from "react";
import type { RiskScoreResult } from "@/types/privacy";

interface RiskScoreProps {
  result: RiskScoreResult;
}

const LEVEL_STYLES: Record<string, string> = {
  low: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900",
  medium:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  high: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900",
};

const LEVEL_LABELS: Record<string, string> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
};

export default function RiskScore({ result }: RiskScoreProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-lg border p-3 ${LEVEL_STYLES[result.level]}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide">
            Privacy Risk
          </p>
          <p className="text-2xl font-bold">
            {result.score}
            <span className="text-sm font-normal">/100</span>
          </p>
        </div>
        <div className="text-right">
          <span className="rounded-full border px-2 py-0.5 text-xs font-semibold">
            {LEVEL_LABELS[result.level]}
          </span>
          <p className="mt-1 text-xs">
            {open ? "Hide breakdown ▲" : "How is this calculated? ▼"}
          </p>
        </div>
      </button>

      {open && (
        <div className="mt-3 border-t border-current/20 pt-3">
          {result.reasons.length === 0 ? (
            <p className="text-xs">
              No privacy-relevant metadata categories were detected.
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5 text-xs">
              {result.reasons.map((reason) => (
                <li
                  key={reason.label}
                  className="flex items-center justify-between"
                >
                  <span>
                    {reason.label} ({reason.fieldCount} field
                    {reason.fieldCount !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">+{reason.points}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-[11px] opacity-80">
            Score is calculated from the metadata actually detected in this
            image — not a guess.
          </p>
        </div>
      )}
    </div>
  );
}

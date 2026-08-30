"use client";

import { useState } from "react";
import type { MetadataField } from "@/types/metadata";

interface MetadataCategoryProps {
  category: string;
  fields: MetadataField[];
}

const RISK_STYLES: Record<string, string> = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function MetadataCategory({
  category,
  fields,
}: MetadataCategoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-900">{category}</span>
        <span className="text-sm text-gray-500">
          {fields.length} field{fields.length !== 1 ? "s" : ""} {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-2 pb-3">
          {fields.map((f, idx) => (
            <div
              key={`${f.field}-${idx}`}
              className={`rounded-md border p-2 text-xs ${RISK_STYLES[f.sensitivity]}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{f.field}</span>
                <span className="flex-shrink-0 uppercase tracking-wide">
                  {f.sensitivity} risk
                </span>
              </div>
              <p className="mt-1 break-words text-gray-700">
                {f.value || "(empty)"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

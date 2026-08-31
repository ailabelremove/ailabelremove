"use client";

import type { CleaningSelection } from "@/types/cleaning";

interface CustomCleaningOptionsProps {
  selection: CleaningSelection;
  onChange: (selection: CleaningSelection) => void;
}

const OPTIONS: { key: keyof CleaningSelection; label: string; help: string }[] = [
  {
    key: "removeExifGps",
    label: "Camera & location data (EXIF, GPS)",
    help: "Removes camera make/model, settings, and GPS location if present.",
  },
  {
    key: "removeXmp",
    label: "XMP data",
    help: "Removes Adobe-style XMP metadata, including editing history where present.",
  },
  {
    key: "removeIptc",
    label: "IPTC / caption data",
    help: "Removes captions, keywords, credit, and copyright fields. Applies mainly to JPEG.",
  },
  {
    key: "removeIcc",
    label: "Color profile (ICC)",
    help: "Removes the embedded ICC color profile.",
  },
];

export default function CustomCleaningOptions({
  selection,
  onChange,
}: CustomCleaningOptionsProps) {
  function toggle(key: keyof CleaningSelection) {
    onChange({ ...selection, [key]: !selection[key] });
  }

  return (
    <div className="flex flex-col gap-2">
      {OPTIONS.map((opt) => (
        <label
          key={opt.key}
          className="flex items-start gap-2 rounded-md border border-gray-200 p-2"
        >
          <input
            type="checkbox"
            checked={selection[opt.key]}
            onChange={() => toggle(opt.key)}
            className="mt-0.5"
          />
          <span>
            <span className="block text-xs font-medium text-gray-900">
              {opt.label}
            </span>
            <span className="block text-[11px] text-gray-500">{opt.help}</span>
          </span>
        </label>
      ))}
      <p className="text-[11px] text-gray-400">
        Not every category applies to every file format — options with no
        matching data in this image simply have no effect.
      </p>
    </div>
  );
}

import type { MetadataField, MetadataCategory } from "@/types/metadata";

// Maps exifreader's "expanded" output group keys to our categories.
const GROUP_CATEGORY_MAP: Record<string, MetadataCategory> = {
  exif: "EXIF",
  gps: "GPS",
  iptc: "IPTC",
  xmp: "XMP",
  icc: "ICC",
  pngText: "PNG",
  pngFile: "PNG",
  riff: "Other",
  mpf: "Other",
};

// Groups we intentionally never list field-by-field (large/binary/internal).
const EXCLUDED_GROUPS = new Set(["thumbnail", "file", "gif"]);

const HIGH_SENSITIVITY_NAMES = new Set([
  "GPSLatitude",
  "GPSLongitude",
  "GPSAltitude",
  "Latitude",
  "Longitude",
]);

const MEDIUM_SENSITIVITY_NAMES = new Set([
  "Make",
  "Model",
  "SerialNumber",
  "LensSerialNumber",
  "BodySerialNumber",
  "Software",
  "OwnerName",
  "CameraOwnerName",
  "Artist",
  "Copyright",
  "By-line",
  "Creator",
]);

function classify(groupKey: string, fieldName: string): "low" | "medium" | "high" {
  if (groupKey === "gps") return "high";
  if (HIGH_SENSITIVITY_NAMES.has(fieldName)) return "high";
  if (MEDIUM_SENSITIVITY_NAMES.has(fieldName)) return "medium";
  if (groupKey === "iptc" || groupKey === "xmp") return "medium";
  return "low";
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(stringifyValue).join(", ");
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function extractDisplayValue(entry: unknown): string {
  if (entry === null || entry === undefined) return "";
  if (
    typeof entry === "string" ||
    typeof entry === "number" ||
    typeof entry === "boolean"
  ) {
    return String(entry);
  }
  if (typeof entry === "object") {
    const obj = entry as Record<string, unknown>;
    if (typeof obj.description === "string") return obj.description;
    if ("value" in obj) return stringifyValue(obj.value);
    try {
      return JSON.stringify(obj);
    } catch {
      return String(obj);
    }
  }
  return String(entry);
}

export function buildMetadataFields(
  expandedTags: Record<string, unknown> | undefined
): MetadataField[] {
  if (!expandedTags) return [];
  const fields: MetadataField[] = [];

  for (const groupKey of Object.keys(expandedTags)) {
    if (EXCLUDED_GROUPS.has(groupKey)) continue;

    const category = GROUP_CATEGORY_MAP[groupKey];
    if (!category) continue;

    const groupValue = expandedTags[groupKey];
    if (!groupValue || typeof groupValue !== "object") continue;

    for (const fieldName of Object.keys(groupValue as Record<string, unknown>)) {
      if (fieldName === "_raw") continue; // skip raw XMP packet dump

      const rawEntry = (groupValue as Record<string, unknown>)[fieldName];
      const displayValue = extractDisplayValue(rawEntry);
      if (!displayValue) continue;

      fields.push({
        category,
        field: fieldName,
        value: displayValue,
        sensitivity: classify(groupKey, fieldName),
        removable: true,
      });
    }
  }

  return fields;
                                              }

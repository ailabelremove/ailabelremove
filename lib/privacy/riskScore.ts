import type { MetadataField } from "@/types/metadata";
import type { RiskScoreResult, RiskReason, RiskLevel } from "@/types/privacy";

interface BucketDefinition {
  label: string;
  base: number;
  increment: number;
  cap: number;
  matches: (field: MetadataField) => boolean;
}

const LOCATION_MATCH = (f: MetadataField) => f.category === "GPS";

const DEVICE_IDENTITY_NAMES = new Set([
  "Make",
  "Model",
  "LensMake",
  "LensModel",
  "SerialNumber",
  "LensSerialNumber",
  "BodySerialNumber",
  "InternalSerialNumber",
]);

const PERSONAL_IDENTITY_NAMES = new Set([
  "Artist",
  "OwnerName",
  "CameraOwnerName",
  "Creator",
  "By-line",
  "Author",
  "Writer-Editor",
]);

const COPYRIGHT_NAMES = new Set([
  "Copyright",
  "Rights",
  "CopyrightNotice",
  "UsageTerms",
]);

const TIMESTAMP_NAMES = new Set([
  "DateTimeOriginal",
  "CreateDate",
  "ModifyDate",
  "DateTime",
  "DateCreated",
  "Last Modified",
  "SubSecTimeOriginal",
]);

const SOFTWARE_NAMES = new Set([
  "Software",
  "ProcessingSoftware",
  "CreatorTool",
  "HistorySoftwareAgent",
]);

function isBucketed(field: MetadataField): boolean {
  return (
    field.category === "C2PA" ||
    LOCATION_MATCH(field) ||
    DEVICE_IDENTITY_NAMES.has(field.field) ||
    PERSONAL_IDENTITY_NAMES.has(field.field) ||
    COPYRIGHT_NAMES.has(field.field) ||
    TIMESTAMP_NAMES.has(field.field) ||
    SOFTWARE_NAMES.has(field.field)
  );
}

const BUCKETS: BucketDefinition[] = [
  {
    label: "AI Content Credentials (C2PA)",
    base: 25,
    increment: 5,
    cap: 30,
    matches: (f) => f.category === "C2PA",
  },
  {
    label: "Location (GPS)",
    base: 30,
    increment: 3,
    cap: 35,
    matches: LOCATION_MATCH,
  },
  {
    label: "Device identity",
    base: 8,
    increment: 4,
    cap: 20,
    matches: (f) => DEVICE_IDENTITY_NAMES.has(f.field),
  },
  {
    label: "Personal identity",
    base: 8,
    increment: 4,
    cap: 20,
    matches: (f) => PERSONAL_IDENTITY_NAMES.has(f.field),
  },
  {
    label: "Copyright / creator info",
    base: 3,
    increment: 1,
    cap: 7,
    matches: (f) => COPYRIGHT_NAMES.has(f.field),
  },
  {
    label: "Timestamp",
    base: 4,
    increment: 2,
    cap: 10,
    matches: (f) => TIMESTAMP_NAMES.has(f.field),
  },
  {
    label: "Software / editing history",
    base: 4,
    increment: 2,
    cap: 8,
    matches: (f) => SOFTWARE_NAMES.has(f.field),
  },
  {
    label: "Other sensitive metadata",
    base: 3,
    increment: 2,
    cap: 15,
    matches: (f) =>
      !isBucketed(f) && (f.sensitivity === "medium" || f.sensitivity === "high"),
  },
];

function levelFromScore(score: number): RiskLevel {
  if (score >= 50) return "high";
  if (score >= 20) return "medium";
  return "low";
}

export function calculateRiskScore(fields: MetadataField[]): RiskScoreResult {
  const reasons: RiskReason[] = [];
  let total = 0;

  for (const bucket of BUCKETS) {
    const matched = fields.filter(bucket.matches);
    if (matched.length === 0) continue;

    const raw = bucket.base + (matched.length - 1) * bucket.increment;
    const points = Math.min(raw, bucket.cap);

    reasons.push({
      label: bucket.label,
      fieldCount: matched.length,
      points,
    });

    total += points;
  }

  const score = Math.min(Math.round(total), 100);

  return {
    score,
    level: levelFromScore(score),
    reasons: reasons.sort((a, b) => b.points - a.points),
  };
}

import type { AnalysisResult, MetadataCategory } from "@/types/metadata";
import type { CleaningSelection } from "@/types/cleaning";
import type { VerificationResult, CategoryVerification } from "@/types/verification";

const ALL_CATEGORIES: MetadataCategory[] = [
  "EXIF",
  "GPS",
  "XMP",
  "IPTC",
  "PNG",
  "ICC",
  "Other",
];

function wasCategoryRequested(
  category: MetadataCategory,
  selection: CleaningSelection
): boolean {
  switch (category) {
    case "EXIF":
    case "GPS":
      return selection.removeExifGps;
    case "XMP":
      return selection.removeXmp;
    case "IPTC":
      return selection.removeIptc;
    case "ICC":
      return selection.removeIcc;
    case "PNG":
      return selection.removeExifGps || selection.removeXmp;
    default:
      return false;
  }
}

export function buildVerification(
  before: AnalysisResult,
  after: AnalysisResult,
  selection: CleaningSelection
): VerificationResult {
  const categories: CategoryVerification[] = [];

  for (const category of ALL_CATEGORIES) {
    const beforeCount = before.fields.filter(
      (f) => f.category === category
    ).length;
    if (beforeCount === 0) continue;

    const afterCount = after.fields.filter(
      (f) => f.category === category
    ).length;
    const wasRequested = wasCategoryRequested(category, selection);

    let status: CategoryVerification["status"];
    if (!wasRequested) {
      status = "unaffected";
    } else if (afterCount === 0) {
      status = "removed";
    } else {
      status = "remains";
    }

    categories.push({ category, beforeCount, afterCount, wasRequested, status });
  }

  return {
    categories,
    totalBefore: before.totalCount,
    totalAfter: after.totalCount,
    fullyClean: after.totalCount === 0,
  };
}

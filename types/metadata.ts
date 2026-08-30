export type MetadataCategory =
  | "EXIF"
  | "GPS"
  | "XMP"
  | "IPTC"
  | "PNG"
  | "ICC"
  | "Other";

export interface MetadataField {
  category: MetadataCategory;
  field: string;
  value: string;
  sensitivity: "low" | "medium" | "high";
  removable: boolean;
}

export interface AnalysisResult {
  fields: MetadataField[];
  totalCount: number;
  format: string;
}

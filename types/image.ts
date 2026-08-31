import type { AnalysisResult } from "./metadata";
import type { RiskScoreResult } from "./privacy";
import type { CleaningMode, CleaningSelection } from "./cleaning";

export type ImageStatus =
  | "waiting"
  | "scanning"
  | "analyzing"
  | "ready"
  | "cleaning"
  | "verifying"
  | "complete"
  | "failed";

export interface QueuedImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeBytes: number;
  format: string;
  status: ImageStatus;
  errorMessage?: string;
  metadataCount?: number;
  analysisResult?: AnalysisResult;
  riskScore?: RiskScoreResult;
  cleaningMode: CleaningMode;
  cleaningSelection: CleaningSelection;
  cleanedBlob?: Blob;
  cleanedUrl?: string;
  cleanedSizeBytes?: number;
  cleanErrorMessage?: string;
}

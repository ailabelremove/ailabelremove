import type { AnalysisResult } from "./metadata";
import type { RiskScoreResult } from "./privacy";

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
}

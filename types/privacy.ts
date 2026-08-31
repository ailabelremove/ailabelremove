export type RiskLevel = "low" | "medium" | "high";

export interface RiskReason {
  label: string;
  fieldCount: number;
  points: number;
}

export interface RiskScoreResult {
  score: number;
  level: RiskLevel;
  reasons: RiskReason[];
}

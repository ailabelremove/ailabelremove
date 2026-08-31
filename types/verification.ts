import type { MetadataCategory } from "./metadata";

export type CategoryVerificationStatus = "removed" | "remains" | "unaffected";

export interface CategoryVerification {
  category: MetadataCategory;
  beforeCount: number;
  afterCount: number;
  wasRequested: boolean;
  status: CategoryVerificationStatus;
}

export interface VerificationResult {
  categories: CategoryVerification[];
  totalBefore: number;
  totalAfter: number;
  fullyClean: boolean;
}

import type { VerificationResult } from "@/types/verification";
import type { RiskScoreResult } from "@/types/privacy";

interface BeforeAfterComparisonProps {
  verification: VerificationResult;
  riskBefore?: RiskScoreResult;
  riskAfter?: RiskScoreResult;
}

export default function BeforeAfterComparison({
  verification,
  riskBefore,
  riskAfter,
}: BeforeAfterComparisonProps) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-200 p-3 text-center">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          Metadata fields
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-900">
          {verification.totalBefore}{" "}
          <span className="text-gray-400">→</span> {verification.totalAfter}
        </p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          Privacy Risk
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-900">
          {riskBefore ? riskBefore.score : "–"}{" "}
          <span className="text-gray-400">→</span>{" "}
          {riskAfter ? riskAfter.score : "–"}
        </p>
      </div>
    </div>
  );
}

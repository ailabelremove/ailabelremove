"use client";

import { useState } from "react";
import { QueuedImage } from "@/types/image";
import { formatFileSize } from "@/lib/image/validation";
import MetadataPanel from "@/components/metadata/MetadataPanel";
import RiskScore from "@/components/results/RiskScore";
import CleaningModeSelector from "@/components/cleaner/CleaningModeSelector";
import CustomCleaningOptions from "@/components/cleaner/CustomCleaningOptions";
import BeforeAfterComparison from "@/components/results/BeforeAfterComparison";
import VerificationResultPanel from "@/components/results/VerificationResult";
import type { CleaningMode, CleaningSelection } from "@/types/cleaning";

interface ImageCardProps {
  image: QueuedImage;
  onRemove: (id: string) => void;
  onCleaningModeChange: (id: string, mode: CleaningMode) => void;
  onCleaningSelectionChange: (id: string, selection: CleaningSelection) => void;
  onClean: (id: string) => void;
}

const STATUS_LABELS: Record<QueuedImage["status"], string> = {
  waiting: "Waiting",
  scanning: "Scanning",
  analyzing: "Analyzing",
  ready: "Ready",
  cleaning: "Cleaning",
  verifying: "Verifying",
  complete: "Complete",
  failed: "Failed",
};

function buildCleanedFilename(originalName: string): string {
  const dotIndex = originalName.lastIndexOf(".");
  if (dotIndex === -1) return `${originalName}-cleaned`;
  return `${originalName.slice(0, dotIndex)}-cleaned${originalName.slice(dotIndex)}`;
}

export default function ImageCard({
  image,
  onRemove,
  onCleaningModeChange,
  onCleaningSelectionChange,
  onClean,
}: ImageCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const hasResult = !!image.analysisResult && image.status !== "failed";
  const isCleaning = image.status === "cleaning";
  const isVerifying = image.status === "verifying";
  const isCleaned = !!image.cleanedUrl;

  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="flex items-center gap-3">
        <img
          src={image.previewUrl}
          alt={image.name}
          className="h-14 w-14 flex-shrink-0 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {image.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(image.sizeBytes)} · {image.format}
          </p>
          <p
            className={`mt-1 text-xs font-medium ${
              image.status === "failed" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {STATUS_LABELS[image.status]}
            {image.status === "failed" && image.errorMessage
              ? `: ${image.errorMessage}`
              : ""}
            {hasResult
              ? ` · ${image.analysisResult!.totalCount} metadata field${
                  image.analysisResult!.totalCount !== 1 ? "s" : ""
                }`
              : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          aria-label={`Remove ${image.name}`}
          className="flex-shrink-0 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Remove
        </button>
      </div>

      {/* Cleaned result now shown right away, near the top, before metadata/risk details */}
      {isCleaned && (
        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-xs font-medium text-green-800">
            ✓ Cleaned — {formatFileSize(image.sizeBytes)} →{" "}
            {image.cleanedSizeBytes
              ? formatFileSize(image.cleanedSizeBytes)
              : "?"}
          </p>
          <a
            href={image.cleanedUrl}
            download={buildCleanedFilename(image.name)}
            className="mt-2 inline-block w-full rounded-md bg-green-700 py-2.5 text-center text-sm font-semibold text-white"
          >
            Download Cleaned Image
          </a>
        </div>
      )}

      {isVerifying && (
        <p className="mt-3 text-xs text-gray-500">Verifying…</p>
      )}

      {hasResult && image.riskScore && (
        <div className="mt-3">
          <RiskScore result={image.riskScore} />
        </div>
      )}

      {hasResult && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowDetails((s) => !s)}
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            {showDetails ? "Hide metadata" : "View metadata"}
          </button>
          {showDetails && <MetadataPanel result={image.analysisResult} />}
        </div>
      )}

      {hasResult && !isCleaned && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs font-medium text-gray-700">Clean this image</p>
          <p className="mt-1 text-[11px] text-gray-500">
            Metadata segments are removed directly from the file — your image
            pixels are not re-encoded or re-compressed.
          </p>
          <div className="mt-2">
            <CleaningModeSelector
              mode={image.cleaningMode}
              onChange={(mode) => onCleaningModeChange(image.id, mode)}
            />
          </div>
          {image.cleaningMode === "custom" && (
            <div className="mt-2">
              <CustomCleaningOptions
                selection={image.cleaningSelection}
                onChange={(sel) => onCleaningSelectionChange(image.id, sel)}
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => onClean(image.id)}
            disabled={isCleaning}
            className="mt-3 w-full rounded-md bg-gray-900 py-2 text-xs font-medium text-white disabled:opacity-50"
          >
            {isCleaning ? "Cleaning…" : "Clean Image"}
          </button>
          {image.cleanErrorMessage && (
            <p className="mt-1 text-xs text-red-600">
              {image.cleanErrorMessage}
            </p>
          )}
        </div>
      )}

      {isCleaned && image.verification && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          <div>
            <BeforeAfterComparison
              verification={image.verification}
              riskBefore={image.riskScore}
              riskAfter={image.cleanedRiskScore}
            />
          </div>
          <VerificationResultPanel verification={image.verification} />
        </div>
      )}
    </div>
  );
          }

"use client";

import { useRef, useState } from "react";
import UploadZone from "@/components/upload/UploadZone";
import FileQueue from "@/components/upload/FileQueue";
import BatchDashboard from "@/components/batch/BatchDashboard";
import { QueuedImage } from "@/types/image";
import { validateImageFile, getFormatLabel } from "@/lib/image/validation";
import { generateId } from "@/lib/utils/id";
import { analyzeImage } from "@/lib/metadata/analyze";
import { calculateRiskScore } from "@/lib/privacy/riskScore";
import { cleanImage } from "@/lib/image/cleanRunner";
import { buildVerification } from "@/lib/metadata/verify";
import { getConcurrencyLimit } from "@/lib/batch/concurrency";
import { runWithConcurrency } from "@/lib/batch/runBatch";
import { buildZip } from "@/lib/batch/zip";
import type { BatchState } from "@/types/batch";
import {
  CleaningMode,
  CleaningSelection,
  MAXIMUM_PRIVACY_SELECTION,
  DEFAULT_CUSTOM_SELECTION,
} from "@/types/cleaning";

export default function CheckerPage() {
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [batchState, setBatchState] = useState<BatchState>({
    status: "idle",
    completed: 0,
    failed: 0,
    total: 0,
  });

  const pausedRef = useRef(false);
  const cancelledRef = useRef(false);
  const imagesRef = useRef<QueuedImage[]>([]);
  imagesRef.current = images;

  function updateImage(id: string, patch: Partial<QueuedImage>) {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...patch } : img))
    );
  }

  function runAnalysis(id: string, file: File) {
    updateImage(id, { status: "scanning" });
    analyzeImage(id, file)
      .then((result) => {
        const riskScore = calculateRiskScore(result.fields);
        updateImage(id, {
          status: "ready",
          analysisResult: result,
          metadataCount: result.totalCount,
          riskScore,
        });
      })
      .catch((error: Error) => {
        updateImage(id, {
          status: "failed",
          errorMessage: error.message,
        });
      });
  }

  function handleFilesSelected(files: File[]) {
    const newImages: QueuedImage[] = files.map((file) => {
      const validation = validateImageFile(file);
      return {
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        sizeBytes: file.size,
        format: getFormatLabel(file),
        status: validation.valid ? "waiting" : "failed",
        errorMessage: validation.errorMessage,
        cleaningMode: "maximum" as CleaningMode,
        cleaningSelection: DEFAULT_CUSTOM_SELECTION,
      };
    });

    setImages((prev) => [...prev, ...newImages]);

    newImages
      .filter((img) => img.status === "waiting")
      .forEach((img) => runAnalysis(img.id, img.file));
  }

  function handleRemove(id: string) {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.cleanedUrl) URL.revokeObjectURL(target.cleanedUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  }

  function handleClearAll() {
    images.forEach((img) => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.cleanedUrl) URL.revokeObjectURL(img.cleanedUrl);
    });
    setImages([]);
    setBatchState({ status: "idle", completed: 0, failed: 0, total: 0 });
  }

  function handleCleaningModeChange(id: string, mode: CleaningMode) {
    updateImage(id, { cleaningMode: mode });
  }

  function handleCleaningSelectionChange(
    id: string,
    selection: CleaningSelection
  ) {
    updateImage(id, { cleaningSelection: selection });
  }

  async function cleanSingleImage(target: QueuedImage): Promise<boolean> {
    if (!target.analysisResult) return false;

    const selection =
      target.cleaningMode === "maximum"
        ? MAXIMUM_PRIVACY_SELECTION
        : target.cleaningSelection;

    updateImage(target.id, {
      status: "cleaning",
      cleanErrorMessage: undefined,
    });

    try {
      const blob = await cleanImage(target.id, target.file, selection);
      const cleanedUrl = URL.createObjectURL(blob);
      updateImage(target.id, {
        status: "verifying",
        cleanedBlob: blob,
        cleanedUrl,
        cleanedSizeBytes: blob.size,
      });

      const cleanedFile = new File([blob], target.name, {
        type: target.file.type,
      });
      const cleanedResult = await analyzeImage(
        `${target.id}-verify`,
        cleanedFile
      );
      const cleanedRiskScore = calculateRiskScore(cleanedResult.fields);
      const verification = buildVerification(
        target.analysisResult,
        cleanedResult,
        selection
      );

      updateImage(target.id, {
        status: "ready",
        cleanedAnalysisResult: cleanedResult,
        cleanedRiskScore,
        verification,
      });
      return true;
    } catch (error) {
      updateImage(target.id, {
        status: "ready",
        cleanErrorMessage:
          error instanceof Error ? error.message : "Cleaning failed.",
      });
      return false;
    }
  }

  function handleClean(id: string) {
    const target = imagesRef.current.find((img) => img.id === id);
    if (target) cleanSingleImage(target);
  }

  async function runBatch(targets: QueuedImage[]) {
    if (targets.length === 0) return;

    cancelledRef.current = false;
    pausedRef.current = false;
    setBatchState({
      status: "running",
      completed: 0,
      failed: 0,
      total: targets.length,
    });

    const concurrency = getConcurrencyLimit();

    await runWithConcurrency(
      targets,
      concurrency,
      { paused: pausedRef, cancelled: cancelledRef },
      async (target) => {
        const success = await cleanSingleImage(target);
        setBatchState((prev) => ({
          ...prev,
          completed: prev.completed + (success ? 1 : 0),
          failed: prev.failed + (success ? 0 : 1),
        }));
      }
    );

    setBatchState((prev) => ({
      ...prev,
      status: cancelledRef.current ? "idle" : "complete",
    }));
  }

  function handleCleanAll() {
    const targets = imagesRef.current.filter(
      (img) => img.status === "ready" && !img.cleanedUrl && img.analysisResult
    );
    runBatch(targets);
  }

  function handleRetryFailed() {
    const targets = imagesRef.current.filter(
      (img) =>
        img.status === "ready" && img.cleanErrorMessage && !img.cleanedUrl
    );
    runBatch(targets);
  }

  function handlePauseResume() {
    pausedRef.current = !pausedRef.current;
    setBatchState((prev) => ({
      ...prev,
      status: pausedRef.current ? "paused" : "running",
    }));
  }

  function handleCancelBatch() {
    cancelledRef.current = true;
    setBatchState((prev) => ({ ...prev, status: "idle" }));
  }

  async function handleDownloadZip() {
    const zipBlob = await buildZip(imagesRef.current);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ailabelremove-cleaned-images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const hasCleanable = images.some(
    (img) => img.status === "ready" && !img.cleanedUrl && img.analysisResult
  );
  const hasFailed = images.some(
    (img) => img.status === "ready" && img.cleanErrorMessage && !img.cleanedUrl
  );
  const hasCleaned = images.some((img) => !!img.cleanedBlob);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Metadata Checker
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Upload images to inspect their metadata. Nothing is uploaded to a
        server — everything happens in your browser.
      </p>

      <div className="mt-6">
        <UploadZone onFilesSelected={handleFilesSelected} />
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          <BatchDashboard
            batchState={batchState}
            hasCleanable={hasCleanable}
            hasFailed={hasFailed}
            hasCleaned={hasCleaned}
            onCleanAll={handleCleanAll}
            onPauseResume={handlePauseResume}
            onCancel={handleCancelBatch}
            onRetryFailed={handleRetryFailed}
            onDownloadZip={handleDownloadZip}
          />
        </div>
      )}

      <FileQueue
        images={images}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
        onCleaningModeChange={handleCleaningModeChange}
        onCleaningSelectionChange={handleCleaningSelectionChange}
        onClean={handleClean}
        onDownloadZip={handleDownloadZip}
      />
    </main>
  );
    }
    

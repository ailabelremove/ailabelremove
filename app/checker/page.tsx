"use client";

import { useState } from "react";
import UploadZone from "@/components/upload/UploadZone";
import FileQueue from "@/components/upload/FileQueue";
import { QueuedImage } from "@/types/image";
import { validateImageFile, getFormatLabel } from "@/lib/image/validation";
import { generateId } from "@/lib/utils/id";
import { analyzeImage } from "@/lib/metadata/analyze";
import { calculateRiskScore } from "@/lib/privacy/riskScore";

export default function CheckerPage() {
  const [images, setImages] = useState<QueuedImage[]>([]);

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
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  }

  function handleClearAll() {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  }

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

      <FileQueue
        images={images}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
      />
    </main>
  );
}

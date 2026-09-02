"use client";

import { QueuedImage } from "@/types/image";
import type { CleaningMode, CleaningSelection } from "@/types/cleaning";
import ImageCard from "./ImageCard";

interface FileQueueProps {
  images: QueuedImage[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onCleaningModeChange: (id: string, mode: CleaningMode) => void;
  onCleaningSelectionChange: (id: string, selection: CleaningSelection) => void;
  onClean: (id: string) => void;
  onDownloadZip?: () => void;
}

export default function FileQueue({
  images,
  onRemove,
  onClearAll,
  onCleaningModeChange,
  onCleaningSelectionChange,
  onClean,
  onDownloadZip,
}: FileQueueProps) {
  if (images.length === 0) return null;

  const showZipLink = images.length > 1;

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {images.length} image{images.length > 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onRemove={onRemove}
            onCleaningModeChange={onCleaningModeChange}
            onCleaningSelectionChange={onCleaningSelectionChange}
            onClean={onClean}
            onDownloadZip={onDownloadZip}
            showZipLink={showZipLink}
          />
        ))}
      </div>
    </div>
  );
}

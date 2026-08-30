"use client";

import { QueuedImage } from "@/types/image";
import { formatFileSize } from "@/lib/image/validation";

interface ImageCardProps {
  image: QueuedImage;
  onRemove: (id: string) => void;
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

export default function ImageCard({ image, onRemove }: ImageCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
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
  );
}

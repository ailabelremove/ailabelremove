"use client";

import { QueuedImage } from "@/types/image";
import ImageCard from "./ImageCard";

interface FileQueueProps {
  images: QueuedImage[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export default function FileQueue({
  images,
  onRemove,
  onClearAll,
}: FileQueueProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          {images.length} image{images.length > 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

import JSZip from "jszip";
import type { QueuedImage } from "@/types/image";

function buildCleanedFilename(originalName: string): string {
  const dotIndex = originalName.lastIndexOf(".");
  if (dotIndex === -1) return `${originalName}-cleaned`;
  return `${originalName.slice(0, dotIndex)}-cleaned${originalName.slice(dotIndex)}`;
}

export async function buildZip(images: QueuedImage[]): Promise<Blob> {
  const zip = new JSZip();
  const cleanedImages = images.filter((img) => img.cleanedBlob);

  for (const img of cleanedImages) {
    const filename = buildCleanedFilename(img.name);
    zip.file(filename, img.cleanedBlob as Blob);
  }

  return zip.generateAsync({ type: "blob" });
}

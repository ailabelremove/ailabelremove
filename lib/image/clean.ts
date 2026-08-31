import { stripJpegMetadata } from "./jpegStrip";
import { stripPngMetadata } from "./pngStrip";
import { stripWebpMetadata } from "./webpStrip";
import type { CleaningSelection } from "@/types/cleaning";

export async function cleanImageFile(
  file: File,
  selection: CleaningSelection
): Promise<Blob> {
  const buffer = await file.arrayBuffer();

  if (file.type === "image/jpeg") {
    const cleaned = stripJpegMetadata(buffer, {
      removeExif: selection.removeExifGps,
      removeXmp: selection.removeXmp,
      removeIptc: selection.removeIptc,
      removeIcc: selection.removeIcc,
    });
    return new Blob([cleaned], { type: "image/jpeg" });
  }

  if (file.type === "image/png") {
    const cleaned = stripPngMetadata(buffer, {
      removeTextChunks: selection.removeExifGps || selection.removeXmp,
      removeExif: selection.removeExifGps,
      removeIcc: selection.removeIcc,
      removeTime: selection.removeExifGps,
    });
    return new Blob([cleaned], { type: "image/png" });
  }

  if (file.type === "image/webp") {
    const cleaned = stripWebpMetadata(buffer, {
      removeExif: selection.removeExifGps,
      removeXmp: selection.removeXmp,
      removeIcc: selection.removeIcc,
    });
    return new Blob([cleaned], { type: "image/webp" });
  }

  throw new Error(`Cleaning is not supported for file type "${file.type}".`);
}

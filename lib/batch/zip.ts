import JSZip from "jszip";
import type { QueuedImage } from "@/types/image";
import { buildCleanedFilename } from "@/lib/utils/filenames";

export async function buildZip(images: QueuedImage[]): Promise<Blob> {
  const zip = new JSZip();
  const cleanedImages = images.filter((img) => img.cleanedBlob);
  const usedNames = new Set<string>();

  for (const img of cleanedImages) {
    let filename = buildCleanedFilename(img.name);
    let counter = 2;
    while (usedNames.has(filename)) {
      filename = `${buildCleanedFilename(img.name).replace(/(\.[^.]+)?$/, "")}-${counter}${
        filename.match(/\.[^.]+$/)?.[0] || ""
      }`;
      counter += 1;
    }
    usedNames.add(filename);
    zip.file(filename, img.cleanedBlob as Blob);
  }

  return zip.generateAsync({ type: "blob" });
}

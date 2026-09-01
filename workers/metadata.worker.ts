export {};

import ExifReader from "exifreader";
import { buildMetadataFields } from "../lib/metadata/normalize";
import { detectJpegC2pa, detectPngC2pa, detectWebpC2pa } from "../lib/metadata/c2pa";
import type { AnalysisResult, MetadataField } from "../types/metadata";

interface WorkerRequest {
  id: string;
  file: File;
}

const ctx = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { id, file } = event.data;

  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const tags = await ExifReader.load(buffer, {
      expanded: true,
      async: true,
    });

    const exifFields = buildMetadataFields(
      tags as unknown as Record<string, unknown>
    );

    let c2paFields: MetadataField[] = [];
    if (file.type === "image/jpeg") {
      c2paFields = detectJpegC2pa(bytes);
    } else if (file.type === "image/png") {
      c2paFields = detectPngC2pa(bytes);
    } else if (file.type === "image/webp") {
      c2paFields = detectWebpC2pa(bytes);
    }

    const fields = [...exifFields, ...c2paFields];

    const result: AnalysisResult = {
      fields,
      totalCount: fields.length,
      format: file.type || "Unknown",
    };

    ctx.postMessage({ id, success: true, result });
  } catch (error) {
    ctx.postMessage({
      id,
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "Failed to analyze metadata for this image.",
    });
  }
};

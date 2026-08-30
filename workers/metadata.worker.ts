export {};

import ExifReader from "exifreader";
import { buildMetadataFields } from "../lib/metadata/normalize";
import type { AnalysisResult } from "../types/metadata";

interface WorkerRequest {
  id: string;
  file: File;
}

// Cast avoids needing the "webworker" TS lib alongside "dom".
const ctx = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { id, file } = event.data;

  try {
    const tags = await ExifReader.load(file, {
      expanded: true,
      async: true,
    });

    const fields = buildMetadataFields(
      tags as unknown as Record<string, unknown>
    );

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

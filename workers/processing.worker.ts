export {};

import { cleanImageFile } from "../lib/image/clean";
import type { CleaningSelection } from "../types/cleaning";

interface WorkerRequest {
  id: string;
  file: File;
  selection: CleaningSelection;
}

const ctx = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { id, file, selection } = event.data;

  try {
    const blob = await cleanImageFile(file, selection);
    ctx.postMessage({ id, success: true, blob });
  } catch (error) {
    ctx.postMessage({
      id,
      success: false,
      errorMessage:
        error instanceof Error ? error.message : "Failed to clean this image.",
    });
  }
};

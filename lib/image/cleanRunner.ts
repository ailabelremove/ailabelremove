import type { CleaningSelection } from "@/types/cleaning";

interface CleanWorkerResponse {
  id: string;
  success: boolean;
  blob?: Blob;
  errorMessage?: string;
}

let worker: Worker | null = null;
const pending = new Map<
  string,
  { resolve: (b: Blob) => void; reject: (e: Error) => void }
>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(
      new URL("../../workers/processing.worker.ts", import.meta.url)
    );
    worker.onmessage = (event: MessageEvent<CleanWorkerResponse>) => {
      const { id, success, blob, errorMessage } = event.data;
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      if (success && blob) {
        entry.resolve(blob);
      } else {
        entry.reject(new Error(errorMessage || "Cleaning failed."));
      }
    };
  }
  return worker;
}

export function cleanImage(
  id: string,
  file: File,
  selection: CleaningSelection
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    getWorker().postMessage({ id, file, selection });
  });
}

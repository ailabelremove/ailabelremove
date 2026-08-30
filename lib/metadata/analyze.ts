import type { AnalysisResult } from "@/types/metadata";

interface WorkerResponse {
  id: string;
  success: boolean;
  result?: AnalysisResult;
  errorMessage?: string;
}

let worker: Worker | null = null;
const pending = new Map<
  string,
  { resolve: (r: AnalysisResult) => void; reject: (e: Error) => void }
>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(
      new URL("../../workers/metadata.worker.ts", import.meta.url)
    );
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { id, success, result, errorMessage } = event.data;
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      if (success && result) {
        entry.resolve(result);
      } else {
        entry.reject(new Error(errorMessage || "Metadata analysis failed."));
      }
    };
  }
  return worker;
}

export function analyzeImage(id: string, file: File): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    getWorker().postMessage({ id, file });
  });
}

export type BatchStatus = "idle" | "running" | "paused" | "complete";

export interface BatchState {
  status: BatchStatus;
  completed: number;
  failed: number;
  total: number;
}

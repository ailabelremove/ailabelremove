"use client";

import type { BatchState } from "@/types/batch";

interface BatchDashboardProps {
  batchState: BatchState;
  hasCleanable: boolean;
  hasFailed: boolean;
  hasCleaned: boolean;
  onCleanAll: () => void;
  onPauseResume: () => void;
  onCancel: () => void;
  onRetryFailed: () => void;
  onDownloadZip: () => void;
}

export default function BatchDashboard({
  batchState,
  hasCleanable,
  hasFailed,
  hasCleaned,
  onCleanAll,
  onPauseResume,
  onCancel,
  onRetryFailed,
  onDownloadZip,
}: BatchDashboardProps) {
  const isRunning = batchState.status === "running";
  const isPaused = batchState.status === "paused";
  const isActive = isRunning || isPaused;

  return (
    <div className="mb-4 rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Batch actions</p>
        {isActive && (
          <p className="text-xs text-gray-500">
            {batchState.completed + batchState.failed} of {batchState.total}
          </p>
        )}
      </div>

      {isActive && (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-gray-900 transition-all"
            style={{
              width: `${
                batchState.total === 0
                  ? 0
                  : ((batchState.completed + batchState.failed) /
                      batchState.total) *
                    100
              }%`,
            }}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {!isActive && hasCleanable && (
          <button
            type="button"
            onClick={onCleanAll}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white"
          >
            Clean All
          </button>
        )}
        {isActive && (
          <button
            type="button"
            onClick={onPauseResume}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        {isActive && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600"
          >
            Cancel
          </button>
        )}
        {!isActive && hasFailed && (
          <button
            type="button"
            onClick={onRetryFailed}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            Retry Failed
          </button>
        )}
        {!isActive && hasCleaned && (
          <button
            type="button"
            onClick={onDownloadZip}
            className="rounded-md bg-green-700 px-3 py-1.5 text-xs font-medium text-white"
          >
            Download All (ZIP)
          </button>
        )}
      </div>
    </div>
  );
}

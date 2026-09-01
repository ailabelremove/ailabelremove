export interface BatchControls {
  paused: { current: boolean };
  cancelled: { current: boolean };
}

export async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  controls: BatchControls,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let index = 0;

  async function waitWhilePaused() {
    while (controls.paused.current && !controls.cancelled.current) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  async function runNext(): Promise<void> {
    while (true) {
      await waitWhilePaused();
      if (controls.cancelled.current) return;

      const currentIndex = index;
      index += 1;
      if (currentIndex >= items.length) return;

      await worker(items[currentIndex]);
    }
  }

  const workerCount = Math.min(concurrency, items.length) || 1;
  const workers = Array.from({ length: workerCount }, () => runNext());
  await Promise.all(workers);
}

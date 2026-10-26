import { POLL_INTERVAL_MS, POLL_TIMEOUT_MS } from '../config/env';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Calls `fetchJob` until the job finishes, fails or times out.
 * `onUpdate` receives every intermediate job state.
 * `isCancelled` lets the caller stop polling (e.g. on unmount).
 */
export async function pollUntilDone(fetchJob, { onUpdate, isCancelled }) {
  const start = Date.now();
  while (!isCancelled() && Date.now() - start < POLL_TIMEOUT_MS) {
    const job = await fetchJob();
    onUpdate(job);
    if (job.status === 'succeeded') return job;
    if (job.status === 'failed') throw new Error(job.error || 'Generation failed');
    await sleep(POLL_INTERVAL_MS);
  }
  if (!isCancelled()) throw new Error('Generation timed out');
}

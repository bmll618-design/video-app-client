import { randomUUID } from 'node:crypto';
import { Client, handle_file } from '@gradio/client';
import { BaseProvider } from './baseProvider.js';
import { pickEndpoint, buildArgs, extractVideoUrl } from './gradioMapper.js';
import { env } from './env.js';

const JOB_TTL_MS = 2 * 60 * 60 * 1000;
const jobs = new Map(); // id -> { status, videoUrl, error, createdAt } (in memory)
let clientPromise = null;

/** Connects once to the configured Space with the user's HF token (uses their free GPU quota). */
function getClient() {
  clientPromise ||= Client.connect(env.hf.spaceId, { token: env.hf.token || undefined });
  return clientPromise;
}

/** Turns a base64 data URI into a file object for the Gradio client. */
function dataUriToFile(uri) {
  const [meta, b64] = uri.split(',');
  const type = meta.match(/data:(.*?);/)?.[1] || 'image/jpeg';
  return handle_file(new Blob([Buffer.from(b64, 'base64')], { type }));
}

/** Drops finished jobs older than the TTL. */
function pruneJobs() {
  const now = Date.now();
  for (const [id, j] of jobs) if (now - j.createdAt > JOB_TTL_MS) jobs.delete(id);
}

/** Runs one generation in the background and records progress in `jobs`. */
async function run(id, params) {
  const job = jobs.get(id);
  try {
    const client = await getClient();
    const api = await client.view_api();
    const { name, info } = pickEndpoint(api.named_endpoints, env.hf.apiName);
    const args = buildArgs(info, { prompt: params.prompt, duration: params.duration, startImage: params.images.start }, dataUriToFile);
    for await (const msg of client.submit(name, args)) {
      if (msg.type === 'status') job.status = msg.stage === 'error' ? 'failed' : 'running';
      if (msg.type === 'status' && msg.stage === 'error') job.error = msg.message || 'Space error';
      if (msg.type === 'data') {
        job.videoUrl = extractVideoUrl(msg.data);
        job.status = job.videoUrl ? 'succeeded' : 'failed';
        job.error = job.videoUrl ? undefined : 'The Space returned no video';
      }
    }
    if (job.status === 'running') { job.status = 'failed'; job.error = 'Generation ended without a result'; }
  } catch (e) {
    job.status = 'failed';
    job.error = e?.message || 'Hugging Face request failed';
  }
}

// EXPERIMENTAL: free Wan through a public Hugging Face Space (small daily GPU quota).
export class HfProvider extends BaseProvider {
  /** Starts a background job. Supports text and start-image only. */
  async createJob(params) {
    this.assertConfigured(env.hf.token, 'Hugging Face');
    pruneJobs();
    const id = randomUUID();
    jobs.set(id, { status: 'pending', createdAt: Date.now() });
    run(id, params); // intentionally not awaited
    const notes = [];
    if (params.images.end) notes.push('המודל החינמי לא תומך בתמונת סיום, היא לא נשלחה.');
    if (params.mode === 'reference') notes.push('המודל החינמי לא תומך בתמונות רפרנס. נשלח רק הטקסט.');
    return { id, notes };
  }

  /** Reads the in-memory job state. */
  async getJob(id) {
    const j = jobs.get(id);
    if (!j) return { id, status: 'failed', error: 'המשימה לא נמצאה (השרת אותחל מחדש). נסו שוב.' };
    return { id, status: j.status, videoUrl: j.videoUrl, error: j.error };
  }
}

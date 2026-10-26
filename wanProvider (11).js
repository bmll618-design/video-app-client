import { BaseProvider } from './baseProvider.js';
import { requestJson } from './httpClient.js';
import { MAX_REFERENCES } from './mode.js';
import { env } from './env.js';

// Maps DashScope task states to our normalized states.
const STATUS_MAP = { PENDING: 'pending', RUNNING: 'running', SUCCEEDED: 'succeeded', FAILED: 'failed', CANCELED: 'failed', UNKNOWN: 'failed' };

// Builds DashScope input.media[] for the chosen mode.
function buildMedia(mode, { start, end, references }) {
  if (mode === 'frames') {
    return [{ type: 'first_frame', url: start }, ...(end ? [{ type: 'last_frame', url: end }] : [])];
  }
  if (mode === 'reference') {
    return references.slice(0, MAX_REFERENCES).map((url) => ({ type: 'reference_image', url }));
  }
  return [];
}

// Wan via Alibaba Cloud Model Studio (DashScope), async create + poll.
export class WanProvider extends BaseProvider {
  /** Builds auth headers for DashScope. */
  headers(extra = {}) {
    this.assertConfigured(env.dashscope.apiKey, 'DashScope');
    return { Authorization: `Bearer ${env.dashscope.apiKey}`, ...extra };
  }

  /** Creates a task; the model (t2v / i2v / r2v) follows the mode. */
  async createJob({ prompt, duration, resolution, mode, images }) {
    const media = buildMedia(mode, images);
    const data = await requestJson(
      `${env.dashscope.baseUrl}/api/v1/services/aigc/video-generation/video-synthesis`,
      {
        method: 'POST',
        headers: this.headers({ 'X-DashScope-Async': 'enable' }),
        body: {
          model: env.dashscope.models[mode],
          input: media.length ? { prompt, media } : { prompt },
          parameters: { duration, resolution },
        },
      },
    );
    return { id: data.output.task_id };
  }

  /** Polls a task and normalizes the result. */
  async getJob(id) {
    const data = await requestJson(`${env.dashscope.baseUrl}/api/v1/tasks/${id}`, { headers: this.headers() });
    const out = data.output || {};
    return { id, status: STATUS_MAP[out.task_status] || 'running', videoUrl: out.video_url, error: out.message };
  }
}

import { BaseProvider } from './baseProvider.js';
import { requestJson } from './httpClient.js';
import { MAX_REFERENCES } from './mode.js';
import { env } from './env.js';

// Maps ModelArk task states to our normalized states.
const STATUS_MAP = { queued: 'pending', running: 'running', succeeded: 'succeeded', failed: 'failed', cancelled: 'failed', expired: 'failed' };

const imageItem = (url, role) => ({ type: 'image_url', image_url: { url }, role });

// Builds ModelArk content[]: text first, then images with explicit roles.
function buildContent(mode, prompt, { start, end, references }) {
  const content = [{ type: 'text', text: prompt }];
  if (mode === 'frames') {
    content.push(imageItem(start, 'first_frame'));
    if (end) content.push(imageItem(end, 'last_frame'));
  } else if (mode === 'reference') {
    references.slice(0, MAX_REFERENCES).forEach((url) => content.push(imageItem(url, 'reference_image')));
  }
  return content;
}

// Seedance via BytePlus ModelArk, async create + poll.
export class SeedanceProvider extends BaseProvider {
  /** Builds auth headers for ModelArk. */
  headers() {
    this.assertConfigured(env.ark.apiKey, 'ModelArk');
    return { Authorization: `Bearer ${env.ark.apiKey}` };
  }

  /** Creates a task. In frames mode the ratio is omitted (output follows the image). */
  async createJob({ prompt, duration, resolution, ratio, mode, images }) {
    const data = await requestJson(`${env.ark.baseUrl}/contents/generations/tasks`, {
      method: 'POST',
      headers: this.headers(),
      body: {
        model: env.ark.modelId,
        content: buildContent(mode, prompt, images),
        duration,
        resolution,
        ...(mode === 'frames' ? {} : { ratio }),
      },
    });
    return { id: data.id };
  }

  /** Polls a task and normalizes the result. */
  async getJob(id) {
    const data = await requestJson(`${env.ark.baseUrl}/contents/generations/tasks/${id}`, { headers: this.headers() });
    return { id, status: STATUS_MAP[data.status] || 'running', videoUrl: data.content?.video_url, error: data.error?.message };
  }
}

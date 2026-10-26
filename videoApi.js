import { http, fetchWithRetry } from './httpClient';
import { SERVER_URL } from '../config/env';

// All server endpoints in one place; no UI or state here.
export const videoApi = {
  /** Pings /health until the (possibly sleeping) server answers. */
  wake: () => fetchWithRetry(`${SERVER_URL}/health`, {}, { tries: 5, timeoutMs: 40000 }),
  /** Lists models with their options. */
  getModels: () => http('/models'),
  /** Starts a job. @returns {Promise<{id, notes}>} */
  createJob: (params) => http('/jobs', { method: 'POST', body: params }),
  /** Reads a job state. */
  getJob: (model, id) => http(`/jobs/${model}/${id}`),
};

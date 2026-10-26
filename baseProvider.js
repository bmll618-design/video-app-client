// Contract every video provider must follow.
// A "job" is always normalized to: { id, status, videoUrl?, error? }
// status: 'pending' | 'running' | 'succeeded' | 'failed'
export class BaseProvider {
  /** Start a generation. @returns {Promise<{id: string}>} */
  async createJob(_params) { throw new Error('createJob not implemented'); }

  /** Read job state. @returns {Promise<{id, status, videoUrl?, error?}>} */
  async getJob(_id) { throw new Error('getJob not implemented'); }

  /** Fail early with a clear message when the API key is missing. */
  assertConfigured(apiKey, name) {
    if (!apiKey) throw new Error(`${name} API key is not configured on the server`);
  }
}

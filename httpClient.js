import { API_URL, APP_TOKEN } from '../config/env';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * fetch with a timeout and retries. A free cloud server may need up to a minute
 * to wake up, so network failures are retried before giving up.
 */
export async function fetchWithRetry(url, options = {}, { tries = 1, timeoutMs = 40000 } = {}) {
  for (let i = 0; i < tries; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: ctrl.signal });
    } catch {
      if (i === tries - 1) throw new Error('אין חיבור לשרת. בדקו את כתובת השרת ואת האינטרנט.');
      await sleep(3000);
    } finally {
      clearTimeout(timer);
    }
  }
}

// JSON helper that attaches the app token and throws readable errors.
// Only GET is retried (retrying POST could create a job twice).
export async function http(path, { method = 'GET', body } = {}) {
  const isGet = method === 'GET';
  const res = await fetchWithRetry(
    `${API_URL}${path}`,
    {
      method,
      headers: { 'Content-Type': 'application/json', 'x-app-token': APP_TOKEN },
      body: body ? JSON.stringify(body) : undefined,
    },
    { tries: isGet ? 4 : 1, timeoutMs: isGet ? 40000 : 120000 },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

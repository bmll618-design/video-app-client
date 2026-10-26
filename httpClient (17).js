import { HttpError } from './errors.js';

// Thin fetch wrapper: sends JSON, parses JSON, throws HttpError on non-2xx.
export async function requestJson(url, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? safeParse(text) : {};
  if (!res.ok) throw new HttpError(res.status, data?.message || data?.error?.message || text);
  return data;
}

// Returns parsed JSON, or the raw text if the body is not JSON.
function safeParse(text) {
  try { return JSON.parse(text); } catch { return text; }
}

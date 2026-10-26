import { HttpError } from './errors.js';

// Accepts only base64 data-URI images (the app encodes them).
function cleanImage(value) {
  if (!value) return null;
  if (typeof value !== 'string' || !value.startsWith('data:image/')) throw new HttpError(400, 'Invalid image');
  return value;
}

/** Validates the create-job body and returns clean params. */
export function validateCreateBody(body = {}) {
  const prompt = String(body.prompt || '').trim();
  if (prompt.length < 3) throw new HttpError(400, 'Prompt is too short');
  if (prompt.length > 4000) throw new HttpError(400, 'Prompt is too long');
  const imgs = body.images || {};
  return {
    prompt,
    duration: Number(body.duration) || 5,
    resolution: body.resolution || '720p',
    ratio: body.ratio || '16:9',
    images: {
      start: cleanImage(imgs.start),
      end: cleanImage(imgs.end),
      references: (imgs.references || []).map(cleanImage).filter(Boolean),
    },
  };
}

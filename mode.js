import { HttpError } from './errors.js';

export const MAX_REFERENCES = 5;

/**
 * Decides which input mode to use. The providers' modes are mutually exclusive:
 *  - frames:    start (and optional end) image -> image-to-video
 *  - reference: reference images only
 *  - text:      no images
 * Returns the mode plus Hebrew notes the app shows when something was dropped.
 */
export function resolveMode({ start, end, references = [] }) {
  const notes = [];
  if (end && !start) throw new HttpError(400, 'תמונת סיום דורשת גם תמונת התחלה');

  if (start) {
    if (references.length) notes.push('תמונות הרפרנס לא נשלחו כי הוגדרה תמונת התחלה/סיום. תיאור הדמויות והמיקום נשלח בטקסט.');
    return { mode: 'frames', notes };
  }
  if (references.length) {
    if (references.length > MAX_REFERENCES) notes.push(`נשלחו רק ${MAX_REFERENCES} תמונות רפרנס ראשונות.`);
    return { mode: 'reference', notes };
  }
  return { mode: 'text', notes };
}

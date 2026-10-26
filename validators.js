/** Returns an error message for an invalid prompt, or null when valid. */
export function validatePrompt(prompt) {
  const p = prompt.trim();
  if (p.length < 3) return 'כתבו תיאור של לפחות 3 תווים.';
  if (p.length > 2000) return 'התיאור ארוך מדי (עד 2000 תווים).';
  return null;
}

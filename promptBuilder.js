import { TRAITS, VOICE_GENDERS } from '../config/constants';

/** Short voice description, e.g. "speaks in a warm, low female voice". */
function voiceLine(c) {
  const gender = VOICE_GENDERS.find((g) => g.id === c.voiceGender)?.en;
  const tone = (c.voiceTone || '').trim();
  if (!gender && !tone) return '';
  return `speaks in a ${[tone, gender].filter(Boolean).join(' ')} voice`;
}

/** One-line description of a character: age, look, personality, voice. */
export function describeCharacter(c) {
  const traits = (c.traits || []).map((id) => TRAITS.find((t) => t.id === id)?.en).filter(Boolean);
  if (c.personalityNote?.trim()) traits.push(c.personalityNote.trim());
  const parts = [
    c.age ? `${c.age} years old` : null,
    c.appearance?.trim() || null,
    traits.length ? `personality: ${traits.join(', ')}` : null,
  ].filter(Boolean);
  const voice = voiceLine(c);
  return `${c.name}${parts.length ? ` (${parts.join('; ')})` : ''}${voice ? `, ${voice}` : ''}`;
}

/** Final text prompt = user text + location + character sheets. */
export function buildScenePrompt({ prompt, characters, location }) {
  const blocks = [prompt.trim()];
  if (location) blocks.push(`Location: ${location.name}${location.description ? `: ${location.description}` : ''}.`);
  if (characters.length) blocks.push(`Characters: ${characters.map(describeCharacter).join('. ')}.`);
  return blocks.join('\n');
}

/** Reference image uris in priority order: scene ref, characters, location. */
export function collectReferenceUris({ referenceUri, characters, location }) {
  const all = [referenceUri, ...characters.map((c) => c.imageUri), location?.imageUri].filter(Boolean);
  return [...new Set(all)];
}

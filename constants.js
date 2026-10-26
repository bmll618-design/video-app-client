// Storage keys and option lists shared by the character / location features.
export const STORAGE_KEYS = { characters: 'vg.characters', locations: 'vg.locations', images: 'vg.images' };

// Personality traits: Hebrew label for the UI, English word for the prompt.
export const TRAITS = [
  { id: 'bold', he: 'נועז', en: 'bold' },
  { id: 'shy', he: 'ביישן', en: 'shy' },
  { id: 'warm', he: 'חם', en: 'warm' },
  { id: 'serious', he: 'רציני', en: 'serious' },
  { id: 'playful', he: 'שובב', en: 'playful' },
  { id: 'sarcastic', he: 'סרקסטי', en: 'sarcastic' },
  { id: 'calm', he: 'רגוע', en: 'calm' },
  { id: 'energetic', he: 'אנרגטי', en: 'energetic' },
];

export const VOICE_GENDERS = [
  { id: 'female', he: 'נשי', en: 'female' },
  { id: 'male', he: 'גברי', en: 'male' },
  { id: 'child', he: 'ילדותי', en: 'child-like' },
  { id: 'neutral', he: 'ניטרלי', en: 'neutral' },
];

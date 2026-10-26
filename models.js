// Public catalog returned to the app. Add a model here + a provider to expose it.
// Wan has no ratio option: with image input the output follows the image.
export const MODEL_CATALOG = [
  { id: 'wan', label: 'Wan', durations: [5, 10], resolutions: ['720P', '1080P'], ratios: [] },
  { id: 'seedance', label: 'Seedance', durations: [5, 10], resolutions: ['480p', '720p', '1080p'], ratios: ['16:9', '9:16', '1:1'] },
  { id: 'hf', label: 'Wan חינמי (ניסיוני)', durations: [3, 5], resolutions: [], ratios: [] },
];

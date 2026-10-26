import { buildScenePrompt, collectReferenceUris } from './promptBuilder';
import { toDataUri } from './imageService';

/** Turns the scene form + selected characters/location into the API request body. */
export async function buildGenerationRequest({ scene, characters, location }) {
  const prompt = buildScenePrompt({ prompt: scene.prompt, characters, location });
  const refUris = collectReferenceUris({ referenceUri: scene.images.reference, characters, location });
  const [start, end, references] = await Promise.all([
    scene.images.start ? toDataUri(scene.images.start) : null,
    scene.images.end ? toDataUri(scene.images.end) : null,
    Promise.all(refUris.map(toDataUri)),
  ]);
  return { model: scene.modelId, prompt, ...scene.params, images: { start, end, references } };
}

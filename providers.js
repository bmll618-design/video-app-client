import { WanProvider } from './wanProvider.js';
import { SeedanceProvider } from './seedanceProvider.js';
import { HfProvider } from './hfProvider.js';
import { HttpError } from './errors.js';

// Registry: model id -> provider instance.
const registry = { wan: new WanProvider(), seedance: new SeedanceProvider(), hf: new HfProvider() };

/** Returns the provider for a model id or throws 400. */
export function getProvider(modelId) {
  const provider = registry[modelId];
  if (!provider) throw new HttpError(400, `Unknown model: ${modelId}`);
  return provider;
}

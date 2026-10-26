// Pure helpers that adapt our generic request to ANY Gradio Space endpoint.
// Works from the endpoint description returned by client.view_api().

const nameOf = (p) => String(p.parameter_name || p.label || '');
const isPrompt = (p) => /prompt/i.test(nameOf(p)) && !/negative/i.test(nameOf(p));
const isImage = (p) => p.component === 'Image' || /image|img|first_frame/i.test(nameOf(p));
const isDuration = (p) => /duration|seconds/i.test(nameOf(p));
const returnsVideo = (info) => (info.returns || []).some((r) => /video/i.test(String(r.component || r.type?.type || '')));

/** Chooses the endpoint to call: the preferred name, else the best "prompt" endpoint (video first). */
export function pickEndpoint(namedEndpoints = {}, preferred) {
  if (preferred) {
    const key = preferred.startsWith('/') ? preferred : `/${preferred}`;
    if (!namedEndpoints[key]) throw new Error(`Endpoint ${key} not found in the Space`);
    return { name: key, info: namedEndpoints[key] };
  }
  const found = Object.entries(namedEndpoints)
    .filter(([, info]) => (info.parameters || []).some(isPrompt))
    .sort((a, b) => Number(returnsVideo(b[1])) - Number(returnsVideo(a[1])));
  if (!found.length) throw new Error('No text-to-video endpoint found in the Space');
  return { name: found[0][0], info: found[0][1] };
}

/**
 * Builds the positional argument list for the endpoint.
 * Known fields (prompt / start image / duration) are filled; everything else uses the Space default.
 * `toFile` converts a data URI into the file object the Gradio client accepts.
 */
export function buildArgs(info, { prompt, duration, startImage }, toFile) {
  let imageUsed = false;
  return (info.parameters || []).map((p) => {
    if (isPrompt(p)) return prompt;
    if (isImage(p)) {
      if (startImage && !imageUsed) { imageUsed = true; return toFile(startImage); }
      return p.parameter_has_default ? p.parameter_default : null;
    }
    if (isDuration(p) && duration) return duration;
    return p.parameter_has_default ? p.parameter_default : null;
  });
}

/** Finds a video URL inside the data returned by a Gradio call. */
export function extractVideoUrl(data) {
  for (const item of [].concat(data || [])) {
    if (typeof item === 'string' && item.startsWith('http')) return item;
    if (item?.video?.url) return item.video.url;
    if (item?.url) return item.url;
  }
  return null;
}

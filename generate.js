import { Router } from 'express';
import { MODEL_CATALOG } from './models.js';
import { getProvider } from './providers.js';
import { validateCreateBody } from './validate.js';
import { resolveMode } from './mode.js';

const router = Router();

// GET /models -> list of available models and their options
router.get('/models', (_req, res) => res.json(MODEL_CATALOG));

// POST /jobs { model, prompt, duration, resolution, ratio, images } -> { id, mode, notes }
router.post('/jobs', async (req, res, next) => {
  try {
    const provider = getProvider(req.body.model);
    const params = validateCreateBody(req.body);
    const { mode, notes } = resolveMode(params.images);
    const job = await provider.createJob({ ...params, mode });
    res.status(201).json({ ...job, mode, notes: [...notes, ...(job.notes || [])] });
  } catch (e) { next(e); }
});

// GET /jobs/:model/:id -> { id, status, videoUrl?, error? }
router.get('/jobs/:model/:id', async (req, res, next) => {
  try {
    res.json(await getProvider(req.params.model).getJob(req.params.id));
  } catch (e) { next(e); }
});

export default router;

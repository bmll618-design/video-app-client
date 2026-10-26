import { env } from './env.js';

// Rejects requests without the shared app token (skipped when APP_TOKEN is empty).
export function auth(req, res, next) {
  if (!env.appToken || req.get('x-app-token') === env.appToken) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

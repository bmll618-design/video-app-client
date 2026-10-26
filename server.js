import express from 'express';
import cors from 'cors';
import { env } from './env.js';
import { auth } from './auth.js';
import { errorHandler } from './errorHandler.js';
import generateRoutes from './generate.js';

// A public server must never run without the shared token (it spends your API credits).
if (!env.appToken) {
  console.error('APP_TOKEN is required. Set it in your environment variables.');
  process.exit(1);
}

// App bootstrap only: wiring, no business logic.
const app = express();
app.use(cors());
app.use(express.json({ limit: '60mb' }));
app.get('/health', (_req, res) => res.json({ ok: true })); // no auth: used to wake the server
app.use('/api', auth, generateRoutes);
app.use(errorHandler);

app.listen(env.port, () => console.log(`Server on :${env.port}`));

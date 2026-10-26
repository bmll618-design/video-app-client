// Central error responder so routes can just throw.
export function errorHandler(err, _req, res, _next) {
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
}

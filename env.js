// Your cloud server address (from Render), without a trailing slash.
// For a local server use e.g. 'http://192.168.1.10:3000'.
export const SERVER_URL = 'https://YOUR-SERVICE.onrender.com';
export const API_URL = `${SERVER_URL}/api`;
// Must equal APP_TOKEN on the server.
export const APP_TOKEN = 'change-me';
export const POLL_INTERVAL_MS = 5000;
export const POLL_TIMEOUT_MS = 10 * 60 * 1000;

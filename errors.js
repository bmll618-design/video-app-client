// Error carrying an HTTP status so the error middleware can answer correctly.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

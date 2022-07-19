class NotFoundError extends Error {
  name = this.constructor.name;
  statusCode = 404;

  constructor(message) {
    super(message);
  }
}

export default NotFoundError;

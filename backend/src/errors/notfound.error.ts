class NotFoundError extends Error {
  name = this.constructor.name;
  statusCode = 404;

  constructor(message: string) {
    super(message);
  }
}

export default NotFoundError;

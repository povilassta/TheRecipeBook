class ForbiddenError extends Error {
  name = this.constructor.name;
  statusCode = 403;

  constructor(message) {
    super(message);
  }
}

export default ForbiddenError;

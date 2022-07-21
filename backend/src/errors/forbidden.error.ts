class ForbiddenError extends Error {
  name = this.constructor.name;
  statusCode = 403;

  constructor(message: string) {
    super(message);
  }
}

export default ForbiddenError;

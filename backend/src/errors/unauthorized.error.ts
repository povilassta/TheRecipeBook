class UnauthorizedError extends Error {
  name = this.constructor.name;
  statusCode = 401;

  constructor(message: string) {
    super(message);
  }
}

export default UnauthorizedError;

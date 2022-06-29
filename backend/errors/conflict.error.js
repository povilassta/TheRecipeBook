class ConflictError extends Error {
  name = this.constructor.name;
  statusCode = 400;

  constructor(message) {
    super(message);
  }
}

export default ConflictError;

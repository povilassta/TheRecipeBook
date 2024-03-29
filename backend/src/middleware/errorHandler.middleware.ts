import Express from "express";

function errorHandler(
  err: any,
  _req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const customErrorNames = [
    "NotFoundError",
    "UnauthorizedError",
    "ConflictError",
    "ForbiddenError",
  ];
  if (customErrorNames.includes(err.name)) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "CastError") {
    return res.status(400).json({ message: "Provided id is invalid" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
  next(err);
}

export default errorHandler;

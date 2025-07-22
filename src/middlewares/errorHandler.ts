import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

/**
 * A general error handling middleware for Express.
 * It catches errors passed to `next()` and sends a standardized JSON response.
 * This middleware should be the last one in your Express application stack.
 *
 * @param err The error object. Can be a standard Error or a custom error with a statusCode property.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function in the application's request-response cycle.
 */
export const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";

  console.error(err.stack);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

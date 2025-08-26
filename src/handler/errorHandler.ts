import { Request, Response, NextFunction } from "express";
import { sendError } from "./responseHandler";
import { ApiError } from "../utils/errors/ApiError";
import { AppErrorCode } from "../constants/errorCodes";

interface AppError extends Error {
  statusCode?: number;
  code?: AppErrorCode;
  details?: any;
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
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";
  let code = err.code || AppErrorCode.INTERNAL_SERVER_ERROR;
  let details = err.details;

  // Handle ApiError instances
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    details = err.details;
  }

  // Log error details
  console.error(
    `[ERROR] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
  );
  console.error(`Error Code: ${code}`);
  console.error(`Status Code: ${statusCode}`);
  console.error(`Message: ${message}`);
  console.error(err.stack);

  sendError(res, message, statusCode, code, details);
};

import { Request, Response, NextFunction } from "express";

// Define a type for our async route handlers for better type-checking.
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * A utility function to wrap asynchronous Express route handlers.
 * It catches any errors from async operations and passes them to the Express error handling middleware.
 * This avoids the need for repetitive try/catch blocks in every async route.
 *
 * @param fn The asynchronous route handler function to wrap.
 * @returns A new middleware function that handles promise rejections.
 */
export const asyncHandler =
  (fn: AsyncRequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

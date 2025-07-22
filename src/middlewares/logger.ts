import { Request, Response, NextFunction } from "express";

/**
 * A simple logger middleware for Express.
 * It logs the timestamp, HTTP method, and original URL of each incoming request to the console.
 *
 * @param req The Express request object, which contains information about the incoming HTTP request.
 * @param res The Express response object, which is used to send a response back to the client.
 * @param next The next middleware function in the application's request-response cycle.
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};

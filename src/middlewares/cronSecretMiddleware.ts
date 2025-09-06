import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

/**
 * Middleware to validate the CRON_JOB_SECRET
 * Checks if the secret provided in the request header matches the one in the environment
 */
export const cronSecretMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretHeader = req.headers["authorization"];
  const expectedHeader = `Bearer ${env.CRON_JOB_SECRET}`;

  if (!secretHeader || secretHeader !== expectedHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing cron job secret",
    });
  }

  next();
};

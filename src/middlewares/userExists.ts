import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { findUserByEmailQuery } from "../db/helpers/findUserByEmailQuery";
import { sendError } from "../handler/responseHandler";
import { AppErrorCode } from "../constants/errorCodes";

/**
 * Middleware to check if a user exists in the database by email
 * Expects email in request body
 * If user exists, attaches user to res.locals and calls next()
 * If user doesn't exist, returns 404
 */
export const userExistsByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return sendError(res, "Email is required", 400, AppErrorCode.EMAIL_REQUIRED);
    }

    const user = await findUserByEmailQuery(email);

    if (!user || !user.rows || user.rows.length === 0) {
      return sendError(res, "User not found with the provided email", 404, AppErrorCode.AUTH_USER_NOT_FOUND);
    }

    // Attach user to res.locals for use in subsequent middleware/controllers
    res.locals.user = user.rows[0];
    next();
  }
);

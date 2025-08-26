import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { findUserInCenterQuery } from "../db/helpers/findUserInCenterQuery";
import { sendSuccess } from "../handler/responseHandler";

/**
 * Middleware to check if a user exists in the user_centers table for a specific center
 * Expects user_id in request params and center_id in request body or params
 * If user exists in center, attaches user_center record to res.locals and calls next()
 * If user doesn't exist in center, calls next() without modifying the response
 */
export const checkUserInCenter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals.user;
    const center_id = req.user!.center_id!;

    const userCenter = await findUserInCenterQuery(user_id, center_id);

    if (userCenter.rowCount && userCenter.rowCount > 0) {
      // If user exists in center, return
      return sendSuccess(res, { message: "User already exists in center" });
    }

    // Continue to the next middleware if it does not exists in center
    next();
  }
);

export const checkUserInCenterToContinue = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    const center_id = req.user!.center_id!;

    const userCenter = await findUserInCenterQuery(user_id, center_id);

    if (!userCenter.rowCount || userCenter.rowCount === 0) {
      // If user does not exists in center, return
      return sendSuccess(res, { message: "User does not exist in center" });
    }

    // Continue to the next middleware if user exists in center
    next();
  }
);

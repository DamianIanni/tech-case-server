import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findUserByEmail } from "../../services/helpers/findUserByEmail";
import { sendError } from "../../handler/responseHandler";
import { AppErrorCode } from "../../constants/errorCodes";

export const userExistMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (user.rowCount! > 0) {
      return sendError(res, "User already exists", 409, AppErrorCode.USER_ALREADY_EXISTS); // 409 Conflict
    }

    next();
  }
);

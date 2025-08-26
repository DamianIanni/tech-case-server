import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess, sendError } from "../../handler/responseHandler";
import { AppErrorCode } from "../../constants/errorCodes";

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return sendError(res, "Unauthorized", 401, AppErrorCode.UNAUTHORIZED);
    }
    // Maybe center_id
    const { id, first_name, last_name, email, role } = req.user;

    sendSuccess(res, { id, first_name, last_name, email, role });
  }
);

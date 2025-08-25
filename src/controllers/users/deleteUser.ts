import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteUserService } from "../../services/user";
import { sendSuccess } from "../../handler/responseHandler";

export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const result = await deleteUserService(user_id);
    sendSuccess(res, result);
  }
);

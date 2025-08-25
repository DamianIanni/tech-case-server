import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { updateUserService } from "../../services/user";
import { sendSuccess } from "../../handler/responseHandler";

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const center_id = req.user?.center_id!;
    const role = req.body;
    console.log("UPDATE CONTROLLER", user_id, center_id, role);

    const result = await updateUserService(center_id, user_id, role);

    sendSuccess(res, result);
  }
);

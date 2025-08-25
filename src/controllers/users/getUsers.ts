import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getAllUsersService } from "../../services/user/getUsers";
import { getUserByIdService } from "../../services/user/getUsers";
import { sendSuccess } from "../../handler/responseHandler";

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const result = await getAllUsersService(center_id);
    sendSuccess(res, result);
  }
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const result = await getUserByIdService(user_id);
    sendSuccess(res, result);
  }
);

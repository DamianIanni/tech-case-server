import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { updateUserService } from "../../services/user";

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id, user_id } = req.params;
    const updateData = req.body;

    const result = await updateUserService(center_id, user_id, updateData);

    res.status(200).json(result);
  }
);

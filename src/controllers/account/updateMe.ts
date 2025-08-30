import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { updateMeService } from "../../services/account/updateMe";
import { sendSuccess } from "../../handler/responseHandler";

export const updateMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const { first_name, last_name } = req.body;
    const updated = await updateMeService(req.user!.id!, {
      first_name,
      last_name,
    });
    sendSuccess(res, updated);
  }
);

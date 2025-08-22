import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { updateMeService } from "../../services/account/updateMe";

export const updateMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const { first_name, last_name } = req.body;
    console.log("DATA 1", req.body);
    const updated = await updateMeService(req.user!.id!, {
      first_name,
      last_name,
    });
    res.status(200).json(updated);
  }
);

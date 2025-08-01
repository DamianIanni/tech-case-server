import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { updateMeService } from "../../services/account/updateMe";

export const updateMeController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { firstName, lastName, password } = req.body;
    const updated = await updateMeService(req!.user!.id!, {
      firstName,
      lastName,
      password,
    });
    res.status(200).json(updated);
  }
);

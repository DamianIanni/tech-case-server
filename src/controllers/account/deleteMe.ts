import { deleteMeService } from "../../services/account/deleteMe";
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { env } from "../../config/env";

export const deleteMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await deleteMeService(req!.user!.id!);
    res.clearCookie("token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("tempToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json(deleted);
  }
);

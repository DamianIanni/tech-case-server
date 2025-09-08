import { Request, Response } from "express";
import { deleteCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";
import { generateTempToken } from "../../utils/auth/generateToken";
import { env } from "../../config/env";

export const deleteCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;
    const { id, first_name, last_name, email } = req.user!;
    const result = await deleteCenterService(center_id);
    const tempToken = generateTempToken({ id, first_name, last_name, email });

    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 5 * 60 * 1000, // 1 day in ms
    });
    sendSuccess(res, { message: "Center deleted successfully" });
  }
);

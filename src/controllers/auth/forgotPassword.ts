import { forgotPasswaordService } from "../../services/auth/password";
import { Request, Response } from "express";
import { sendSuccess } from "../../handler/responseHandler";
import { asyncHandler } from "../../utils/asyncHandler";

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await forgotPasswaordService(email);
    sendSuccess(res, { message: "Password reset email sent" });
  }
);

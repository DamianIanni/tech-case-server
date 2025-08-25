import { resetPasswordService } from "../../services/auth/password";
import { Request, Response } from "express";
import { sendSuccess } from "../../handler/responseHandler";
import { asyncHandler } from "../../utils/asyncHandler";

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    await resetPasswordService(token, password);
    sendSuccess(res, { message: "Password reset successfully" });
  }
);

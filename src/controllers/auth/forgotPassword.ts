import { forgotPasswaordService } from "../../services/auth/password";
import { Request, Response } from "express";

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  await forgotPasswaordService(email);
  res.status(200).json({ message: "Password reset email sent" });
};

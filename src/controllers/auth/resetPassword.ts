import { resetPasswordService } from "../../services/auth/password";
import { Request, Response } from "express";

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  await resetPasswordService(token, password);
  res.status(200).json({ message: "Password reset successfully" });
};

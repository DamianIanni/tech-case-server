import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

export const logoutUserController = asyncHandler(async (req: Request, res: Response) => {
  // For JWT auth, logout is handled on the client by deleting the token.
  // Optionally, you could implement a token blacklist here.
  // For now, just send a response indicating logout success.
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Successfully logged out" });
});

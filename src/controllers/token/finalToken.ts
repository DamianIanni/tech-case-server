import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateToken } from "../../utils/auth/generateToken";
import { env } from "../../config/env";
import { sendSuccess } from "../../handler/responseHandler";

export const finalTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, first_name, last_name, email } = req.user!;
    const { center_id, role } = req.body;

    const user = { id, first_name, last_name, email, center_id, role };
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      //env.NODE_ENV === "production",
      // secure: false,
      sameSite: "lax",
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    res.clearCookie("tempToken");
    sendSuccess(res, { message: "Token generated successfully" });
  }
);

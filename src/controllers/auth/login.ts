import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateTempToken } from "../../utils/auth/generateToken";
import { env } from "../../config/env";
import { sendSuccess } from "../../handler/responseHandler";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, first_name, last_name, email } = res.locals.user;
    const tempToken = generateTempToken({ id, first_name, last_name, email });

    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      // secure: false,
      sameSite: "lax",
      // sameSite: "none",
      maxAge: 5 * 60 * 1000, // 1 day in ms
    });
    sendSuccess(res, {
      message: "Login successful",
      user: { id, first_name, last_name, email },
    });
  }
);

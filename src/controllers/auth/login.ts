import { Request, Response } from "express";
import { User } from "../../types/users";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateToken } from "../../utils/auth/generateToken";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, first_name, last_name, id } = res.locals.user;
    const user = { email, first_name, last_name, id };
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "lax",
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });
    res.status(200).json({
      user: { email, first_name, last_name, id },
    });
  }
);

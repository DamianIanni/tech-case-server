import { Request, Response } from "express";
import { User } from "../../types/users";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateTempToken } from "../../utils/auth/generateToken";
import { env } from "../../config/env";
// import { centerContextService } from "../../services/helpers/centerContext";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, first_name, last_name, email } = res.locals.user;
    const tempToken = generateTempToken({ id, first_name, last_name, email });

    // const centerContext = await centerContextService(id);

    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      // secure: false,
      sameSite: "lax",
      // sameSite: "none",
      maxAge: 5 * 60 * 1000, // 1 day in ms
    });
    res.status(200).json({
      // centerContext,
    });
  }
);

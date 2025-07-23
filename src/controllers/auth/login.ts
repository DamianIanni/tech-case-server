import { Request, Response } from "express";
import { User } from "../../types/users";
import { asyncHandler } from "../../utils/asyncHandler";
import { generateToken } from "../../utils/auth/generateToken";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, first_name, last_name, id, role } = res.locals.user;
    const user = { email, first_name, last_name, id, role };
    const token = generateToken(user);

    res.status(200).json({
      token,
      user: { email, first_name, last_name, id, role },
    });
  }
);

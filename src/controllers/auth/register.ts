import { Request, Response } from "express";
import { User } from "../../types/users";
import { registerUserService } from "../../services/auth";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: Partial<User> = req.body;
    const user = { firstName, lastName, email, password };
    const result = await registerUserService(user);
    res.status(201).json(result);
  }
);

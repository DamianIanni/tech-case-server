import { Request, Response } from "express";
import { RegisterUserInput } from "../../validations/userSchema";
import { registerUserService } from "../../services/auth";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: RegisterUserInput = req.body;
    const user = { firstName, lastName, email, password };
    const result = await registerUserService(user);
    res.status(201).json(result);
  }
);

import { Request, Response } from "express";
import { RegisterUserInput } from "../../validations/userSchema";
import { registerUserService } from "../../services/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: RegisterUserInput = req.body;
    const user = { firstName, lastName, email, password };
    const result = await registerUserService(user);
    sendSuccess(res, result, 201);
  }
);

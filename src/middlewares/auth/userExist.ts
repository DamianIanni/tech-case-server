import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findUserByEmail } from "../../services/helpers/findUserByEmail";

export const userExistMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    await findUserByEmail(email);
    next();
  }
);

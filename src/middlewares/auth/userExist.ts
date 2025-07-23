import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findUserByEmail } from "../../services/helpers/findUserByEmail";

export const userExistMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (user.rowCount! > 0) {
      return res.status(409).json({ message: "User already exists" }); // 409 Conflict
    }

    next();
  }
);

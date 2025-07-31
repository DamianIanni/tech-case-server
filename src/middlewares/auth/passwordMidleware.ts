import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findUserByEmailQuery } from "../../db/helpers/findUserByEmailQuery";
import bcrypt from "bcrypt";

export const passwordMiddlewareHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await findUserByEmailQuery(email);
  if (!user || !user.rows || !user.rows[0]) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.locals.user = user.rows[0];
  next();
};

export const passwordMiddleware = asyncHandler(passwordMiddlewareHandler);


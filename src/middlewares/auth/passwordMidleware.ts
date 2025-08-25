import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findUserByEmailQuery } from "../../db/helpers/findUserByEmailQuery";
import bcrypt from "bcrypt";
import { sendError } from "../../handler/responseHandler";

export const passwordMiddlewareHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await findUserByEmailQuery(email);

  if (!user || !user.rows || !user.rows[0]) {
    return sendError(res, "Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    return sendError(res, "Invalid credentials", 401);
  }

  const localUser = {
    email,
    id: user.rows[0].id,
    first_name: user.rows[0].first_name,
    last_name: user.rows[0].last_name,
  };

  res.locals.user = localUser;
  next();
};

export const passwordMiddleware = asyncHandler(passwordMiddlewareHandler);

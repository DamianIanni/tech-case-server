import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, UsersTableData } from "../types/users";
import { env } from "../config/env";

export const tempAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies.token; // Your final session token
  const tempToken = req.cookies.tempToken;

  //   1. Priority #1: Try with the final session token
  if (sessionToken) {
    try {
      const decoded = jwt.verify(sessionToken, env.JWT_SECRET);
      req.user = decoded as UsersTableData;
      console.log("sessionToken", req.user);
      return next(); // Success, user is fully authenticated.
    } catch (error) {
      // Silent failure. If the final token exists but is invalid (e.g., expired),
      // we don't return an error yet. We simply continue to check for a tempToken.
    }
  }

  //   2. Priority #2: If there was no session token or it failed, try with the temporary token
  if (tempToken) {
    try {
      const decoded = jwt.verify(tempToken, env.JWT_TEMP_SECRET);
      req.user = decoded as Partial<UsersTableData>;
      return next(); // Success, user is in the intermediate step.
    } catch (error) {
      // If this also fails, now it's a definitive error.
      return res
        .status(401)
        .json({ message: "Invalid or expired temporary token" });
    }
  }

  // 3. If no token was found in cookies, deny access.
  return res
    .status(401)
    .json({ message: "Access denied. Authentication required." });
};

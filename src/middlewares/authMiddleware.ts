import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/users";
import { asyncHandler } from "../utils/asyncHandler";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded as Partial<User>; // attach user info from token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

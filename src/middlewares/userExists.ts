import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { findUserByEmailQuery } from "../db/helpers/findUserByEmailQuery";

/**
 * Middleware to check if a user exists in the database by email
 * Expects email in request body
 * If user exists, attaches user to res.locals and calls next()
 * If user doesn't exist, returns 404
 */
export const userExistsByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await findUserByEmailQuery(email);

    if (!user || !user.rows || user.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found with the provided email" });
    }

    // Attach user to res.locals for use in subsequent middleware/controllers
    res.locals.user = user.rows[0];
    next();
  }
);

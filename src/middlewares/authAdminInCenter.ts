import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";
import { asyncHandler } from "../utils/asyncHandler";

export const authorizeAdminInCenter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req!.user!.id; // del token
    const { centerId } = req.params;

    const result = await dbpool.query(
      `
    SELECT role
    FROM user_centers
    WHERE user_id = $1 AND center_id = $2
    `,
      [userId, centerId]
    );

    if (result.rowCount === 0) {
      return res
        .status(403)
        .json({ message: "Unauthorized or center not found" });
    }

    const { role } = result.rows[0];

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    // Attach info al request si necesitás
    req.auth = { role, centerId };
    next();
  }
);

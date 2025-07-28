import { RolePriority } from "../types/roles";
import { User } from "../types/users";
import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";
import { asyncHandler } from "../utils/asyncHandler";

const rolePriority: RolePriority = {
  admin: 3,
  manager: 2,
  employee: 1,
};

export const requireMinRole = (minRole: keyof typeof rolePriority) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.user?.id as Partial<User>;
      const result = await dbpool.query(
        "SELECT role FROM user_centers WHERE user_id = $1",
        [user_id]
      );
      const role: keyof typeof rolePriority = result.rows[0]?.role;
      // console.table(user);

      if (rolePriority[role] >= rolePriority[minRole]) {
        return next();
      }

      return res.status(403).json({ message: "Access denied" });
    }
  );
};

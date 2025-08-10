import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserRole } from "../types/users";

type RolePriority = Record<UserRole, number>;

const ROLE_PRIORITY: RolePriority = {
  admin: 3,
  manager: 2,
  employee: 1,
} as const;

/**
 * Middleware factory that creates a middleware to check if the user has at least the required role
 * @param requiredRole - The minimum role required to access the route
 * @returns Middleware function that enforces the role requirement
 */
export const requireMinRole = (requiredRole: UserRole) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user!.role as UserRole;

      // Check if user role is valid
      if (!userRole || !(userRole in ROLE_PRIORITY)) {
        return res.status(403).json({
          success: false,
          message: "Invalid user role",
        });
      }

      // Check if user has sufficient privileges
      if (ROLE_PRIORITY[userRole] < ROLE_PRIORITY[requiredRole]) {
        return res.status(403).json({
          success: false,
          message: `Insufficient privileges. Required role: ${requiredRole}`,
        });
      }

      // User has required role, proceed to next middleware
      next();
    }
  );
};

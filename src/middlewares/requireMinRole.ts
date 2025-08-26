import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserRole } from "../types/users";
import { sendError } from "../handler/responseHandler";
import { AppErrorCode } from "../constants/errorCodes";

type RolePriority = Record<UserRole, number>;

const ROLE_PRIORITY: RolePriority = {
  admin: 3,
  manager: 2,
  employee: 1,
} as const;

export const requireMinRole = (requiredRole: UserRole) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user!.role as UserRole;
      console.log(userRole);

      // Check if user role is valid
      if (!userRole || !(userRole in ROLE_PRIORITY)) {
        return sendError(res, "Invalid user role", 403, AppErrorCode.USER_INVALID_ROLE);
      }

      // Check if user has sufficient privileges
      if (ROLE_PRIORITY[userRole] < ROLE_PRIORITY[requiredRole]) {
        return sendError(res, `Insufficient privileges. Required role: ${requiredRole}`, 403, AppErrorCode.USER_INSUFFICIENT_PRIVILEGES);
      }

      // User has required role, proceed to next middleware
      next();
    }
  );
};

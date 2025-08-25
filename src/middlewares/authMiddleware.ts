import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, UsersTableData } from "../types/users";
import { dbpool } from "../config/database";
import { env } from "../config/env";
import { sendError } from "../handler/responseHandler";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.cookies.token; // Your final session token
  // const tempToken = req.cookies.tempToken;

  // 1. Priority #1: Try with the final session token
  if (sessionToken) {
    try {
      const decoded = jwt.verify(sessionToken, env.JWT_SECRET) as any;
      console.log("decoded", decoded);

      const query = `
      SELECT
        u.id, u.first_name, u.last_name, u.email,
        uc.role, uc.center_id
      FROM users u
      JOIN user_centers uc ON u.id = uc.user_id
      WHERE u.id = $1 AND uc.center_id = $2;
    `;
      const result = await dbpool.query(query, [decoded.id, decoded.center_id]);
      // 3. Si el usuario no se encuentra, la sesión ya no es válida.
      if (result.rows.length === 0) {
        // Limpia la cookie por si acaso y devuelve un error
        res.clearCookie("token");
        return sendError(res, "Invalid session.", 401);
      }
      req.user = decoded as UsersTableData;
      return next(); // Success, user is fully authenticated.
    } catch (error) {
      // Silent failure. If the final token exists but is invalid (e.g., expired),
      // we don't return an error yet. We simply continue to check for a tempToken.
    }
  }

  return sendError(res, "Access denied. Authentication required.", 401);
};

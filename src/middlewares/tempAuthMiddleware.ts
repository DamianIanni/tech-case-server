import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UsersTableData } from "../types/users";
import { env } from "../config/env";
import { dbpool } from "../config/database";

export const tempAuthMiddleware = async (
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
        return res.status(401).json({ message: "Invalid session." });
      }
      req.user = decoded as UsersTableData;
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

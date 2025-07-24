import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";

export const authorizeActionInCenterOverPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req!.user!.id; // del token
  const { centerId, patientId } = req.params;

  const result = await dbpool.query(
    `
    SELECT
      uc.role,
      p.id AS patient_id
    FROM user_centers uc
    LEFT JOIN patients p ON p.center_id = uc.center_id AND p.id = $3
    WHERE uc.user_id = $1 AND uc.center_id = $2
    `,
    [userId, centerId, patientId]
  );

  if (result.rowCount === 0) {
    return res
      .status(403)
      .json({ message: "Unauthorized or center not found" });
  }

  const { role, patient_id } = result.rows[0];

  if (patientId && !patient_id) {
    return res
      .status(404)
      .json({ message: "Patient not found in this center" });
  }

  // Attach data to request for next handler
  req.auth = { role, centerId };
  next();
};

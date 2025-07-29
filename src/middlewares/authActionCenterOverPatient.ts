import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";
import { asyncHandler } from "../utils/asyncHandler";

export const authorizeActionInCenterOverPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req!.user!.id; // del token
    const { centerId, patientId } = req.params;

    const result = await dbpool.query(
      `
      SELECT 
        uc.role,
        pc.patient_id
      FROM user_centers uc
      LEFT JOIN patient_centers pc ON pc.center_id = uc.center_id AND pc.patient_id = $3
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

    req.auth = { role, centerId };
    next();
  }
);

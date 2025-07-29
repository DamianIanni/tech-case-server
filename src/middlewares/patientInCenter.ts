import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";
import { asyncHandler } from "../utils/asyncHandler";

export const authorizePatientInCenter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { center_id, patient_id } = req.params;

    const result = await dbpool.query(
      `
      SELECT 1 FROM patient_centers
      WHERE center_id = $1 AND patient_id = $2
      `,
      [center_id, patient_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Patient not found in this center" });
    }

    next();
  }
);

import { Request, Response, NextFunction } from "express";
import { dbpool } from "../config/database";
import { asyncHandler } from "../utils/asyncHandler";
import { sendError } from "../handler/responseHandler";

export const authorizePatientInCenter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { patient_id } = req.params;
    const center_id = req.user!.center_id;

    if (!center_id) {
      return sendError(res, "No center associated with your account", 403);
    }

    // Check if the patient exists in the center
    const result = await dbpool.query(
      "SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2",
      [patient_id, center_id]
    );

    if (result.rowCount === 0) {
      return sendError(res, "Patient not found in your center", 403);
    }

    next();
  }
);

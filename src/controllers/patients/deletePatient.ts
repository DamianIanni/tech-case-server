import { Request, Response } from "express";
import { deletePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const deletePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patientId } = req.params;

    await deletePatientService(patientId);

    res.status(200).json({ message: "Patient deleted successfully" });
  }
);

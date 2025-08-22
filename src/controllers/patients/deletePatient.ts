import { Request, Response } from "express";
import { deletePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const deletePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    const center_id = req.user!.center_id!;

    await deletePatientService(patient_id);

    res.status(200).json({ message: "Patient deleted successfully" });
  }
);

import { Request, Response } from "express";
import { deletePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

export const deletePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    const center_id = req.user!.center_id!;

    await deletePatientService(patient_id);

    sendSuccess(res, { message: "Patient deleted successfully" });
  }
);

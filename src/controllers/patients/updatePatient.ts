import { Request, Response } from "express";
import { UpdatePatientInput } from "../../validations/patientSchema";
import { updatePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess, sendError } from "../../handler/responseHandler";
import { AppErrorCode } from "../../constants/errorCodes";

export const updatePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    // const center_id = req.user!.center_id!;
    const updateData: UpdatePatientInput = req.body;
    console.log(updateData);

    const updatedPatient = await updatePatientService(patient_id, updateData);

    if (!updatedPatient) {
      return sendError(res, "Patient not found", 404, AppErrorCode.PATIENT_NOT_FOUND);
    }

    sendSuccess(res, updatedPatient);
  }
);

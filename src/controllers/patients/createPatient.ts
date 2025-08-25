import { Request, Response } from "express";
import { CreatePatientInput } from "../../validations/patientSchema";
import { createPatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

export const createPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const patientData: CreatePatientInput = req.body;

    const patient = await createPatientService(patientData, center_id);

    sendSuccess(res, patient, 201);
  }
);

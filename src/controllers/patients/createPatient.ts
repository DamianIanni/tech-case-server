import { Request, Response } from "express";
import { Patient } from "../../types/patient";
import { createPatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const createPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { centerId } = req.params;
    const patientData: Partial<Patient> = req.body;

    const patient = await createPatientService(patientData, centerId);

    res.status(201).json(patient);
  }
);

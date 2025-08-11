import { Request, Response } from "express";
import { CreatePatientInput } from "../../validations/patientSchema";
import { createPatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const createPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { centerId } = req.params;
    const patientData: CreatePatientInput = req.body;

    const patient = await createPatientService(patientData, centerId);

    res.status(201).json(patient);
  }
);

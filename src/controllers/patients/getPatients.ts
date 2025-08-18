import { Request, Response } from "express";
import {
  getPatientService,
  getAllPatientsService,
} from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const getPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    const center_id = req.user!.center_id!;

    const patient = await getPatientService(patient_id, center_id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  }
);

export const getAllPatientsController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const patients = await getAllPatientsService(center_id);

    if (!patients.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(patients);
  }
);

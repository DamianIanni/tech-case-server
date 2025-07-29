import { Request, Response } from "express";
import {
  getPatientService,
  getAllPatientsService,
} from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const getPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { centerId, patientId } = req.params;

    const patient = await getPatientService(patientId, centerId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  }
);

export const getAllPatientsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { centerId } = req.params;

    const patients = await getAllPatientsService(centerId);

    if (!patients.length) {
      return res.status(200).json({ patients: [] });
    }

    res.status(200).json({ patients });
  }
);

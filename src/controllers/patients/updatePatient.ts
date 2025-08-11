import { Request, Response } from "express";
import { UpdatePatientInput } from "../../validations/patientSchema";
import { updatePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const updatePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patientId } = req.params;
    const updateData: UpdatePatientInput = req.body;

    const updatedPatient = await updatePatientService(patientId, updateData);

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  }
);

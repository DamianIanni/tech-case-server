import { Request, Response } from "express";
import { UpdatePatientInput } from "../../validations/patientSchema";
import { updatePatientService } from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";

export const updatePatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    // const center_id = req.user!.center_id!;
    const updateData: UpdatePatientInput = req.body;
    console.log(updateData);

    const updatedPatient = await updatePatientService(patient_id, updateData);

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  }
);

import { updatePatientQuery } from "../../db/patient/updatePatient";
import { UpdatePatientInput } from "../../validations/patientSchema";

export async function updatePatientService(
  patientId: string,
  updateData: UpdatePatientInput
) {
  const updatedPatient = await updatePatientQuery(patientId, updateData);
  return updatedPatient;
}

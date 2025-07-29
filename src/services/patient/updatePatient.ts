import { updatePatientQuery } from "../../db/patient/updatePatient";
import { Patient } from "../../types/patient";

export async function updatePatientService(
  patientId: string,
  updateData: Partial<Patient>
) {
  const updatedPatient = await updatePatientQuery(patientId, updateData);
  return updatedPatient;
}

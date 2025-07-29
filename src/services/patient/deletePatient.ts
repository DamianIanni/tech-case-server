import { deletePatientQuery } from "../../db/patient/deletePatient";

export async function deletePatientService(patientId: string) {
  const result = await deletePatientQuery(patientId);
  return result;
}

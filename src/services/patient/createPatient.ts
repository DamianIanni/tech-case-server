import { Patient } from "../../types/patient";
import {
  createPatientQuery,
  createPatientInCenterQuery,
} from "../../db/patient/createPatient";

export async function createPatientService(
  patientData: Partial<Patient>,
  centerId: string
) {
  const patient = await createPatientQuery(patientData, centerId);
  const patient_id = patient.id;
  await createPatientInCenterQuery(patient_id, centerId);
  return patient;
}

import { Patient } from "../../types/patient";
import {
  createPatientQuery,
  createPatientInCenterQuery,
} from "../../db/patient/createPatient";

export async function createPatientService(
  patientData: Patient,
  centerId: string
) {
  const patient = await createPatientQuery(patientData, centerId);
  const patient_id = patient.id;
  await createPatientInCenterQuery(patient.id, centerId);
  return patient;
}

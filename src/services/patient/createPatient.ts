import { CreatePatientInput } from "../../validations/patientSchema";
import {
  createPatientQuery,
  createPatientInCenterQuery,
} from "../../db/patient/createPatient";

export async function createPatientService(
  patientData: CreatePatientInput,
  centerId: string
) {
  const patient = await createPatientQuery(patientData, centerId);
  const patient_id = patient.id;
  await createPatientInCenterQuery(patient.id, centerId);
  return patient;
}

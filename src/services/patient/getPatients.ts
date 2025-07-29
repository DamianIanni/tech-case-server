import {
  getPatientQuery,
  getAllPatientsQuery,
} from "../../db/patient/getPatients";

export async function getPatientService(patientId: string, centerId: string) {
  const patient = await getPatientQuery(patientId, centerId);
  return patient;
}

export async function getAllPatientsService(centerId: string) {
  const patients = await getAllPatientsQuery(centerId);
  return patients;
}

import { dbpool } from "../../config/database";
import {
  GET_PATIENT_BY_ID,
  GET_PATIENTS_BY_CENTER_ID,
} from "../queriesString/patient";

export async function getPatientQuery(patientId: string, centerId: string) {
  const result = await dbpool.query(GET_PATIENT_BY_ID, [patientId, centerId]);
  return result.rows[0];
}

export async function getAllPatientsQuery(centerId: string) {
  const result = await dbpool.query(GET_PATIENTS_BY_CENTER_ID, [centerId]);
  return result.rows;
}

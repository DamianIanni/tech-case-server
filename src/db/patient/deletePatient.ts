import { dbpool } from "../../config/database";
import { DELETE_PATIENT } from "../queriesString/patient";

export async function deletePatientQuery(patient_id: string) {
  const result = await dbpool.query(DELETE_PATIENT, [patient_id]);
  return result.rows[0];
}

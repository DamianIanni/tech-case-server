import { PoolClient } from "pg";
import {
  DELETE_PATIENT,
  DELETE_PATIENT_IN_CENTER,
} from "../queriesString/patient";

export async function deletePatientQuery(
  client: PoolClient,
  patient_id: string
) {
  const result = await client.query(DELETE_PATIENT, [patient_id]);
  return result.rows[0];
}

export async function deletePatientInCenterQuery(
  client: PoolClient,
  patient_id: string,
  center_id: string
) {
  const result = await client.query(DELETE_PATIENT_IN_CENTER, [
    patient_id,
    center_id,
  ]);
  return result.rows[0];
}

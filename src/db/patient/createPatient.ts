import { dbpool } from "../../config/database";
import {
  CREATE_PATIENT,
  CREATE_PATIENT_IN_CENTER,
} from "../queriesString/patient";
import { Patient } from "../../types/patient";

export async function createPatientQuery(
  patient: Partial<Patient>,
  center_id: number
) {
  const {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    short_description,
  } = patient;

  const values = [
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    short_description,
    center_id,
  ];

  const result = await dbpool.query(CREATE_PATIENT, values);
  return result.rows[0];
}

export async function createPatientInCenterQuery(
  patient_id: number,
  center_id: number
) {
  const values = [patient_id, center_id];

  const result = await dbpool.query(CREATE_PATIENT_IN_CENTER, values);
  return result.rows[0];
}

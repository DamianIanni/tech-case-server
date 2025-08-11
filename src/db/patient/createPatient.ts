import { dbpool } from "../../config/database";
import {
  CREATE_PATIENT,
  CREATE_PATIENT_IN_CENTER,
} from "../queriesString/patient";
import { CreatePatientInput } from "../../validations/patientSchema";

export async function createPatientQuery(
  patient: CreatePatientInput,
  centerId: string
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
    centerId,
  ];

  const result = await dbpool.query(CREATE_PATIENT, values);
  return result.rows[0];
}

export async function createPatientInCenterQuery(
  patientId: string,
  centerId: string
) {
  const values = [patientId, centerId];

  const result = await dbpool.query(CREATE_PATIENT_IN_CENTER, values);
  return result.rows[0];
}

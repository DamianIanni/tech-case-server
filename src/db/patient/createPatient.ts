import {
  CREATE_PATIENT,
  CREATE_PATIENT_IN_CENTER,
} from "../queriesString/patient";
import { CreatePatientInput } from "../../validations/patientSchema";
import { PoolClient } from "pg";

export async function createPatientQuery(
  dbConnection: PoolClient,
  patient: CreatePatientInput
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
  ];

  const result = await dbConnection.query(CREATE_PATIENT, values);
  return result.rows[0];
}

export async function createPatientInCenterQuery(
  dbConnection: PoolClient,
  patientId: string,
  centerId: string
) {
  const values = [patientId, centerId];

  const result = await dbConnection.query(CREATE_PATIENT_IN_CENTER, values);
  return result.rows[0];
}

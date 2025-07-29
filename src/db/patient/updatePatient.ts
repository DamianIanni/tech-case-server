import { dbpool } from "../../config/database";
import { UPDATE_PATIENT } from "../../db/queriesString/patient";
import { Patient } from "../../types/patient";

export async function updatePatientQuery(
  patientId: string,
  updateData: Partial<Patient>
) {
  const {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    short_description,
  } = updateData;

  const values = [
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    short_description,
    patientId,
  ];

  const result = await dbpool.query(UPDATE_PATIENT, values);
  return result.rows[0];
}

import {
  deletePatientInCenterQuery,
  deletePatientQuery,
} from "../../db/patient/deletePatient";
import { dbpool } from "../../config/database";

export async function deletePatientService(
  patientId: string,
  centerId: string
) {
  const client = await dbpool.connect();
  try {
    client.query("BEGIN");
    await deletePatientInCenterQuery(client, patientId, centerId);
    await deletePatientQuery(client, patientId);
    client.query("COMMIT");
  } catch (error) {
    client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

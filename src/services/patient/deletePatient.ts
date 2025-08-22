import { deletePatientQuery } from "../../db/patient/deletePatient";
import { dbpool } from "../../config/database";
import { PoolClient } from "pg";

export async function deletePatientService(
  patientId: string,
  transactionClient?: PoolClient
) {
  const client = transactionClient ?? (await dbpool.connect());
  try {
    !transactionClient && client.query("BEGIN");
    await deletePatientQuery(client, patientId);
    !transactionClient && client.query("COMMIT");
  } catch (error) {
    !transactionClient && client.query("ROLLBACK");
    throw error;
  } finally {
    !transactionClient && client.release();
  }
}

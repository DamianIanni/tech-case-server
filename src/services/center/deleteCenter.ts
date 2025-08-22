import { deleteCenterQuery } from "../../db/center/deleteCenterQuery";
import { dbpool } from "../../config/database";
import { PoolClient } from "pg";
import { getAllPatientsInPatientCenter } from "../../db/patient/getPatients";
import { deletePatientsMassive } from "../../services/helpers/deletePatientsMassive";

export const deleteCenterService = async (
  centerId: string,
  transactionClient?: PoolClient
) => {
  const client = transactionClient ?? (await dbpool.connect());
  try {
    !transactionClient && client.query("BEGIN");
    const patientIds = await getAllPatientsInPatientCenter(centerId, client);
    if (patientIds.length > 0) {
      const arrPatientIds = patientIds.map((id) => id.patient_id);
      await deletePatientsMassive(client, arrPatientIds);
    }

    await deleteCenterQuery(centerId, client);
    !transactionClient && client.query("COMMIT");
  } catch (error) {
    !transactionClient && client.query("ROLLBACK");
    throw error;
  } finally {
    !transactionClient && client.release();
  }
};

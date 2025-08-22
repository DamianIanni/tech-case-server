import { dbpool } from "../../config/database";

import { deletePatientsMassive } from "../../services/helpers/deletePatientsMassive";
import { deleteManyCentersQuery } from "../../services/helpers/deleteCentersMassive";
import {
  getAllPatientIdsForCentersQuery,
  getAllCenterIdsInAdminQuery,
} from "../../services/helpers/getMassiveHelper";
import { deleteMeQuery } from "../../db/account/deleteMeQuery";

// ... (importa tus funciones de DB)

export async function deleteMeService(userId: string) {
  const client = await dbpool.connect();
  try {
    // 1. Start the ONLY transaction
    await client.query("BEGIN");

    // 2. Get user roles and centers
    const memberships = await getAllCenterIdsInAdminQuery(client, userId);
    const adminOfCenterIds = memberships.map((m) => m.center_id);

    // 3. If admin of any center, orchestrate mass deletion
    if (adminOfCenterIds.length > 0) {
      // 3a. Collect ALL patient IDs from ALL centers to be deleted in a SINGLE query
      const patientIdsToDelete = await getAllPatientIdsForCentersQuery(
        client,
        adminOfCenterIds
      );

      // 3b. Delete ALL those patients in a SINGLE query
      if (patientIdsToDelete.length > 0) {
        await deletePatientsMassive(client, patientIdsToDelete);
      }

      // 3c. Delete ALL centers in a SINGLE query
      await deleteManyCentersQuery(client, adminOfCenterIds);
    }

    // 4. Finally, delete the user. ON DELETE CASCADE will handle
    //    their 'manager' or 'employee' memberships.
    await deleteMeQuery(client, userId);

    // 5. If everything went well, commit the ONLY transaction
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

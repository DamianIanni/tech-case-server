import { PoolClient } from "pg";

export const getAllPatientIdsForCentersQuery = async (
  client: PoolClient,
  centerIds: string[]
) => {
  const result = await client.query(
    "SELECT patient_id FROM patient_centers WHERE center_id = ANY($1::uuid[])",
    [centerIds]
  );
  return result.rows.map((row) => row.patient_id);
};

export const getAllCenterIdsInAdminQuery = async (
  client: PoolClient,
  userId: string
) => {
  const result = await client.query(
    "SELECT center_id FROM user_centers WHERE user_id = $1 AND role = 'admin'",
    [userId]
  );
  return result.rows;
};

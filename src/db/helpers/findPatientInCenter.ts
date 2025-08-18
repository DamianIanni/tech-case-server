import { PoolClient } from "pg";

const QUERY =
  "SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2";

export const findPatientInCenter = async (
  client: PoolClient,
  patient_id: string,
  center_id: string
) => {
  const result = await client.query(QUERY, [patient_id, center_id]);
  return result;
};

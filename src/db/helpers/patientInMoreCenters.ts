import { PoolClient } from "pg";

export const patientInMoreCenters = async (
  client: PoolClient,
  patient_id: string
) => {
  const result = await client.query(
    "SELECT center_id FROM patient_centers WHERE patient_id = $1",
    [patient_id]
  );
  return result;
};

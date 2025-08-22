import { PoolClient } from "pg";

export const deletePatientsMassive = async (
  client: PoolClient,
  patientIds: string[]
) => {
  const QUERY = "DELETE FROM patients WHERE id = ANY($1::uuid[])";
  await client.query(QUERY, [patientIds]);
};

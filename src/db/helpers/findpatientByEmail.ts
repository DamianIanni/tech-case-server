import { PoolClient } from "pg";

const QUERY = "SELECT id FROM patients WHERE email = $1";

export const findPatientByEmail = async (client: PoolClient, email: string) => {
  const result = await client.query(QUERY, [email]);

  return result;
};

import { PoolClient } from "pg";

export const deleteMeQuery = async (client: PoolClient, userId: string) => {
  const QUERY = "DELETE FROM users WHERE id = $1";
  return client.query(QUERY, [userId]);
};

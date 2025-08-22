import { PoolClient } from "pg";

export const deleteManyCentersQuery = (
  client: PoolClient,
  centerIds: string[]
) => {
  const QUERY = "DELETE FROM centers WHERE id = ANY($1::uuid[])";
  return client.query(QUERY, [centerIds]);
};

import { DELETE_CENTER } from "../queriesString/center";
import { PoolClient } from "pg";

export async function deleteCenterQuery(centerId: string, client: PoolClient) {
  const result = await client.query(DELETE_CENTER, [centerId]);
  return result.rows[0];
}

import { dbpool } from "../../config/database";
import { DELETE_CENTER } from "../queriesString/center";

export async function deleteCenterQuery(centerId: string) {
  const result = await dbpool.query(DELETE_CENTER, [centerId]);
  return result.rows[0];
}

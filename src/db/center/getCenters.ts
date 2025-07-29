import { dbpool } from "../../config/database";
import { GET_ALL_CENTERS, GET_CENTER } from "../queriesString/center";

export async function getAllCentersQuery(user_id: string) {
  const result = await dbpool.query(GET_ALL_CENTERS, [user_id]);
  return result.rows;
}

export async function getCenterQuery(center_id: string, user_id: string) {
  const result = await dbpool.query(GET_CENTER, [center_id, user_id]);
  return result.rows;
}

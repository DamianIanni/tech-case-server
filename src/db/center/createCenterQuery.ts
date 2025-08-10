import { dbpool } from "../../config/database";
import { Center } from "../../types/center";
import { CREATE_CENTER, INSERT_USER_CENTER } from "../queriesString/center";

export async function createCenterQuery({
  name,
  address,
  phone,
}: Partial<Center>) {
  const values = [name, address, phone];
  const result = await dbpool.query(CREATE_CENTER, values);
  return result.rows[0].id;
}

export async function insertUserCenterQuery(values: string[]) {
  const result = await dbpool.query(INSERT_USER_CENTER, values);
  return result.rows[0];
}

import { dbpool } from "../../config/database";
import { Center } from "../../types/center";
import { CREATE_CENTER } from "../queriesString/center";

export async function createCenterQuery({
  name,
  address,
  phone,
}: Partial<Center>) {
  const values = [name, address, phone];
  const result = await dbpool.query(CREATE_CENTER, values);
  return result.rows[0].id;
}

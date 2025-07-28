import { dbpool } from "../../config/database";
import { Center } from "../../types/center";
import { UPDATE_CENTER } from "../queriesString/center";

export const updateCenterQuery = async (values: Partial<Center>) => {
  const { id, name, address, phone } = values;
  const VALUES = [name, address, phone, id];
  const result = await dbpool.query(UPDATE_CENTER, VALUES);
  return result.rows[0];
};

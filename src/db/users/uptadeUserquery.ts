import { dbpool } from "../../config/database";

export const updateUserQuery = async (query: string, values: any) => {
  return await dbpool.query(query, values);
};

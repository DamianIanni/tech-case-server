import { dbpool } from "../../config/database";

export const updateUserQuery = async (query: string, values: any) => {
  dbpool.query(query, values);
};

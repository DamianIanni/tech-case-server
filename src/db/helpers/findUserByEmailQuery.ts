import { dbpool } from "../../config/database";

export const findUserByEmailQuery = async (email: string) => {
  const sql = "SELECT 1 FROM users WHERE email = $1 LIMIT 1";
  const result = await dbpool.query(sql, [email]);
  return result;
};

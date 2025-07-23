import { dbpool } from "../../config/database";

export const findUserByEmailQuery = async (
  email: string,
  register?: boolean
) => {
  const sql = register
    ? "SELECT 1 FROM users WHERE email = $1 LIMIT 1"
    : "SELECT first_name, last_name, email, role, password, id FROM users WHERE email = $1";
  const result = await dbpool.query(sql, [email]);

  return result;
};

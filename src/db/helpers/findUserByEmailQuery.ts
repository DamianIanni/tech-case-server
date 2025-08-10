import { dbpool } from "../../config/database";

//just in case
//"SELECT u.id, u.first_name, u.last_name, u.email, u.password, uc.role FROM users u LEFT JOIN user_centers uc ON u.id = uc.user_id WHERE u.email = $1"

export const findUserByEmailQuery = async (
  email: string,
  register?: boolean
) => {
  const sql = register
    ? "SELECT 1 FROM users WHERE email = $1 LIMIT 1"
    : "SELECT id, password, first_name, last_name FROM users WHERE email = $1";
  const result = await dbpool.query(sql, [email]);

  return result;
};

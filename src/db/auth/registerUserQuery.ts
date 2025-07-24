import { dbpool } from "../../config/database";
import { REGISTER_USER } from "../queriesString/auth";
import { User } from "../../types/users";

export async function registerUserQuery({
  firstName,
  lastName,
  email,
  password,
}: Partial<User>) {
  const values = [firstName, lastName, email, password];

  const result = await dbpool.query(REGISTER_USER, values);
  return result.rows[0].id;
}

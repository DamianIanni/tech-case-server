import { dbpool } from "../../config/database";
import { REGISTER_USER } from "../queriesString/auth";
import { User } from "../../types/users";

export async function registerUserQuery({
  firstName,
  lastName,
  email,
  password,
  role,
}: Partial<User>) {
  const values = [firstName, lastName, email, password, role];

  const result = await dbpool.query(REGISTER_USER, values);
  return result;
}

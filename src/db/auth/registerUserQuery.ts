import { dbpool } from "../../config/database";
import { REGISTER_USER } from "../queriesString/auth";
import { RegisterUserInput } from "../../validations/userSchema";

export async function registerUserQuery({
  firstName,
  lastName,
  email,
  password,
}: RegisterUserInput) {
  const values = [firstName, lastName, email, password];

  const result = await dbpool.query(REGISTER_USER, values);
  return result.rows[0];
}

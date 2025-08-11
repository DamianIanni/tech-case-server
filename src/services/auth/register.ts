import { RegisterUserInput } from "../../validations/userSchema";
import { hashPassword } from "../../utils/auth/hashPassword";
import { registerUserQuery } from "../../db/auth/registerUserQuery";

export async function registerUserService(props: RegisterUserInput) {
  const { firstName, lastName, email, password } = props;

  if (!password) {
    throw new Error('Password is required');
  }

  const hash = await hashPassword(password);

  const result = await registerUserQuery({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return result;
}

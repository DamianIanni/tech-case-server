import { User } from "../../types/users";
import { hashPassword } from "../../utils/auth/hashPassword";
import { registerUserQuery } from "../../db/auth/registerUserQuery";

export async function registerUserService(props: Partial<User>) {
  const { firstName, lastName, email, password } = props;

  const hash = await hashPassword(password!);

  const result = await registerUserQuery({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return result;
}

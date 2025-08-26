import { RegisterUserInput } from "../../validations/userSchema";
import { hashPassword } from "../../utils/auth/hashPassword";
import { registerUserQuery } from "../../db/auth/registerUserQuery";
import { ApiError } from "../../utils/errors/ApiError";
import { AppErrorCode } from "../../constants/errorCodes";

export async function registerUserService(props: RegisterUserInput) {
  const { firstName, lastName, email, password } = props;

  if (!password) {
    throw ApiError.badRequest(undefined, AppErrorCode.AUTH_PASSWORD_REQUIRED);
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

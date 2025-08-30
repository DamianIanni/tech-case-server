import {
  findUserByEmailPasswordQuery,
  findTokenQuery,
  resetPasswordQuery,
  insertResetTokenQuery,
  deleteTokenQuery,
} from "../../db/auth/passwordQuery";
import { generateResetToken } from "../../utils/auth/generateToken";
import { hashPassword } from "../../utils/auth/hashPassword";
import { ApiError } from "../../utils/errors/ApiError";
import { AppErrorCode } from "../../constants/errorCodes";

export const forgotPasswaordService = async (email: string) => {
  const user = await findUserByEmailPasswordQuery(email);
  if (!user) {
    console.log(
      `Password reset request for non-existent email: ${email}. Responding with success to prevent user enumeration.`
    );
    return;
  }
  const user_id = user.id;
  const token = generateResetToken({ userId: user_id });
  await insertResetTokenQuery(user_id, token);

  // (Email simulation)
  console.log(`--- EMAIL SIMULATION ---`);
  console.log(`To: ${user.email}`);
  console.log(`Reset token: ${token}`);
  console.log(`-------------------------`);
};

export const resetPasswordService = async (token: string, password: string) => {
  const _token = await findTokenQuery(token);
  if (!_token) {
    throw ApiError.badRequest(
      undefined,
      AppErrorCode.PASSWORD_RESET_TOKEN_INVALID
    );
  }

  const hashedPassword = await hashPassword(password);

  await resetPasswordQuery(_token.user_id, hashedPassword);
  await deleteTokenQuery(token);
};

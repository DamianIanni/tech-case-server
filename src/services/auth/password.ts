import {
  findUserByEmailPasswordQuery,
  findTokenQuery,
  resetPasswordQuery,
  insertResetTokenQuery,
  deleteTokenQuery,
} from "../../db/auth/passwordQuery";
import { generateResetToken } from "../../utils/auth/generateToken";
import { hashPassword } from "../../utils/auth/hashPassword";

export const forgotPasswaordService = async (email: string) => {
  const user = await findUserByEmailPasswordQuery(email);
  if (!user) {
    console.log(
      `Solicitud de reseteo para email no existente: ${email}. Respondiendo con éxito para evitar enumeración.`
    );
    return;
  }
  const user_id = user.id;
  const token = generateResetToken({ userId: user_id });
  await insertResetTokenQuery(user_id, token);

  // (Simulación de email)
  console.log(`--- SIMULACIÓN DE EMAIL ---`);
  console.log(`Para: ${user.email}`);
  console.log(`Token de reseteo: ${token}`);
  console.log(`-------------------------`);
};

export const resetPasswordService = async (token: string, password: string) => {
  const _token = await findTokenQuery(token);
  console.log("__TOKEN ", _token);
  if (!_token) {
    throw new Error("Token not found or expired");
  }

  const hashedPassword = await hashPassword(password);

  await resetPasswordQuery(_token.user_id, hashedPassword);
  await deleteTokenQuery(token);
};

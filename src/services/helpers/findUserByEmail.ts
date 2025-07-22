import { findUserByEmailQuery } from "../../db/helpers/findUserByEmailQuery";

export const findUserByEmail = async (email: string) => {
  return await findUserByEmailQuery(email);
};

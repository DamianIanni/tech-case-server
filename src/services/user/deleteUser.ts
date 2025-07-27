import { deleteUserQuery } from "../../db/users/deleteUserQuery";

export const deleteUserService = async (user_id: string) => {
  const userId = Number(user_id);
  await deleteUserQuery(userId);
};

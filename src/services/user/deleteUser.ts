import { deleteUserQuery } from "../../db/users/deleteUserQuery";

export const deleteUserService = async (user_id: string) => {
  await deleteUserQuery(user_id);
};

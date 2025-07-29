import {
  getAllUsersQuery,
  getUserByIdQuery,
} from "../../db/users/getAllUsersQuery";

export const getAllUsersService = async (center_id: string) => {
  const result = await getAllUsersQuery(center_id);
  return result;
};

export const getUserByIdService = async (user_id: string) => {
  const result = await getAllUsersQuery(user_id);
  return result;
};

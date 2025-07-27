import {
  getAllUsersQuery,
  getUserByIdQuery,
} from "../../db/users/getAllUsersQuery";

export const getAllUsersService = async (center_id: string) => {
  const centerId = Number(center_id);
  const result = await getAllUsersQuery(centerId);
  return result;
};

export const getUserByIdService = async (user_id: string) => {
  const centerId = Number(user_id);
  const result = await getAllUsersQuery(centerId);
  return result;
};

import { dbpool } from "../../config/database";
import { GET_ALL_USERS_IN_CENTER, GET_USER_BY_ID } from "../queriesString/user";
import { QueryResult } from "pg";
import { UsersTableData } from "../../types/users";

export const getAllUsersQuery = async (center_id: string) => {
  const result: QueryResult<UsersTableData[]> = await dbpool.query(
    GET_ALL_USERS_IN_CENTER,
    [center_id]
  );
  return result;
};

export const getUserByIdQuery = async (user_id: string) => {
  const result: QueryResult<UsersTableData> = await dbpool.query(
    GET_USER_BY_ID,
    [user_id]
  );
  return result;
};

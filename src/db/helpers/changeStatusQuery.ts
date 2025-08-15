import { dbpool } from "../../config/database";

const ACCEPT_QUERY =
  "UPDATE user_centers SET status = 'active' WHERE user_id = $1 AND center_id = $2 AND status = 'pending'";

const REJECT_QUERY =
  "DELETE FROM user_centers WHERE user_id = $1 AND center_id = $2";

export const acceptStatusQuery = async (user_id: string, center_id: string) => {
  const result = await dbpool.query(ACCEPT_QUERY, [user_id, center_id]);
  return result;
};

export const rejectStatusQuery = async (user_id: string, center_id: string) => {
  const result = await dbpool.query(REJECT_QUERY, [user_id, center_id]);
  return result;
};

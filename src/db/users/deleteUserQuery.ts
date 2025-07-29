import { dbpool } from "../../config/database";

export const deleteUserQuery = async (user_id: string) => {
  await dbpool.query("DELETE FROM user_centers WHERE user_id = $1", [user_id]);
  await dbpool.query("DELETE FROM users WHERE id = $1", [user_id]);
  return;
};

import { dbpool } from "../../config/database";

const QUERY =
  "SELECT c.id AS center_id, c.name AS name, c.address AS address, c.phone AS phone, uc.role, uc.status FROM user_centers uc JOIN centers c ON uc.center_id = c.id WHERE uc.user_id = $1";

export const centerContextQuery = async (user_id: string) => {
  const result = await dbpool.query(QUERY, [user_id]);
  return result.rows;
};

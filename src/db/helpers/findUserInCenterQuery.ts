import { dbpool } from "../../config/database";

/**
 * Checks if a user exists in the user_centers table for a specific center
 * @param userId The ID of the user to check
 * @param centerId The ID of the center to check in
 * @returns Query result with user's center information if found
 */
export const findUserInCenterQuery = async (userId: string, centerId: string) => {
  const result = await dbpool.query(
    `SELECT * FROM user_centers 
     WHERE user_id = $1 AND center_id = $2`,
    [userId, centerId]
  );
  return result;
};

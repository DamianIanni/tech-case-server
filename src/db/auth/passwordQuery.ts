import { dbpool } from "../../config/database";

/**
 * Finds a user by their email address for password-related operations
 * @param email - The email address to search for
 * @returns A promise that resolves to the query result containing user ID
 */
export const findUserByEmailPasswordQuery = async (email: string) => {
  const result = await dbpool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

/**
 * Inserts a new password reset token for a user
 * @param user_id - The ID of the user requesting password reset
 * @param token - The generated reset token to store
 * @returns A promise that resolves when the token is inserted
 */
export const insertResetTokenQuery = async (user_id: string, token: string) => {
  return await dbpool.query(
    "INSERT INTO password_reset_tokens (user_id, token) VALUES ($1, $2)",
    [user_id, token]
  );
};

/**
 * Deletes a used or expired password reset token
 * @param token - The token to delete
 * @returns A promise that resolves when the token is deleted
 */
export const deleteTokenQuery = async (token: string) => {
  return await dbpool.query(
    "DELETE FROM password_reset_tokens WHERE token = $1",
    [token]
  );
};

/**
 * Updates a user's password in the database
 * @param user_id - The ID of the user whose password to update
 * @param password - The new hashed password
 * @returns A promise that resolves when the password is updated
 */
export const resetPasswordQuery = async (user_id: string, password: string) => {
  return await dbpool.query("UPDATE users SET password = $1 WHERE id = $2", [
    password,
    user_id,
  ]);
};

/**
 * Finds a password reset token in the database
 * @param token - The token to search for
 * @returns A promise that resolves to the token record if found
 */
export const findTokenQuery = async (token: string) => {
  console.log("TOKEN EN LA QUERy", token);
  const result = await dbpool.query(
    "SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()",
    [token]
  );
  console.log("TOKEN EN LA QUERy", result);
  return result.rows[0];
};

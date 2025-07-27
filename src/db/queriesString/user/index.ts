export const ADD_INVITE_USER_CENTER =
  "INSERT INTO user_centers (user_id, center_id, role, status) VALUES ($1, $2, $3, $4)";

export const GET_ALL_USERS_IN_CENTER =
  "SELECT * FROM user_details WHERE center_id = $1";

export const GET_USER_BY_ID = "SELECT * FROM user_details WHERE user_id = $1";

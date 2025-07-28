export const CREATE_CENTER =
  "INSERT INTO centers (name, address, phone) VALUES ($1, $2, $3) RETURNING id";
export const DELETE_CENTER = "DELETE FROM centers WHERE id = $1 RETURNING id";
export const GET_ALL_CENTERS =
  "SELECT * FROM center_summary_view WHERE admin_id = $1";
export const GET_CENTER =
  "SELECT * FROM center_summary_view WHERE id = $1 AND admin_id = $2";
export const UPDATE_CENTER = `
  UPDATE centers 
  SET 
    name = COALESCE($1, name),
    address = COALESCE($2, address),
    phone = COALESCE($3, phone),
  WHERE id = $4 
  RETURNING *
`;

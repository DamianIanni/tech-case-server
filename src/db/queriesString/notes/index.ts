export const DELETE_NOTE =
  "DELETE FROM notes WHERE id = $1 AND patient_id = $2";

export const CREATE_NOTE = `
  INSERT INTO notes (
    patient_id,
    note
  ) VALUES ($1, $2)
  RETURNING *
`;

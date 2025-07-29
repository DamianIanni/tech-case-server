export const UPDATE_NOTE = `
  UPDATE notes 
  SET 
    note = COALESCE($1, note),
    date = COALESCE($2, date),
  WHERE id = $3 patient_id = $4
  RETURNING *
`;

export const CREATE_NOTE = `
  INSERT INTO notes (
    patient_id,
    note,
    date
  ) VALUES ($1, $2, $3)
  RETURNING *
`;

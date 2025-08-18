export const CREATE_PATIENT = `
  INSERT INTO patients (
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    short_description
  ) VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
`;

export const CREATE_PATIENT_IN_CENTER = `
  INSERT INTO patient_centers (
    patient_id,
    center_id
  ) VALUES ($1, $2)
  RETURNING *
`;

export const DELETE_PATIENT = `
  DELETE FROM patients 
  WHERE id = $1
  RETURNING id
`;

export const DELETE_PATIENT_IN_CENTER = `
  DELETE FROM patient_centers 
  WHERE patient_id = $1 AND center_id = $2
  RETURNING *
`;

export const GET_PATIENT_BY_ID = `SELECT * FROM full_patient_data_with_notes WHERE patient_id = $1 AND center_id = $2`;
export const GET_PATIENTS_BY_CENTER_ID = `SELECT * FROM patients_with_notes WHERE center_id = $1`;
export const UPDATE_PATIENT = `
  UPDATE patients 
  SET 
    first_name = COALESCE($1, first_name),
    last_name = COALESCE($2, last_name),
    email = COALESCE($3, email),
    phone = COALESCE($4, phone),
    date_of_birth = COALESCE($5, date_of_birth),
    short_description = COALESCE($6, short_description)
  WHERE id = $7
  RETURNING *
`;

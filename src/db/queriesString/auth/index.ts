const REGISTER_USER =
  "INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)";

export { REGISTER_USER };

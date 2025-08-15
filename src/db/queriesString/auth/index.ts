const REGISTER_USER =
  "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";

const LOGIN_USER =
  "SELECT first_name, last_name, email FROM users WHERE email = $1 AND password = $2";

export { REGISTER_USER, LOGIN_USER };

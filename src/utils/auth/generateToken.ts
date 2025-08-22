import jwt from "jsonwebtoken";
import { env } from "../../config/env";

const JWT_SECRET = env.JWT_SECRET!;
const EXPIRES_IN = "1d";

const JWT_TEMP_SECRET = env.JWT_TEMP_SECRET!;
const TEMP_EXPIRES_IN = "5m";

const JWT_RESET_SECRET = env.JWT_RESET_SECRET!;
const RESET_EXPIRES_IN = 60 * 60 * 1000;

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function generateTempToken(payload: object) {
  return jwt.sign(payload, JWT_TEMP_SECRET, {
    expiresIn: TEMP_EXPIRES_IN,
  });
}

export function generateResetToken(payload: object) {
  return jwt.sign(payload, JWT_RESET_SECRET, {
    expiresIn: RESET_EXPIRES_IN,
  });
}

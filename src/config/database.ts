import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const dbpool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

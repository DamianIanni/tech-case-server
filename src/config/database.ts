import { Pool } from "pg";
import { env } from "./env";

export const dbpool = new Pool({
  connectionString: env.DATABASE_URL,
});

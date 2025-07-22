// src/config/env.ts
import dotenv from "dotenv";
import path from "path";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

console.log(`✅ Loaded environment from ${envFile}`);

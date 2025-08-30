import { z } from "zod";
// Using Node.js built-in dotenv loader (v20+)
import path from "path";

// Load environment variables from the appropriate .env file
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
const envPath = path.resolve(process.cwd(), envFile);

// Load variables into process.env using native Node.js method
// @ts-ignore – Type definitions may not yet include this experimental API
(process as any).loadEnvFile?.(envPath) ??
  console.warn(
    "process.loadEnvFile is unavailable. Ensure you are running Node.js v20+"
  );

// Define the schema for environment variables
const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("4000"),

  // Database
  DATABASE_URL: z.url(),

  // JWT
  JWT_SECRET: z.string().min(2), // dev porpuse only
  JWT_TEMP_SECRET: z.string().min(2), // dev porpuse only
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_TEMP_EXPIRES_IN: z.string().default("5m"),
  JWT_RESET_SECRET: z.string().min(2), // dev porpuse only

  // CORS
  CORS_ORIGIN: z.string().url().default("http://localhost:3000"),

  // Optional variables with defaults
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug"]).default("info"),
  API_PREFIX: z.string().default("/api"),
});

// Validate environment variables against the schema
const validateEnv = () => {
  try {
    const envVars = process.env;
    const validatedEnv = envSchema.parse(envVars);

    console.log(`✅ Environment variables loaded successfully from ${envFile}`);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      error.issues.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
    } else {
      console.error("❌ Failed to load environment variables:", error);
    }
    process.exit(1);
  }
};

// Export validated environment variables
export const env = validateEnv();

// Export type for TypeScript
export type Env = z.infer<typeof envSchema>;

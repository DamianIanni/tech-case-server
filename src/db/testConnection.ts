import { dbpool } from "../config/database";

export async function testDbConnection() {
  try {
    const res = await dbpool.query("SELECT NOW()");
    console.log("✅ Database connected at:", res.rows[0].now);
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  } finally {
    await dbpool.end();
  }
}

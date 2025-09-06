import { Router } from "express";
import { seedDatabaseController } from "../controllers/cron/seedController";
import { cronSecretMiddleware } from "../middlewares/cronSecretMiddleware";

const cronRouter = Router();

/**
 * @route POST /cron/seed
 * @desc Seed the database with demo data
 * @access Private (requires CRON_JOB_SECRET)
 */
cronRouter.post("/seed", cronSecretMiddleware, seedDatabaseController);

export { cronRouter };

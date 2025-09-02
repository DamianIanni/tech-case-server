import { Router } from "express";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";
import secondRouter from "./secondRouter";
import accountRouter from "./account";
import { tokenRouter } from "./token";
import { tempAuthMiddleware } from "../middlewares/tempAuthMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { createCenterController } from "../controllers/center";
import { createCenterSchema } from "../validations/centerSchema";
import { swaggerRouter } from "./swagger";

const mainRouter = Router({ mergeParams: true });

// API Routes
mainRouter.use("/auth", authRouter);
mainRouter.use("/account", tempAuthMiddleware, accountRouter);
mainRouter.use("/center-selection", tempAuthMiddleware, tokenRouter);
mainRouter.use(
  "/create-center",
  tempAuthMiddleware,
  validateSchemaMiddleware(createCenterSchema, "body"),
  createCenterController
);
mainRouter.use("/center", authMiddleware, secondRouter);

// Swagger Documentation
mainRouter.use("/docs", swaggerRouter);

export default mainRouter;

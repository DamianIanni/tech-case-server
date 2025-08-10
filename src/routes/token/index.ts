import Router from "express";
import { finalTokenController } from "../../controllers/token/finalToken";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { centerIdRoleSchema } from "../../validations/idsSchema";

export const tokenRouter = Router();

tokenRouter.post(
  "/",
  validateSchemaMiddleware(centerIdRoleSchema, "body"),
  finalTokenController
);

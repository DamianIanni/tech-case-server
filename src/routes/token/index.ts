import Router from "express";
import { finalTokenController } from "../../controllers/token/finalToken";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { centerIdRoleSchema } from "../../validations/idsSchema";
import { getAllCentersController } from "../../controllers/center";

export const tokenRouter = Router();

tokenRouter.post(
  "/",
  validateSchemaMiddleware(centerIdRoleSchema, "body"),
  finalTokenController
);

tokenRouter.get(
  "/all-centers",
  // requireMinRole("employee"),
  //   validateSchemaMiddleware(centerIdSchema, "params"),
  getAllCentersController
);

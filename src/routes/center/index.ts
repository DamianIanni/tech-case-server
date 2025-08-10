import { Router } from "express";
import {
  createCenterController,
  deleteCenterController,
  getCenterController,
  getAllCentersController,
  updateCenterController,
} from "../../controllers/center";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  createCenterSchema,
  updateCenterSchema,
} from "../../validations/centerSchema";
import {
  centerUserIdSchema,
  centerIdSchema,
} from "../../validations/idsSchema";
import { authorizeAdminInCenter } from "../../middlewares/authAdminInCenter";
import { requireMinRole } from "../../middlewares/requireMinRole";

const centerRouter = Router({ mergeParams: true });

centerRouter.post(
  "/",
  validateSchemaMiddleware(createCenterSchema, "body"),
  requireMinRole("admin"),
  createCenterController
);

centerRouter.get(
  "/all-centers",
  // requireMinRole("employee"),
  //   validateSchemaMiddleware(centerIdSchema, "params"),
  getAllCentersController
);

centerRouter.patch(
  "/:center_id",
  authorizeAdminInCenter,
  validateSchemaMiddleware(centerIdSchema, "params"),
  validateSchemaMiddleware(updateCenterSchema, "body"),
  updateCenterController
);

centerRouter.delete(
  "/:center_id",
  authorizeAdminInCenter,
  validateSchemaMiddleware(centerIdSchema, "params"),
  deleteCenterController
);

centerRouter.get(
  "/:center_id",
  authorizeAdminInCenter,
  // validateSchemaMiddleware(centerUserIdSchema, "params"),
  getCenterController
);

export default centerRouter;

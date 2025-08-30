import { Router } from "express";
import {
  deleteCenterController,
  getCenterController,
  getAllCentersController,
  updateCenterController,
} from "../../controllers/center";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { updateCenterSchema } from "../../validations/centerSchema";
import { centerIdSchema } from "../../validations/idsSchema";
import { requireMinRole } from "../../middlewares/requireMinRole";

const centerRouter = Router({ mergeParams: true });

centerRouter.get("/all-centers", getAllCentersController);

centerRouter.patch(
  "/:center_id",
  requireMinRole("admin"),
  validateSchemaMiddleware(centerIdSchema, "params"),
  validateSchemaMiddleware(updateCenterSchema, "body"),
  updateCenterController
);

centerRouter.delete(
  "/:center_id",
  validateSchemaMiddleware(centerIdSchema, "params"),
  requireMinRole("admin"),
  deleteCenterController
);

centerRouter.get("/me", requireMinRole("admin"), getCenterController);

export default centerRouter;

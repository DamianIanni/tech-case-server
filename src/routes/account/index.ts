import { Router } from "express";
import { getMeController, updateMeController } from "../../controllers/account";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { updateUserSchema } from "../../validations/userSchema";
import { centerIdSchema } from "../../validations/idsSchema";
import {
  statusAcceptController,
  statusRejectController,
} from "../../controllers/account/status";

const accountRouter = Router({ mergeParams: true });

// Assumes authentication middleware sets req.user
accountRouter.get("/me", getMeController);
accountRouter.patch(
  "/me",
  validateSchemaMiddleware(updateUserSchema, "body"),
  updateMeController
);

accountRouter.post(
  "/accept/:center_id",
  validateSchemaMiddleware(centerIdSchema, "params"),
  statusAcceptController
);

accountRouter.post(
  "/reject/:center_id",
  validateSchemaMiddleware(centerIdSchema, "params"),
  statusRejectController
);

export default accountRouter;

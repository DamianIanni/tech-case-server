import { Router } from "express";
import { getMeController, updateMeController } from "../../controllers/account";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { centerIdSchema } from "../../validations/idsSchema";
import {
  statusAcceptController,
  statusRejectController,
} from "../../controllers/account/status";
import { deleteMeController } from "../../controllers/account/deleteMe";
import { updateAccountSchema } from "../../validations/accountSchema";

const accountRouter = Router({ mergeParams: true });

accountRouter.get("/me", getMeController);

accountRouter.patch(
  "/me",
  validateSchemaMiddleware(updateAccountSchema, "body"),
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

accountRouter.delete("/me", deleteMeController);
export default accountRouter;

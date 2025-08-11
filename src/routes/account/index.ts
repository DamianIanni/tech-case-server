import { Router } from "express";
import { getMeController, updateMeController } from "../../controllers/account";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { updateUserSchema } from "../../validations/userSchema";

const accountRouter = Router();

// Assumes authentication middleware sets req.user
accountRouter.get("/me", getMeController);
accountRouter.patch(
  "/me",
  validateSchemaMiddleware(updateUserSchema, "body"),
  updateMeController
);

export default accountRouter;

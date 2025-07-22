import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { registerUserSchema } from "../../validations/userSchema";
import { asyncHandler } from "../../utils/asyncHandler";
import { registerUserController } from "../../controllers/auth";
import { userExistMiddleware } from "../../middlewares/auth/userExist";

const authRouter = Router();

authRouter.post(
  "/",
  validateSchemaMiddleware(registerUserSchema, "body"),
  userExistMiddleware,
  registerUserController
);

export default authRouter;

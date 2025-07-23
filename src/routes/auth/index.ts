import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../validations/userSchema";
import { registerUserController } from "../../controllers/auth";
import { userExistMiddleware } from "../../middlewares/auth/userExist";
import { passwordMiddleware } from "../../middlewares/auth/passwordMidleware";
import { loginUserController } from "../../controllers/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSchemaMiddleware(registerUserSchema, "body"),
  userExistMiddleware,
  registerUserController
);

authRouter.post(
  "/login",
  validateSchemaMiddleware(loginUserSchema, "body"),
  passwordMiddleware,
  loginUserController
);

export default authRouter;

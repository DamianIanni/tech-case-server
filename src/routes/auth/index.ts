import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../validations/userSchema";
import { registerUserController, loginUserController, logoutUserController } from "../../controllers/auth";
import { userExistMiddleware } from "../../middlewares/auth/userExist";
import { passwordMiddleware } from "../../middlewares/auth/passwordMidleware";

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

authRouter.post("/logout", (req, res, next) => logoutUserController(req, res, next));

export default authRouter;

import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../validations/userSchema";
import {
  emailResetpasswordSchema,
  resetPasswordSchema,
  tokenResetPasswordSchema,
} from "../../validations/accountSchema";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../../controllers/auth";
import { userExistMiddleware } from "../../middlewares/auth/userExist";
import { passwordMiddleware } from "../../middlewares/auth/passwordMidleware";
import { forgotPasswordController } from "../../controllers/auth/forgotPassword";
import { resetPasswordController } from "../../controllers/auth/resetPassword";

const authRouter = Router({ mergeParams: true });

authRouter.post(
  "/register",
  validateSchemaMiddleware(registerUserSchema, "body"),
  userExistMiddleware,
  registerUserController
);

authRouter.post(
  "/forgot-password",
  validateSchemaMiddleware(emailResetpasswordSchema, "body"),
  forgotPasswordController
);

authRouter.post(
  "/reset-password/:token",
  validateSchemaMiddleware(tokenResetPasswordSchema, "params"),
  validateSchemaMiddleware(resetPasswordSchema, "body"),
  resetPasswordController
);

authRouter.post(
  "/login",
  validateSchemaMiddleware(loginUserSchema, "body"),
  passwordMiddleware,
  loginUserController
);

authRouter.post("/logout", (req, res, next) =>
  logoutUserController(req, res, next)
);

export default authRouter;

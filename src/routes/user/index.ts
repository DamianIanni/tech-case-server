import { Router } from "express";
import {
  registerInviteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../../controllers/users";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  inviteUserSchema,
  updateUserSchema,
} from "../../validations/userSchema";
import {
  centerUserIdSchema,
  centerIdSchema,
} from "../../validations/idsSchema";
import { userExistMiddleware } from "../../middlewares/auth/userExist";
import { authorizeAdminInCenter } from "../../middlewares/authAdminInCenter";

const userRouter = Router({ mergeParams: true });

userRouter.use(authorizeAdminInCenter);

userRouter.post(
  "/invite",
  validateSchemaMiddleware(inviteUserSchema, "body"),
  userExistMiddleware,
  registerInviteUserController
);

userRouter.get(
  "/",
  validateSchemaMiddleware(centerIdSchema, "params"),
  getAllUsersController
);

userRouter.get(
  "/:user_id",
  validateSchemaMiddleware(centerUserIdSchema, "params"),
  getUserByIdController
);

userRouter.patch(
  "/:user_id",
  validateSchemaMiddleware(centerUserIdSchema, "params"),
  validateSchemaMiddleware(updateUserSchema, "body"),
  updateUserController
);

userRouter.delete(
  "/:user_id",
  validateSchemaMiddleware(centerUserIdSchema, "params"),
  deleteUserController
);

export default userRouter;

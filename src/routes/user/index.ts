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
import { userIdSchema } from "../../validations/idsSchema";
import { requireMinRole } from "../../middlewares/requireMinRole";
import { userExistsByEmail } from "../../middlewares/userExists";
import {
  checkUserInCenter,
  checkUserInCenterToContinue,
} from "../../middlewares/checkUserInCenter";

const userRouter = Router({ mergeParams: true });

userRouter.get("/", requireMinRole("manager"), getAllUsersController);

userRouter.get(
  "/:user_id",
  validateSchemaMiddleware(userIdSchema, "params"),
  requireMinRole("manager"),
  getUserByIdController
);

userRouter.post(
  "/",
  validateSchemaMiddleware(inviteUserSchema, "body"),
  requireMinRole("manager"),
  userExistsByEmail,
  checkUserInCenter,
  registerInviteUserController
);

userRouter.patch(
  "/:user_id",
  validateSchemaMiddleware(userIdSchema, "params"),
  validateSchemaMiddleware(updateUserSchema, "body"),
  requireMinRole("manager"),
  checkUserInCenterToContinue,
  updateUserController
);

userRouter.delete(
  "/:user_id",
  validateSchemaMiddleware(userIdSchema, "params"),
  requireMinRole("manager"),
  checkUserInCenterToContinue,
  deleteUserController
);

export default userRouter;

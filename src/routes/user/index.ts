import { Router } from "express";
import { registerInviteUserController } from "../../controllers/users";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { inviteUserSchema } from "../../validations/userSchema";
import { userExistMiddleware } from "../../middlewares/auth/userExist";
import { authorizeAdminInCenter } from "../../middlewares/authAdminInCenter";

const userRouter = Router({ mergeParams: true });

// Route to invite a user to a center
userRouter.post(
  "/",
  authorizeAdminInCenter,
  userExistMiddleware,
  validateSchemaMiddleware(inviteUserSchema, "body"),
  registerInviteUserController
);

// Route to delete a user
userRouter.delete(
  "/",
  authorizeAdminInCenter,
  validateSchemaMiddleware(inviteUserSchema, "body"),
  registerInviteUserController
);

// Route to update a user
userRouter.patch(
  "/",
  authorizeAdminInCenter,
  validateSchemaMiddleware(inviteUserSchema, "body"),
  registerInviteUserController
);

// Route to get a user
userRouter.get(
  "/",
  authorizeAdminInCenter,
  validateSchemaMiddleware(inviteUserSchema, "body"),
  registerInviteUserController
);

export default userRouter;

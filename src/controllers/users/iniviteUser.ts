import { Request, Response } from "express";
import { InviteUserInput } from "../../validations/userSchema";
import { registerUserService } from "../../services/auth";
import { addInvitedUserService } from "../../services/user";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerInviteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const user_invited_id = res.locals.user.id;
    const { role } = req.body;
    console.log(user_invited_id);

    const result = await addInvitedUserService({
      user_id: user_invited_id,
      center_id,
      role,
      status: "active",
    });
    res.status(201).json(result);
  }
);

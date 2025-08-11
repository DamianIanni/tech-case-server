import { Request, Response } from "express";
import { InviteUserInput } from "../../validations/userSchema";
import { registerUserService } from "../../services/auth";
import { addInvitedUserService } from "../../services/user";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerInviteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;
    const user = { firstName, lastName, email, password };

    const user_id = await registerUserService(user);
    console.log(user_id);

    // user_id, center_id, role, status
    const result = await addInvitedUserService({
      user_id,
      center_id,
      role,
      status: "pending",
    });
    res.status(201).json(result);
  }
);

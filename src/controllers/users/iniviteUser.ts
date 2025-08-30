import { Request, Response } from "express";
import { addInvitedUserService } from "../../services/user";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

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
      status: "pending",
    });
    sendSuccess(res, result, 201);
  }
);

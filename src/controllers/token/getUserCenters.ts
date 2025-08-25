import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { centerContextService } from "../../services/helpers/centerContext";
import { sendSuccess } from "../../handler/responseHandler";

export const getUserCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user!;
    const centerContext = await centerContextService(id);
    sendSuccess(res, { centerContext });
  }
);

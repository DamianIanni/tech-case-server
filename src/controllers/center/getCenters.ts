import { Request, Response } from "express";
import { getCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { centerContextService } from "../../services/helpers/centerContext";
import { sendSuccess } from "../../handler/responseHandler";

export const getAllCentersController = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user!.id!;

    const centerContext = await centerContextService(user_id);
    if (!centerContext.length) {
      return sendSuccess(res, []);
    }

    sendSuccess(res, centerContext);
  }
);

export const getCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user!.id!;
    const center_id = req.user!.center_id!;

    const center = await getCenterService(center_id, user_id);

    if (!center) {
      return sendSuccess(res, null);
    }

    sendSuccess(res, center[0]);
  }
);

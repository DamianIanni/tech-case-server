import { Request, Response } from "express";
import { getAllCentersService, getCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { centerContextService } from "../../services/helpers/centerContext";

export const getAllCentersController = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user!.id!;
    // const centers = await getAllCentersService(user_id);

    const centerContext = await centerContextService(user_id);
    if (!centerContext.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(centerContext);
  }
);

export const getCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user!.id!;
    const center_id = req.user!.center_id!;

    const center = await getCenterService(center_id, user_id);

    if (!center) {
      return res.status(200).json(null);
    }

    res.status(200).json(center[0]);
  }
);

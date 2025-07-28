import { Request, Response } from "express";
import { getAllCentersService, getCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";

export const getAllCentersController = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user!.id!;
    const centers = await getAllCentersService(user_id);

    if (!centers.length) {
      return res.status(200).json({ centers: [] });
    }

    res.status(200).json({ centers });
  }
);

export const getCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;
    const user_id = req.user!.id!;
    const center = await getCenterService(center_id, user_id);

    if (!center) {
      return res.status(200).json({ center: null });
    }

    res.status(200).json({ center });
  }
);

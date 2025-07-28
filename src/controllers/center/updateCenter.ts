import { Request, Response } from "express";
import { Center } from "../../types/center";
import { updateCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";

export const updateCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;
    const updateData: Partial<Center> = req.body;

    const updatedCenter = await updateCenterService(center_id, updateData);

    res.status(200).json(updatedCenter);
  }
);

import { Request, Response } from "express";
import { deleteCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";

export const deleteCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;

    const result = await deleteCenterService(center_id);
    res.status(200).json({ message: "Center deleted successfully" });
  }
);

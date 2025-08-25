import { Request, Response } from "express";
import { deleteCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

export const deleteCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;

    const result = await deleteCenterService(center_id);
    sendSuccess(res, { message: "Center deleted successfully" });
  }
);

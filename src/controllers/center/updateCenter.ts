import { Request, Response } from "express";
import { UpdateCenterInput } from "../../validations/centerSchema";
import { updateCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../handler/responseHandler";

export const updateCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { center_id } = req.params;
    const updateData: UpdateCenterInput = req.body;

    const updatedCenter = await updateCenterService(center_id, updateData);

    sendSuccess(res, updatedCenter);
  }
);

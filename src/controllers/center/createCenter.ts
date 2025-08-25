import { Request, Response } from "express";
import { CreateCenterInput } from "../../validations/centerSchema";
import { createCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { insertUserCenterService } from "../../services/center/createCenter";
import { sendSuccess } from "../../handler/responseHandler";

export const createCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, address, phone }: CreateCenterInput = req.body;
    const center = { name, address, phone };
    const center_id = await createCenterService(center);
    await insertUserCenterService(center_id, req.user!.id!);
    sendSuccess(res, center_id, 201);
  }
);

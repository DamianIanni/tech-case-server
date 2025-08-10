import { Request, Response } from "express";
import { Center } from "../../types/center";
import { createCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";
import { insertUserCenterService } from "../../services/center/createCenter";

export const createCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, address, phone }: Partial<Center> = req.body;
    const center = { name, address, phone };
    const center_id = await createCenterService(center);
    await insertUserCenterService(center_id, req.user!.id!);
    res.status(201).json(center_id);
  }
);

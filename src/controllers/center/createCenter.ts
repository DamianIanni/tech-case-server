import { Request, Response } from "express";
import { Center } from "../../types/center";
import { createCenterService } from "../../services/center";
import { asyncHandler } from "../../utils/asyncHandler";

export const createCenterController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, address, phone }: Partial<Center> = req.body;
    const center = { name, address, phone };
    const result = await createCenterService(center);
    res.status(201).json(result);
  }
);

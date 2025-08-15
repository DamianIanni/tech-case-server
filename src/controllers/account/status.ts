import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  acceptStatusQuery,
  rejectStatusQuery,
} from "../../db/helpers/changeStatusQuery";

export const statusAcceptController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req!.user!;
    const { center_id } = req.params;
    const result = await acceptStatusQuery(id!, center_id!);
    res.status(200).json(result);
  }
);

export const statusRejectController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req!.user!;
    const { center_id } = req.params;
    const result = await rejectStatusQuery(id!, center_id!);
    res.status(200).json(result);
  }
);

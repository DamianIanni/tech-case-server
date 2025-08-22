import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Maybe center_id
    const { id, first_name, last_name, email, role } = req.user;

    res.status(200).json({ id, first_name, last_name, email, role });
  }
);

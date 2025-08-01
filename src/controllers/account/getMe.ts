import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id, firstName, lastName, email } = req.user;
    res.status(200).json({ id, firstName, lastName, email });
  }
);

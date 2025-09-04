import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createNoteService } from "../../services/patient/note";
import { sendSuccess } from "../../handler/responseHandler";

export const createNoteController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    const noteData = req.body;

    const note = await createNoteService(patient_id, noteData);
    sendSuccess(res, note, 201);
  }
);

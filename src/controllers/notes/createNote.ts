import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Note } from "../../types/note";
import { createNoteService } from "../../services/patient/note";

export const createNoteController = asyncHandler(
  async (req: Request, res: Response) => {
    const { centerId, patientId } = req.params;
    const noteData: Partial<Note> = req.body;

    const note = await createNoteService(patientId, noteData);
    res.status(201).json(note);
  }
);

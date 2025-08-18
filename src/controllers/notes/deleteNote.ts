import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteNoteService } from "../../services/patient/note";

export const deleteNoteController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id, note_id } = req.params;

    const updatedNote = await deleteNoteService(note_id, patient_id);

    res.status(200).json(updatedNote);
  }
);

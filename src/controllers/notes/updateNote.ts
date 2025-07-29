import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Note } from "../../types/note";
import { updateNoteService } from "../../services/patient/note";

export const updateNoteController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patientId, noteId } = req.params;
    const updateData: Partial<Note> = req.body;

    const updatedNote = await updateNoteService(noteId, patientId, updateData);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  }
);

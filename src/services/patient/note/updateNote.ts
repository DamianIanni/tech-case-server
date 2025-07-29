import { updateNoteQuery } from "../../../db/note";
import { Note } from "../../../types/note";

export async function updateNoteService(
  noteId: string,
  patientId: string,
  updateData: Partial<Note>
) {
  return await updateNoteQuery(noteId, patientId, updateData);
}

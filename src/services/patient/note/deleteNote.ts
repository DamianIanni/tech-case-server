import { deleteNoteQuery } from "../../../db/note";

export async function deleteNoteService(noteId: string, patientId: string) {
  return await deleteNoteQuery(noteId, patientId);
}

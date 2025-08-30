import { deleteNoteQuery, updateNoteQuery } from "../../../db/note";

export async function deleteNoteService(noteId: string, patientId: string) {
  return await deleteNoteQuery(noteId, patientId);
}

export async function updateNoteService(noteId: string, patientId: string, updateData: { note?: string; date?: Date }) {
  return await updateNoteQuery(noteId, patientId, updateData);
}

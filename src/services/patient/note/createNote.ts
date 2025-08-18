import { createNoteQuery } from "../../../db/note";
import { Note } from "../../../types/note";

export async function createNoteService(
  patientId: string,
  noteData: Pick<Note, "note">
) {
  return await createNoteQuery(patientId, noteData.note);
}

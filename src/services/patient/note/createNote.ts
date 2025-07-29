import { createNoteQuery } from "../../../db/note";
import { Note } from "../../../types/note";

export async function createNoteService(
  patientId: string,
  noteData: Partial<Note>
) {
  const { note, date } = noteData;
  return await createNoteQuery(patientId, note!, date!);
}

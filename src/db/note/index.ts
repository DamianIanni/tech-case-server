import { dbpool } from "../../config/database";
import { CREATE_NOTE, UPDATE_NOTE } from "../queriesString/notes";
import { Note } from "../../types/note";

export async function createNoteQuery(
  patientId: string,
  note: string,
  date: Date
) {
  const result = await dbpool.query(CREATE_NOTE, [patientId, note, date]);
  return result.rows[0];
}

export async function updateNoteQuery(
  noteId: string,
  patientId: string,
  updateData: Partial<Note>
) {
  const { note, date } = updateData;
  const result = await dbpool.query(UPDATE_NOTE, [
    note,
    date,
    noteId,
    patientId,
  ]);
  return result.rows[0];
}

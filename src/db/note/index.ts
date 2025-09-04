import { dbpool } from "../../config/database";
import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../queriesString/notes";

export async function createNoteQuery(patientId: string, note: string) {
  const result = await dbpool.query(CREATE_NOTE, [patientId, note]);
  return result.rows[0];
}

export async function deleteNoteQuery(noteId: string, patientId: string) {
  const result = await dbpool.query(DELETE_NOTE, [noteId, patientId]);
  return result.rowCount;
}

export async function updateNoteQuery(
  noteId: string,
  patientId: string,
  updateData: { note?: string; date?: Date }
) {
  const { note, date } = updateData;
  const result = await dbpool.query(UPDATE_NOTE, [
    noteId,
    patientId,
    note,
    date,
  ]);
  return result.rows[0];
}

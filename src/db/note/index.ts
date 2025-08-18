import { dbpool } from "../../config/database";
import { CREATE_NOTE, DELETE_NOTE } from "../queriesString/notes";

export async function createNoteQuery(patientId: string, note: string) {
  const result = await dbpool.query(CREATE_NOTE, [patientId, note]);
  return result.rows[0];
}

export async function deleteNoteQuery(noteId: string, patientId: string) {
  const result = await dbpool.query(DELETE_NOTE, [noteId, patientId]);
  console.log(result);
  return result.rowCount;
}

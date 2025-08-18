import { CreatePatientInput } from "../../validations/patientSchema";
import { dbpool } from "../../config/database";
import {
  createPatientQuery,
  createPatientInCenterQuery,
} from "../../db/patient/createPatient";
import { findPatientInCenter } from "../../db/helpers/findPatientInCenter";

export async function createPatientService(
  patientData: CreatePatientInput,
  centerId: string
) {
  const client = await dbpool.connect();
  try {
    // 1. Inicia una transacción
    await client.query("BEGIN");

    const checkDuplicateQuery = `
    SELECT 1 FROM patients p
    JOIN patient_centers pc ON p.id = pc.patient_id
    WHERE p.email = $1 AND pc.center_id = $2
    LIMIT 1;
  `;
    const duplicateResult = await client.query(checkDuplicateQuery, [
      patientData.email,
      centerId,
    ]);

    // Si la consulta devuelve una fila, el paciente ya existe en este centro.
    if (duplicateResult.rowCount && duplicateResult.rowCount > 0) {
      throw new Error("Ya existe un paciente con este email en tu centro."); // 409 Conflict
    }

    const newPatientResult = await createPatientQuery(client, patientData);
    const patientId = newPatientResult.id;

    await createPatientInCenterQuery(client, patientId, centerId);

    await client.query("COMMIT");

    return { patientId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

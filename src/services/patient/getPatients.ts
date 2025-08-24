import {
  getPatientQuery,
  getAllPatientsQuery,
} from "../../db/patient/getPatients";
import { dbpool } from "../../config/database";

export async function getPatientService(patientId: string, centerId: string) {
  const patient = await getPatientQuery(patientId, centerId);
  return patient;
}

export async function getAllPatientsService(centerId: string) {
  const patients = await getAllPatientsQuery(centerId);
  return patients;
}

export async function getPaginationOrFilteredPatientsService(
  centerId: string,
  page: number,
  limit: number,
  searchTerm?: string
) {
  // 1. CÁLCULO DEL OFFSET
  // Calcula cuántas filas saltar en la base de datos basándose en la página actual.
  // Para la página 1, el offset es 0. Para la página 2, es 20 (si el límite es 20).
  const offset = (page - 1) * limit;

  // 2. CONSTRUCCIÓN DE LA CONSULTA DINÁMICA
  // Array para los parámetros de la consulta, empieza con el centerId.
  const queryParams = [centerId];

  let searchCondition = "";
  // Si se proporciona un término de búsqueda, construye la cláusula WHERE.
  if (searchTerm && searchTerm.trim() !== "") {
    // El placeholder para el término de búsqueda será $2.
    const searchPlaceholder = `$${queryParams.length + 1}`;
    searchCondition = `
      AND (
        p.first_name ILIKE ${searchPlaceholder} OR 
        p.last_name ILIKE ${searchPlaceholder} OR 
        p.email ILIKE ${searchPlaceholder} OR 
        p.phone ILIKE ${searchPlaceholder} OR 
        p.date_of_birth::text ILIKE ${searchPlaceholder}
      )
    `;
    // Añade el término de búsqueda con wildcards a los parámetros.
    queryParams.push(`%${searchTerm}%`);
  }

  // 3. DEFINICIÓN DE LAS CONSULTAS FINALES
  // Consulta para contar el total de ítems (incluyendo el filtro de búsqueda).
  const countQuery = `
    SELECT COUNT(*) 
    FROM patients_with_notes p
    WHERE p.center_id = $1 ${searchCondition};
  `;

  // Consulta para obtener los datos de la página (incluyendo búsqueda y paginación).
  const dataQuery = `
    SELECT * FROM patients_with_notes p 
    WHERE p.center_id = $1 ${searchCondition}
    ORDER BY p.created_at DESC 
    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2};
  `;

  // 4. EJECUCIÓN DE LAS CONSULTAS
  // Ejecuta ambas consultas. La de conteo usa solo los params iniciales.
  const countResult = await dbpool.query(countQuery, queryParams);
  // La de datos usa los params iniciales MÁS el límite y el offset.
  const dataResult = await dbpool.query(dataQuery, [
    ...queryParams,
    limit,
    offset,
  ]);

  // 5. CONSTRUCCIÓN DEL OBJETO DE RESPUESTA
  const totalItems = parseInt(countResult.rows[0].count, 10);
  const totalPages = Math.ceil(totalItems / limit);
  const data = dataResult.rows;

  return {
    data,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

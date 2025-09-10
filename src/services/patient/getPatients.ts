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
  // 1. OFFSET CALCULATION
  // Calculate how many rows to skip in the database based on the current page.
  // For page 1, the offset is 0. For page 2, it's 20 (if the limit is 20).
  const offset = (page - 1) * limit;

  // 2. DYNAMIC QUERY CONSTRUCTION
  // Array for query parameters, starts with centerId.
  const queryParams = [centerId];

  let searchCondition = "";
  // If a search term is provided, build the WHERE clause.
  if (searchTerm && searchTerm.trim() !== "") {
    // The placeholder for the search term will be $2.
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
    // Add the search term with wildcards to the parameters.
    queryParams.push(`%${searchTerm}%`);
  }

  // 3. FINAL QUERY DEFINITIONS
  // Query to count total items (including search filter).
  const countQuery = `
    SELECT COUNT(*) 
    FROM patients_with_notes p
    WHERE p.center_id = $1 ${searchCondition};
  `;

  // Query to get page data (including search and pagination).
  const dataQuery = `
    SELECT * FROM patients_with_notes p 
    WHERE p.center_id = $1 ${searchCondition}
    ORDER BY p.last_name ASC, p.id ASC
    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2};
  `;

  // 4. QUERY EXECUTION
  // Execute both queries. The count query uses only the initial params.
  const countResult = await dbpool.query(countQuery, queryParams);
  // The data query uses the initial params PLUS the limit and offset.
  const dataResult = await dbpool.query(dataQuery, [
    ...queryParams,
    limit,
    offset,
  ]);

  // 5. RESPONSE OBJECT CONSTRUCTION
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

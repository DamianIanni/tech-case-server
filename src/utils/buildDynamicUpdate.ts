// utils/db/buildDynamicUpdate.ts

export function buildDynamicUpdate(
  table: string,
  data: Record<string, any>,
  where: { column: string; value: any }
) {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error("No data provided for update");
  }

  const setClauses = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const values = Object.values(data);

  const whereIndex = values.length + 1;
  const query = `UPDATE ${table} SET ${setClauses} WHERE ${where.column} = $${whereIndex}`;

  return { query, values: [...values, where.value] };
}

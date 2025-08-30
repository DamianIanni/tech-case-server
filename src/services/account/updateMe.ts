import { updateUserQuery } from "../../db/users/uptadeUserquery";
import { buildDynamicUpdate } from "../../utils/buildDynamicUpdate";

export async function updateMeService(
  userId: string,
  data: { first_name?: string; last_name?: string }
) {
  const updateData: any = {};
  if (data.first_name) updateData.first_name = data.first_name;
  if (data.last_name) updateData.last_name = data.last_name;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No data to update");
  }

  const { query, values } = buildDynamicUpdate("users", updateData, {
    column: "id",
    value: userId,
  });

  await updateUserQuery(query, values);
  return { message: "User updated" };
}

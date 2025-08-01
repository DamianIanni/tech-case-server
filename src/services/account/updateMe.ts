import { hashPassword } from "../../utils/auth/hashPassword";
import { updateUserQuery } from "../../db/users/uptadeUserquery";
import { buildDynamicUpdate } from "../../utils/buildDynamicUpdate";

export async function updateMeService(userId: string, data: { firstName?: string; lastName?: string; password?: string }) {
  const updateData: any = {};
  if (data.firstName) updateData.first_name = data.firstName;
  if (data.lastName) updateData.last_name = data.lastName;
  if (data.password) updateData.password = await hashPassword(data.password);
  if (Object.keys(updateData).length === 0) throw new Error("No data to update");
  const { query, values } = buildDynamicUpdate(
    "users",
    updateData,
    { column: "id", value: userId }
  );
  await updateUserQuery(query, values);
  return { message: "User updated" };
}

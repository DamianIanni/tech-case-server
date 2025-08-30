import { buildDynamicUpdate } from "../../utils/buildDynamicUpdate";
import { hashPassword } from "../../utils/auth/hashPassword";
import { updateUserQuery } from "../../db/users/uptadeUserquery";

interface UpdateData {
  first_name?: string;
  last_name?: string;
  password?: string;
  role?: "employee" | "manager" | "admin";
  status?: "active" | "inactive" | "pending";
}

export const updateUserService = async (
  centerId: string,
  userId: string,
  updateData: UpdateData
) => {
  const { first_name, last_name, password, role, status } = updateData;

  // 1. Preparar data para users
  const userData: {
    first_name?: string;
    last_name?: string;
    password?: string;
  } = {};
  if (first_name) userData.first_name = first_name;
  if (last_name) userData.last_name = last_name;
  if (password) {
    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;
  }

  if (Object.keys(userData).length > 0) {
    const { query, values } = buildDynamicUpdate("users", userData, {
      column: "id",
      value: userId,
    });
    await updateUserQuery(query, values);
  }

  const userCenterData: { role?: string; status?: string } = {};
  if (role) userCenterData.role = role;
  if (status) userCenterData.status = status;

  if (Object.keys(userCenterData).length > 0) {
    const { query, values } = buildDynamicUpdate(
      "user_centers",
      userCenterData,
      {
        column: "user_id",
        value: userId,
      }
    );

    const centerWhere = ` AND center_id = $${values.length + 1}`;
    await updateUserQuery(query + centerWhere, [...values, centerId]);
  }
};

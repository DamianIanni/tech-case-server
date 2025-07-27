export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserRole = "admin" | "manager" | "employee";

export type UsersTableData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive" | "pending";
  center_id: string;
};

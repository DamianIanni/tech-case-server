export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserRole = "admin" | "manager" | "employee";

export type UsersTableData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive" | "pending";
  center_id: string;
};

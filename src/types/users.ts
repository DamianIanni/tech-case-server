export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In a real application, you would not store passwords in plain text
};

export type UserRole = "admin" | "manager" | "employee";

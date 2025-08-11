// src/validations/userSchemas.ts
import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6),
});
export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const inviteUserSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["employee", "manager", "admin"]),
  center: z.number().int(),
});
export type InviteUserInput = z.infer<typeof inviteUserSchema>;

export const updateUserSchema = z
  .object({
    firstName: z.string().min(2).max(100).optional(),
    lastName: z.string().min(2).max(100).optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["employee", "manager", "admin"]).optional(),
    status: z.enum(["active", "inactive", "pending"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

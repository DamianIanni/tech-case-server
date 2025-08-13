import { z } from "zod";

export const centerUserIdSchema = z.object({
  user_id: z.uuid(),
  center_id: z.uuid(),
});
export type CenterUserIdInput = z.infer<typeof centerUserIdSchema>;

export const centerPatientIdSchema = z.object({
  user_id: z.uuid(),
  center_id: z.uuid(),
});
export type CenterPatientIdInput = z.infer<typeof centerPatientIdSchema>;

export const centerIdSchema = z.object({
  center_id: z.uuid(),
});
export type CenterIdInput = z.infer<typeof centerIdSchema>;

export const userIdSchema = z.object({
  user_id: z.uuid(),
});
export type IdInput = z.infer<typeof userIdSchema>;

export const centerIdRoleSchema = z.object({
  center_id: z.uuid(),
  role: z.enum(["employee", "manager", "admin"]),
});
export type CenterIdRoleInput = z.infer<typeof centerIdRoleSchema>;

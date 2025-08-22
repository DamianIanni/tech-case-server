import { z } from "zod";

export const updateAccountSchema = z
  .object({
    first_name: z.string().min(2).max(100).optional(),
    last_name: z.string().min(2).max(100).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(6),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const emailResetpasswordSchema = z.object({
  email: z.email(),
});
export type EmailResetpasswordInput = z.infer<typeof emailResetpasswordSchema>;

export const tokenResetPasswordSchema = z.object({
  token: z.string(),
});
export type TokenResetPasswordInput = z.infer<typeof tokenResetPasswordSchema>;

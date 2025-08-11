import { z } from "zod";

export const createPatientSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  email: z.email(),
  phone: z.string().min(8).max(20),
  date_of_birth: z.iso.datetime(),
  short_description: z.string().max(2000).optional(),
});
export type CreatePatientInput = z.infer<typeof createPatientSchema>;

export const updatePatientSchema = z
  .object({
    first_name: z.string().min(2).max(100).optional(),
    last_name: z.string().min(2).max(100).optional(),
    email: z.email().optional(),
    phone: z.string().min(8).max(20).optional(),
    date_of_birth: z.iso.datetime().optional(),
    short_description: z.string().max(2000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

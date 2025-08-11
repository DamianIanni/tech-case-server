import { z } from "zod";

export const createCenterSchema = z.object({
  name: z.string().min(2).max(100),
  address: z.string().min(5).max(200),
  phone: z.string().min(8).max(20),
});
export type CreateCenterInput = z.infer<typeof createCenterSchema>;

export const updateCenterSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  address: z.string().min(5).max(200).optional(),
  phone: z.string().min(8).max(20).optional(),
})
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update."
  });
export type UpdateCenterInput = z.infer<typeof updateCenterSchema>;

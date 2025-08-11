import { z } from "zod";

export const updateNotesSchema = z
  .object({
    date: z.iso.datetime().optional(),
    note: z.string().max(2000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdateNotesInput = z.infer<typeof updateNotesSchema>;

export const createNoteSchema = z.object({
  date: z.iso.datetime(),
  note: z.string().max(2000),
});
export type CreateNoteInput = z.infer<typeof createNoteSchema>;

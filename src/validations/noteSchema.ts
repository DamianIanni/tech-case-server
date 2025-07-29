import Joi from "joi";

export const updateNotesSchema = Joi.object({
  date: Joi.date().iso(),
  note: Joi.string().max(2000),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

export const createNoteSchema = Joi.object({
  date: Joi.date().iso().required(),
  note: Joi.string().max(2000).required(),
});

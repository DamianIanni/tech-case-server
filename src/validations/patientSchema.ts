import Joi from "joi";

export const createPatientSchema = Joi.object({
  first_name: Joi.string().min(2).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(20).required(),
  date_of_birth: Joi.date().iso().required(),
  short_description: Joi.string().max(2000),
});

// Agregar al archivo existente junto al createPatientSchema
export const updatePatientSchema = Joi.object({
  first_name: Joi.string().min(2).max(100),
  last_name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().min(8).max(20),
  date_of_birth: Joi.date().iso(),
  short_description: Joi.string().max(2000),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

import Joi from "joi";

export const createCenterSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(200).required(),
  phone: Joi.string().min(8).max(20).required(),
});

export const updateCenterSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  address: Joi.string().min(5).max(200),
  phone: Joi.string().min(8).max(20),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

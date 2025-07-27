import Joi from "joi";

export const centerUserIdSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  center_id: Joi.string().uuid().required(),
});

export const centerPatientIdSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  center_id: Joi.string().uuid().required(),
});

export const centerIdSchema = Joi.object({
  center_id: Joi.string().uuid().required(),
});

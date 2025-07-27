// src/validations/userSchemas.ts
import Joi from "joi";

export const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const inviteUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("employee", "manager", "admin").required(),
  center: Joi.number().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(100),
  password: Joi.string().min(6),
  role: Joi.string().valid("employee", "manager", "admin"),
  status: Joi.string().valid("active", "inactive", "pending"),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

// src/middlewares/validateSchemaMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateSchemaMiddleware = (
  schema: ObjectSchema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

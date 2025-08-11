// src/middlewares/validateSchemaMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateSchemaMiddleware = (
  schema: ZodSchema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const zodError = result.error as ZodError;
      return res.status(400).json({ error: zodError.issues[0].message });
    }
    // Overwrite the validated data back to request to ensure correct typing
    req[source] = result.data as any;
    next();
  };
};

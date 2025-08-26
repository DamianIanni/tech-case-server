// src/middlewares/validateSchemaMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { sendError } from "../handler/responseHandler";
import { AppErrorCode } from "../constants/errorCodes";

export const validateSchemaMiddleware = (
  schema: ZodSchema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const zodError = result.error as ZodError;
      return sendError(res, zodError.issues[0].message, 400, AppErrorCode.VALIDATION_FAILED, zodError.issues);
    }
    // Overwrite the validated data back to request to ensure correct typing
    req[source] = result.data as any;
    next();
  };
};

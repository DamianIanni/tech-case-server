import { Response } from "express";
import { AppErrorCode } from "../constants/errorCodes";

// Estructura para respuestas de éxito
const sendSuccess = (res: Response, data: any, statusCode: number = 200) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

// Estructura para respuestas de error
const sendError = (
  res: Response,
  message: string,
  statusCode: number,
  code?: AppErrorCode,
  details?: any
) => {
  res.status(statusCode).json({
    status: "error",
    error: {
      message,
      code: code || AppErrorCode.INTERNAL_SERVER_ERROR,
      details,
    },
  });
};

export { sendSuccess, sendError };

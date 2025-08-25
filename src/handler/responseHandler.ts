import { Response } from "express";

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
  details?: any
) => {
  res.status(statusCode).json({
    status: "error",
    error: {
      message,
      details,
    },
  });
};

export { sendSuccess, sendError };

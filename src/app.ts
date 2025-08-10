import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import "./config/env";
import { loggerMiddleware } from "./middlewares/logger";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import mainRouter from "./routes";
import cookieParser from "cookie-parser";
import { env } from "./config/env";

// dotenv.config();

export const App = express();

App.use(cookieParser());
App.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
App.use(express.json());

// General logger middleware. For debugging purposes.
if (env.NODE_ENV === "development") {
  App.use(loggerMiddleware);
}
App.use(env.API_PREFIX, mainRouter);

// Error handling middleware should be the last middleware
App.use(errorHandlerMiddleware);

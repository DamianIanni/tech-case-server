import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/env";
import { loggerMiddleware } from "./middlewares/logger";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import mainRouter from "./routes";

dotenv.config();

export const App = express();

App.use(cors());
App.use(express.json());

// General logger middleware. For debugging purposes.
App.use(loggerMiddleware);
App.use("/api", mainRouter);

// Your API routes would go here

// Error handling middleware should be the last middleware
App.use(errorHandlerMiddleware);

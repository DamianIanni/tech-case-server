import { Router } from "express";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";
import secondRouter from "./secondRouter";
import accountRouter from "./account";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use(authMiddleware);
mainRouter.use("/account", accountRouter);
mainRouter.use("/center", secondRouter);

export default mainRouter;

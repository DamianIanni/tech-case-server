import { Router } from "express";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";
import secondRouter from "./secondRouter";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use(authMiddleware);
mainRouter.use("/center/:center_id", secondRouter);
// mainRouter.use("/account", accountRouter)

export default mainRouter;

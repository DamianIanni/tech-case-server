import { Router } from "express";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";
import secondRouter from "./secondRouter";
import accountRouter from "./account";
import { tokenRouter } from "./token";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/auth", authRouter);
mainRouter.use(authMiddleware);
mainRouter.use("/center-selection", tokenRouter);
mainRouter.use("/account", accountRouter);
mainRouter.use("/center", secondRouter);

export default mainRouter;

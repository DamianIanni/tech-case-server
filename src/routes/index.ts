import { Router } from "express";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";
import secondRouter from "./secondRouter";
import accountRouter from "./account";
import { tokenRouter } from "./token";
import { tempAuthMiddleware } from "../middlewares/tempAuthMiddleware";

const mainRouter = Router({ mergeParams: true });

mainRouter.use("/auth", authRouter);
mainRouter.use(tempAuthMiddleware);
mainRouter.use("/account", accountRouter);
mainRouter.use("/center-selection", tokenRouter);
mainRouter.use(authMiddleware);
mainRouter.use("/center", secondRouter);

export default mainRouter;

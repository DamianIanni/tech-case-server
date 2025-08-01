import { Router } from "express";
import { getMeController, updateMeController } from "../../controllers/account";

const accountRouter = Router();

// Assumes authentication middleware sets req.user
accountRouter.get("/me", getMeController);
accountRouter.patch("/me", updateMeController);

export default accountRouter;

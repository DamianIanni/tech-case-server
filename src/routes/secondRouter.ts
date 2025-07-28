import { Router } from "express";
import userRouter from "./user";
import centerRouter from "./center";

const secondRouter = Router({ mergeParams: true });

// secondRouter.use('/patients', patientRouter) // delete, edit, create new patient
secondRouter.use("/center-actions", centerRouter); // delete, edit, create new center
secondRouter.use("/:center_id/users", userRouter); //  delete, edit, create new user

export default secondRouter;

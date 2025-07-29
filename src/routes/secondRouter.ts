import { Router } from "express";
import userRouter from "./user";
import centerRouter from "./center";
import patientRouter from "./patient";

const secondRouter = Router({ mergeParams: true });

secondRouter.use("/:center_id/patients", patientRouter); // delete, edit, create new patient
secondRouter.use("/center-actions", centerRouter); // delete, edit, create new center
secondRouter.use("/:center_id/users", userRouter); //  delete, edit, create new user

export default secondRouter;

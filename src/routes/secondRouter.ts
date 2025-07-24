import { Router } from "express";
import userRouter from "./user";

const secondRouter = Router({ mergeParams: true });

// secondRouter.use("/center-actions", centerRouter) delete, edit, create new center
// secondRouter.use('/patients', patientRouter) // delete, edit, create new patient
secondRouter.use("/users", userRouter); //  delete, edit, create new user

export default secondRouter;

import { Router } from "express";
import {
  createPatientController,
  deletePatientController,
  getAllPatientsController,
  getPatientController,
  updatePatientController,
} from "../../controllers/patients";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../../validations/patientSchema";
import { authorizePatientInCenter } from "../../middlewares/patientInCenter";
import { requireMinRole } from "../../middlewares/requireMinRole";
import {
  centerIdSchema,
  centerPatientIdSchema,
} from "../../validations/idsSchema";
import noteRouter from "../note";

// import { authorizeActionInCenterOverPatient } from "../../middlewares/authActionCenterOverPatient";

const patientRouter = Router({ mergeParams: true });

patientRouter.use(requireMinRole("manager"));

patientRouter.use("/:patient_id/notes", noteRouter);

patientRouter.post(
  "/",
  validateSchemaMiddleware(centerIdSchema, "params"),
  validateSchemaMiddleware(createPatientSchema, "body"),
  createPatientController
);

patientRouter.get(
  "/all",
  validateSchemaMiddleware(centerIdSchema, "params"),
  getAllPatientsController
);

patientRouter.get(
  "/:user_id",
  validateSchemaMiddleware(centerPatientIdSchema, "params"),
  getPatientController
);

patientRouter.use(authorizePatientInCenter);

patientRouter.delete(
  "/:pantient_id",
  validateSchemaMiddleware(centerPatientIdSchema, "params"),
  deletePatientController
);

patientRouter.patch(
  "/:patient_id",
  validateSchemaMiddleware(centerPatientIdSchema, "params"),
  validateSchemaMiddleware(updatePatientSchema, "body"),
  updatePatientController
);

export default patientRouter;

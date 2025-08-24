import { Router } from "express";
import { requireMinRole } from "../../middlewares/requireMinRole";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { authorizePatientInCenter } from "../../middlewares/patientInCenter";
import {
  createPatientController,
  deletePatientController,
  getAllPatientsController,
  getPatientController,
  updatePatientController,
  getPaginationOrFilteredPatientsController,
} from "../../controllers/patients";
import {
  createPatientSchema,
  updatePatientSchema,
  patientIdSchema,
} from "../../validations/patientSchema";
import noteRouter from "../note";

// import { authorizeActionInCenterOverPatient } from "../../middlewares/authActionCenterOverPatient";

const patientRouter = Router({ mergeParams: true });

patientRouter.use("/:patient_id/notes", noteRouter);

patientRouter.post(
  "/",
  validateSchemaMiddleware(createPatientSchema, "body"),
  // requireMinRole("manager"),
  createPatientController
);

patientRouter.get(
  "/all",
  getPaginationOrFilteredPatientsController
  // getAllPatientsController
);

patientRouter.get(
  "/:patient_id",
  validateSchemaMiddleware(patientIdSchema, "params"),
  requireMinRole("manager"),
  getPatientController
);

patientRouter.delete(
  "/:patient_id",
  validateSchemaMiddleware(patientIdSchema, "params"),
  requireMinRole("manager"),
  // authorizePatientInCenter,
  deletePatientController
);

patientRouter.patch(
  "/:patient_id",
  validateSchemaMiddleware(patientIdSchema, "params"),
  validateSchemaMiddleware(updatePatientSchema, "body"),
  requireMinRole("manager"),
  // authorizePatientInCenter,
  updatePatientController
);

export default patientRouter;

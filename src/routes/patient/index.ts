import { Router } from "express";
import { requireMinRole } from "../../middlewares/requireMinRole";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import {
  createPatientController,
  deletePatientController,
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

const patientRouter = Router({ mergeParams: true });

patientRouter.use("/:patient_id/notes", noteRouter);

patientRouter.post(
  "/",
  validateSchemaMiddleware(createPatientSchema, "body"),
  createPatientController
);

patientRouter.get("/all", getPaginationOrFilteredPatientsController);

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
  deletePatientController
);

patientRouter.patch(
  "/:patient_id",
  validateSchemaMiddleware(patientIdSchema, "params"),
  validateSchemaMiddleware(updatePatientSchema, "body"),
  requireMinRole("manager"),
  updatePatientController
);

export default patientRouter;

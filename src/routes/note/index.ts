import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { patientIdNoteIdSchema } from "../../validations/idsSchema";
import { patientIdSchema } from "../../validations/patientSchema";
import {
  createNoteController,
  deleteNoteController,
} from "../../controllers/notes";

const noteRouter = Router({ mergeParams: true });

noteRouter.post(
  "/",
  validateSchemaMiddleware(patientIdSchema, "params"),
  createNoteController
);

noteRouter.delete(
  "/:note_id",
  validateSchemaMiddleware(patientIdNoteIdSchema, "params"),
  deleteNoteController
);

export default noteRouter;
